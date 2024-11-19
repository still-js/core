const validationPatterns = {
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

class BehaviorComponent {

    $stillClassLvlSubscribers = [];
    static currentFormsValidators = {};
    #triggetSet = $stillconst.VALID_TRIGGER_SET;
    #triggetOnType = $stillconst.VALID_TRIGGER_ONTYPE;

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
     * 
     * @param {*} field 
     * @param {{ value: string, required: Blob, pattern: RegExp }} inpt 
     */
    onValueInput(event, field, inpt, formRef) {

        if (
            BehaviorComponent.ignoreKeys.includes(event.key.toString().toLowerCase())
        ) return;

        const pattern = inpt.getAttribute('(validator)');
        let required = inpt.getAttribute('(required)');
        let validationTrigger = inpt.getAttribute('(validation-trigger)');
        required = required == 'false' ? false : required;

        let isTriggerSet = inpt.getAttribute(this.#triggetSet);
        let isOntypeTrigger = inpt.getAttribute(this.#triggetOnType);

        isTriggerSet = isTriggerSet == "false" ? false : isTriggerSet;
        isOntypeTrigger = isOntypeTrigger == "false" ? false : isOntypeTrigger;

        this[field] = inpt.value;

        /**
         * If the validation trigger was set and it and
         * it should not trigger when typing then its get 
         * stopped by return statement
         */
        if (isTriggerSet && !isOntypeTrigger) return;

        if (validationTrigger && !isOntypeTrigger) {
            if (validationTriggers[validationTrigger] != validationTriggers.typing) {
                const actualTrigger = validationTriggers[validationTrigger];
                if (!inpt[actualTrigger] && (validationTrigger in validationTriggers)) {
                    /**
                     * Bellow line will pich the trigger and add as event to the input
                     * e.g input.onkeyup = () => {};
                     */
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

        /**
         * In case no validation trigger was not set of set to typing (ontype/onkeyup)
         * then validation function will be called everytime new character is entered
         */
        this.#handleInputValidation(inpt, field, formRef, pattern, required);

    }

    #handleInputValidation(inpt, field, formRef, pattern, required) {

        const { value } = inpt;

        const fieldPath = `${this.constructor.name}${formRef && formRef != 'null' ? `-${formRef}` : ''}`;
        let isValid = true;

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

        BehaviorComponent.currentFormsValidators[fieldPath][field]['isValid'] = isValid;

    }

    /**
     * 
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
     * 
     * @param {'add' | 'remove'} opt 
     * @param {HTMLElement} inpt 
     * @param {string} message 
     * @param {string} fieldPath 
     */
    #handleValidationWarning(opt, inpt, fieldPath) {

        const validationWarning = inpt.getAttribute('(validator-warn)');
        if (validationWarning) {

            const id = `still-validation-warning${fieldPath}`;
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

    /**
     * 
     * @param {string} mt 
     * @param {Object} cmp 
     * @param {string} field 
     */
    static setOnValueInput(mt, cmp, field, formRef) {

        const fieldPath = `${cmp.constructor.name}${formRef ? `-${formRef}` : ''}`;
        let isValid = true;

        if (!(fieldPath in BehaviorComponent.currentFormsValidators))
            BehaviorComponent.currentFormsValidators[fieldPath] = {};

        if (!(field in BehaviorComponent.currentFormsValidators[fieldPath]))
            BehaviorComponent.currentFormsValidators[fieldPath][field] = {};

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

    changeState(input, value) { }

    showLoading() {
        document.getElementById('stllAppGlobalLoadingCurtain').style.display = 'flex';
    }

    hideLoading() {
        const hideTimeout = setTimeout(() => {
            const elm = document.getElementById('stllAppGlobalLoadingCurtain');
            if (elm) {
                elm.style.display = 'none';
                clearTimeout(hideTimeout);
            }
        }, 100)
    }

    static validateForm(fieldPath) {

        const formFields = BehaviorComponent.currentFormsValidators[fieldPath];
        let valid = true;
        const validators = Object.entries(formFields);

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

}