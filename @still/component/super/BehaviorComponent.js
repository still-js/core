import { $stillconst } from "../../setup/constants.js";

export const validationPatterns = {
    'number': /^\d{0,}$/,
    'alhpanumeric': /^[a-zA-Z0-9]{0,}$/,
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

    static ignoreKeys = [
        'arrowleft', 'arrowright', 'arrowdown', 'arrowup', 'tab', 'space',
        'control', 'alt', 'shift', 'escape', 'end', 'home', 'insert', 'capslock'
    ]

    /**
     * @param {*} field 
     * @param {{ value: string, required: Blob, pattern: RegExp }} inpt 
     */
    onValueInput(event, field, inpt, formRef) {

        if (event) {
            if (
                BehaviorComponent.ignoreKeys.includes(event.key.toString().toLowerCase())
            ) return;
        }

        const pattern = inpt.getAttribute('(validator)');
        let required = inpt.getAttribute('(required)');
        let validationTrigger = inpt.getAttribute('(validator-trigger)');
        required = required == 'false' ? false : required;

        let isTriggerSet = inpt.getAttribute(this.#triggetSet);
        let isOntypeTrigger = inpt.getAttribute(this.#triggetOnType);

        isTriggerSet = isTriggerSet == "false" ? false : isTriggerSet;
        isOntypeTrigger = isOntypeTrigger == "false" ? false : isOntypeTrigger;

        this[field] = inpt.value;

        /** If the validation trigger was set and it and
         * it should not trigger when typing then its get 
         * stopped by return statement */
        if (isTriggerSet && !isOntypeTrigger) return;

        if (validationTrigger && !isOntypeTrigger) {
            if (validationTriggers[validationTrigger] != validationTriggers.typing) {
                const actualTrigger = validationTriggers[validationTrigger];
                if (!inpt[actualTrigger] && (validationTrigger in validationTriggers)) {
                    /**  Bellow line will pich the trigger and add as event to the input
                     * e.g input.onkeyup = () => {}; */
                    inpt[actualTrigger] = () => {
                        this.#handleInputValidation(inpt, field, formRef, pattern, required);
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
        return this.#handleInputValidation(inpt, field, formRef, pattern, required);

    }

    #handleInputValidation(inpt, field, formRef, pattern, required) {

        const { value } = inpt;
        let isValid = true;
        const fieldPath = `${this.constructor.name}${formRef && formRef != 'null' ? `-${formRef}` : ''}`;
        const numOutRangeMsg = this.#handleMinMaxValidation(inpt, pattern, value, fieldPath);

        /** Only apply out of range validation in case there is a value in the input  */
        if (numOutRangeMsg && value != '') {
            this.#handleValidationWarning('add', inpt, fieldPath, numOutRangeMsg, 'range');
        }
        else {
            /** Remove Out of range warning if added before */
            this.#handleValidationWarning('remove', inpt, fieldPath, 'to-remove', 'range');

            if (pattern && value.trim() != '') {
                let regex = pattern;
                if (pattern in validationPatterns) {
                    regex = validationPatterns[pattern];
                } else {

                    const datePattern = this.#checkDatePattern(pattern);
                    if (datePattern) regex = datePattern;
                    if (!datePattern) regex = String.raw`${regex}`;
                }

                const validation = value.match(new RegExp(regex));
                if (!validation || !validation[0]?.length) isValid = false;
            }

            if (value.trim() == '' && required) isValid = false;

            if (!isValid) this.#handleValidationWarning('add', inpt, fieldPath);
            else this.#handleValidationWarning('remove', inpt, fieldPath);

        }

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

        let validationWarning = msg;
        if (!validationWarning) validationWarning = inpt.getAttribute('(validator-warn)');

        if (validationWarning) {

            const id = `still-validation-warning${fieldPath}${msgSuffix ? msgSuffix : ''}`;
            const classList = `still-validation-warning`;

            if (opt == 'add') {
                const content = `<div id="${id}" class="${classList}">${validationWarning}</div>`;
                inpt.classList.add('still-validation-failed-style');
                const inputField = document.getElementById(id);
                if (!inputField)
                    inpt.parentElement.insertAdjacentHTML('beforeend', content);
            }

            if (opt == 'remove') {
                inpt.classList.remove('still-validation-failed-style');
                const inputField = document.getElementById(id);
                if (inputField)
                    inpt.parentElement.removeChild(inputField);
            }
        } else {

            if (opt == 'add') inpt.classList.add('still-validation-failed-style');
            if (opt == 'remove') inpt.classList.remove('still-validation-failed-style');
        }

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

        const fieldPath = `${cmp.constructor.name}${formRef ? `-${formRef}` : ''}`;
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

    static validateForm(fieldPath) {

        const formFields = BehaviorComponent.currentFormsValidators[fieldPath];
        let valid = true;
        const intValidators = Object.entries(formFields);
        const behaviorInstance = new BehaviorComponent();
        const formRef = String(fieldPath).split('-')[1];
        const validators = Object
            .entries(intValidators)
            .map(
                ([_, stngs]) => {
                    const field = stngs[0];
                    const inpt = document.querySelector(`.stillInputField-${field}`);
                    return [
                        field, {
                            isValid: behaviorInstance.onValueInput(null, field, inpt, formRef),
                            inputClass: stngs[1].inputClass
                        }
                    ];
                });

        for (let [field, validator] of validators) {

            if (!validator.isValid) valid = false;

            if (validator.inputClass) {
                const obj = new BehaviorComponent();
                const inpt = document.querySelector('.' + validator.inputClass);
                if (!validator.isValid) {
                    obj.#handleValidationWarning('add', inpt, fieldPath);
                } else {
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