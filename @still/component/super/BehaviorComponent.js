import { $stillconst } from "../../setup/constants.js";

export const validationPatterns = {
    'number': /^\d{0,}$/,
    'alphanumeric': /^[a-zA-Z0-9\s]{0,}$/,
    'text': /^(.){0,}$/,
    'email': /^[a-z0-9]{0,}(\@){1}[a-z0-9]{2,}(\.){1}[a-z0-9]{2,}$/,
    'phone': /^[\+]{0,1}[\d \s]{8,}$/,
    'date': /(\d){2}\-(\d){2}\-(\d){4}/,
    'dateUS': /(\d){4}\-(\d){2}\-(\d){2}/,
}

const validationTriggers = {
    typing: 'onkeyup',
    losefocus: 'onblur',
    focus: 'onfocus'
}

const validatorMinMaxTypes = ['number', 'date'];

export class BehaviorComponent {

    $stillClassLvlSubscribers = [];
    static currentFormsValidators = {};
    #triggetSet = $stillconst.VALID_TRIGGER_SET;
    #triggetOnType = $stillconst.VALID_TRIGGER_ONTYPE;
    _const = $stillconst;
    lang = 'PT';
    behaviorEvtSubscriptions = {};

    onChange(callback = (newState) => { }) {
        this.$stillClassLvlSubscribers.push(callback);
    }

    notifySubscribers(state) {
        this.$stillClassLvlSubscribers.forEach(
            subscriber => subscriber(state)
        );
    }

    static ignrKeys = [
        'arrowleft', 'arrowright', 'arrowdown', 'arrowup', 'tab', 'space', 'meta',
        'control', 'alt', 'shift', 'escape', 'end', 'home', 'insert', 'capslock'
    ]

    /**
     * @param {*} field 
     * @param {{ value: string, required: Blob, pattern: RegExp }} inpt 
     */
    onValueInput(e, field, inpt, formRef, cmp = null, reset = false) {
        if(inpt === null) return;
        const fieldType = inpt?.type?.toLowerCase();
        const fieldSrc = this.constructor.name == 'BehaviorComponent' ? cmp : this;

        if(reset){
            fieldSrc[field] = (fieldType == 'checkbox' || inpt.multiple) ? [] : '';
            return;
        }

        const isOptList = ['radio','checkbox'].includes(fieldType);
        if (e && !isOptList) 
            if (BehaviorComponent.ignrKeys.includes(e.key.toString().toLowerCase())) return;
         
        const pattern = inpt.getAttribute('(validator)');
        let required = inpt.getAttribute('(required)');
        let validationTrigger = inpt.getAttribute('(validator-trigger)');
        required = required == 'false' ? false : required;

        let isTriggerSet = inpt.getAttribute(this.#triggetSet);
        let isOntypeTrigger = inpt.getAttribute(this.#triggetOnType);

        isTriggerSet = isTriggerSet == "false" ? false : isTriggerSet;
        isOntypeTrigger = isOntypeTrigger == "false" ? false : isOntypeTrigger;
        let isOptListValid = true;

        if(isOptList || inpt.multiple){
            if(fieldType == 'checkbox'){
                let currentValues = ['',undefined].includes(fieldSrc[field]?.value) ? [] : fieldSrc[field]?.value;
                if(inpt?.checked) currentValues.push(inpt.value);
                else {
                    currentValues = currentValues.filter(v => v != inpt.value);
                    fieldSrc['st'+field+'cbRem'] = inpt.value;
                }
                fieldSrc['st'+field+'cbClk'] = true;
                fieldSrc[field] = currentValues;
                isOptListValid = currentValues.length > 0 ? true : false;
            } 
            else {
                //this is shared with both scenarios (entering/selecting a value and form validation)
                //the assignment will not happen in case it's in the form validation flow
                if(cmp == null) fieldSrc[field] = inpt.value;
            }
        } else 
            fieldSrc[field] = inpt.value;

        /* If the validation trigger was set and it and  it should not trigger 
         * when typing then its get stopped by return statement */
        if (isTriggerSet && !isOntypeTrigger) return;

        if (validationTrigger && !isOntypeTrigger) {
            if (validationTriggers[validationTrigger] != validationTriggers.typing) {
                const actualTrigger = validationTriggers[validationTrigger];
                if (!inpt[actualTrigger] && (validationTrigger in validationTriggers)) {
                    /* Bellow line will pich the trigger and add as event to the input
                     * e.g input.onkeyup = () => {}; */
                    inpt[actualTrigger] = () => {
                        this.#handleInputValidation(inpt, field, formRef, pattern, required, isOptListValid);
                    }
                    inpt.setAttribute(this.#triggetSet, true);
                    inpt.setAttribute(this.#triggetOnType, false);
                    return;
                } else {
                    inpt.setAttribute(this.#triggetSet, true);
                    inpt.setAttribute(this.#triggetOnType, true);
                }
            } else {
                inpt.setAttribute(this.#triggetSet, true);
                inpt.setAttribute(this.#triggetOnType, true);
            }
        }

        /** In case no validation trigger was not set of set to typing (ontype/onkeyup)
         * then validation function will be called everytime new character is entered */
        return this.#handleInputValidation(inpt, field, formRef, pattern, required, isOptListValid, cmp);

    }

    #handleInputValidation(inpt, field, formRef, pattern, required, isOptListValid = null, cmp = null) {

        let { value } = inpt;
        // To address radio and checkbox edge case when running form validator
        const isOptList = ['checkbox','radio'].includes(inpt.type);
        const isCBInValidator = this.constructor.name == 'BehaviorComponent' && isOptList;

        if(isCBInValidator) value = cmp[field].value.length > 0 ? cmp[field].value : '';
        if('radio' == inpt.type && value == '') value = cmp[field].value;

        let isValid = true, validation;
        const fieldPath = `${this.constructor.name}${formRef && formRef != 'null' ? `-${formRef}` : ''}`;

        if(!isCBInValidator && isOptList){
            const numOutRangeMsg = this.#handleMinMaxValidation(inpt, pattern, value, fieldPath);
            /** Only apply out of range validation in case there is a value in the input  */
            if (numOutRangeMsg && value != '') 
                this.#handleValidationWarning('add', inpt, fieldPath, numOutRangeMsg, 'range');
        }
        
        /** Remove Out of range warning if added before */
        this.#handleValidationWarning('remove', inpt, fieldPath, 'to-remove', 'range');

        if (pattern && value.trim() != '' || ('radio' == inpt.type)) {
            let regex = pattern;
            if (pattern in validationPatterns) {
                regex = validationPatterns[pattern];
            } else {
                if(pattern){
                    const datePattern = this.#checkDatePattern(pattern);
                    if (datePattern) regex = datePattern;
                    if (!datePattern) regex = String.raw`${regex}`;
                }
            }
            if (typeof regex == 'function') {
                validation = regex(value);
                if (!validation) isValid = false;
            } else {
                if(pattern){
                    pattern = validationPatterns[pattern];
                    validation = value.match(new RegExp(regex));
                    if (!validation || !validation[0]?.length) isValid = false;
                }
                else if(!isNaN(value) && 'radio' == inpt.type && value != '') isValid = true;
                else if (value?.trim() == '' && required) isValid = false;
            }
        }

        else if (isOptList && value.length > 0) isValid = true;
        else if (value?.trim() == '' && required) isValid = false;

        if(!isOptListValid) this.#handleValidationWarning('add', inpt, fieldPath);
        else if (!isValid && !isOptList || (!isValid && 'radio' == inpt.type)) 
            this.#handleValidationWarning('add', inpt, fieldPath);
        else this.#handleValidationWarning('remove', inpt, fieldPath);

        BehaviorComponent.setValidatorForField(fieldPath, field);
        BehaviorComponent.currentFormsValidators[fieldPath][field]['isValid'] = isValid;

        return isValid;
    }

    #handleMinMaxValidation(inpt, pattern, value, fieldPath) {

        this.#handleValidationWarning('remove', inpt, fieldPath, 'to-remove', 'range');
        if (validatorMinMaxTypes.includes(pattern)) {

            let min = this.#parseLikelyNumber(inpt.getAttribute('(validator-min)'));
            let max = this.#parseLikelyNumber(inpt.getAttribute('(validator-max)'));

            /** If not min and max restriction stated then 
             * any value will be allowed and get passed to
             * the next validation on the pipeline */
            if (!min && !max) return false;

            const isValidNum = this.#parseLikelyNumber(value);
            let msg = null;

            if (min) {
                if (isValidNum < min) {
                    msg = inpt.getAttribute('(validator-min-warn)');
                    msg = msg || this._const.value['MIN_VALID_MSG_' + this.lang.value].replace('{{}}', min);
                }
            }

            if (max) {
                if (isValidNum > max) {
                    msg = inpt.getAttribute('(validator-man-warn)');
                    msg = msg || this._const.value['MAX_VALID_MSG_' + this.lang.value].replace('{{}}', max);
                }
            }

            if (msg) return msg;

        }

        return false;

    }

    /**
     * @param {string} pattern 
     */
    #checkDatePattern(pattern) {

        const value = pattern.trim().toLowerCase();

        const isDay = value.indexOf('dd');
        const isMon = value.indexOf('dd');
        const isYear = value.indexOf('dd');
        const dashSep = value.match(/\-/g) || [];
        const slashSep = value.match(/\//g) || [];

        if (
            (isDay >= 0 && isMon >= 0 && isYear >= 0)
            && (value.length == 8 || value.length == 10)
            && (dashSep.length == 2 || slashSep.length == 2)
        ) {
            const sep = dashSep.length == 2 ? '-' : '/';
            const [first, sec, third] = value.split(sep);
            return new RegExp(`\\d{${first.length}}${sep}\\d{${sec.length}}${sep}\\d{${third.length}}`);
        }
        return null;
    }

    /**
     * @param {'add' | 'remove'} opt 
     * @param {HTMLElement} inpt 
     * @param {string} message 
     * @param {string} fieldPath 
     */
    #handleValidationWarning(opt, inpt, fieldPath, msg = null, msgSuffix = '') {

        let validationWarning = msg, optListParent = inpt.parentElement;
        if (!validationWarning) validationWarning = inpt.getAttribute('(validator-warn)');
        if(!validationWarning && ['checkbox','radio'].includes(inpt.type)) validationWarning = 'This is s mandatory field';

        if (validationWarning) {

            const id = `still-validation-warning${fieldPath}${msgSuffix ? msgSuffix : ''}`;
            const classList = `still-validation-warning`;

            if (opt == 'add') {
                if(['checkbox','radio'].includes(inpt.type)) 
                    optListParent = BehaviorComponent.getOptListContainert(optListParent);
                const content = `<div id="${id}" class="${classList}">${validationWarning}</div>`;
                inpt.classList.add('still-validation-failed-style');
                if(optListParent.querySelector('.still-validation-warning')) return;
                //const inputField = document.getElementById(id);
                if (content) optListParent.insertAdjacentHTML('beforeend', content);
            }

            if (opt == 'remove') {
                let content = document.getElementById(id);
                if(['checkbox','radio'].includes(inpt.type)) 
                    optListParent = BehaviorComponent.getOptListContainert(optListParent);
                content = optListParent.querySelector('.still-validation-warning');
                inpt.classList.remove('still-validation-failed-style');
                if (content) try { optListParent.removeChild(content); } catch (error) {}
            }
        } else {

            if (opt == 'add') inpt.classList.add('still-validation-failed-style');
            if (opt == 'remove') inpt.classList.remove('still-validation-failed-style');
        }

    }

    static getOptListContainert(optListParent){
        let foundTopParent = null, treeLvl = 0;
        while(treeLvl < 5 && foundTopParent == null) {
            if(optListParent.parentElement.tagName != 'OUTPUT') foundTopParent = true;
            optListParent = optListParent.parentElement, treeLvl += 1;
        }
        return optListParent;
    }

    static setValidatorForField(fieldPath, field) {
        if (!(fieldPath in BehaviorComponent.currentFormsValidators))
            BehaviorComponent.currentFormsValidators[fieldPath] = {};

        if (!(field in BehaviorComponent.currentFormsValidators[fieldPath]))
            BehaviorComponent.currentFormsValidators[fieldPath][field] = {};
    }

    /**
     * @param {string} mt 
     * @param {Object} cmp 
     * @param {string} field 
     */
    static setOnValueInput(mt, cmp, field, formRef) {

        const fieldPath = `${cmp.cmpInternalId}${formRef ? `-${formRef}` : ''}`;
        BehaviorComponent.setValidatorForField(fieldPath, field);
        let isValid = true;

        if (
            mt.indexOf(' (required)="true" ') >= 0
            || mt.indexOf('\n(required)="true"\n') >= 0
            || mt.indexOf('\n(required)="true"') >= 0
            || mt.indexOf('(required)="true"\n') >= 0
            /* || mt.indexOf('pattern="') >= 0
            || mt.indexOf('\npattern="') >= 0 */
        ) {
            isValid = false;
        }
        else
            isValid = true;

        BehaviorComponent.currentFormsValidators[fieldPath][field]['isValid'] = isValid;
        if (!isValid) {
            let validatorClass = 'still-validation-class';
            const specificValidatorClass = `still-validation-class-${fieldPath}-${field}`;
            validatorClass = `${validatorClass} ${specificValidatorClass}`;
            BehaviorComponent.currentFormsValidators[fieldPath][field]['inputClass'] = specificValidatorClass;
            return validatorClass;
        }
        return '';
    }

    static validateForm(fieldPath, cmp, formRefObj = {}, reset = false) {

        const formFields = BehaviorComponent.currentFormsValidators[fieldPath];
        if(formFields === undefined) return;
        let valid = true;
        const intValidators = Object.entries(formFields);
        const behaviorInstance = new BehaviorComponent();
        const formRef = String(fieldPath)?.split('-')?.slice(-1)[0];
        fieldPath = fieldPath.slice(0, -(formRef.length + 1));
        const validators = Object
            .entries(intValidators)
            .map(
                ([_, stngs]) => {
                    const field = stngs[0];
                    const inpt = document.querySelector(`.${fieldPath}-${field}`);
                    return [
                        field, {
                            isValid: behaviorInstance.onValueInput(null, field, inpt, formRef, cmp, reset),
                            inputClass: stngs[1].inputClass
                        }
                    ];
                });

        if(formRefObj) formRefObj.errorCount = 0;
        for (let [field, validator] of validators) {

            if (!validator.isValid) {
                if(formRefObj) formRefObj.errorCount++;
                valid = false;
            }

            if (validator.inputClass) {
                const obj = new BehaviorComponent();
                const inpt = document.querySelector('.' + validator.inputClass);
                if(inpt === null) return;
                if (!validator.isValid && !['checkbox','radio'].includes(inpt.type)) {
                    obj.#handleValidationWarning('add', inpt, fieldPath);
                } else {
                    if(!['checkbox','radio'].includes(inpt.type))
                        obj.#handleValidationWarning('remove', inpt, fieldPath);
                }
            }
        }

        return valid;

    }

    #parseLikelyNumber(value) {
        if (!value) return null;
        if (!isNaN(value)) return parseFloat(value);
        return null;
    }

    /** @param {'load'} evt */
    on(evt, action) {

        if (evt in this.behaviorEvtSubscriptions) {
            if (this.behaviorEvtSubscriptions[evt].status == $stillconst.A_STATUS.DONE) {
                setTimeout(() => {
                    action(this);
                }, 200);
                return;
            }
        }

        if (!(evt in this.behaviorEvtSubscriptions)) {
            const status = $stillconst.A_STATUS.PENDING
            this.behaviorEvtSubscriptions[evt] = { status, actions: [], count: 0 };
        }

        const count = this.behaviorEvtSubscriptions[evt].count;
        this.behaviorEvtSubscriptions[evt].actions.push(action);
        this.behaviorEvtSubscriptions[evt].count = count + 1;

    }

    /** @param {'load'} evt */
    emit(evt) {
        if (!(evt in this.behaviorEvtSubscriptions)) {
            const status = $stillconst.A_STATUS.DONE;
            this.behaviorEvtSubscriptions[evt] = { status, actions: [], count: 0 };
            return;
        }
        setTimeout(() => {
            this.behaviorEvtSubscriptions[evt].actions.forEach(action => action(this));
        }, 200);
        this.behaviorEvtSubscriptions[evt].status = $stillconst.A_STATUS.DONE;
    }

}