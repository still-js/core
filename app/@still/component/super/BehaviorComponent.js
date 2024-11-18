const validationPatterns = {
    'number': /^\d{0,}$/,
    'text': /^(.){0,}$/,
    'email': /^[a-z0-9]{0,}(\@){1}[a-z0-9]{2,}(\.){1}[a-z0-9]{2,}$/,
    'phone': /[\+]{0,1}(\d){8,}$/,
}

class BehaviorComponent {

    $stillClassLvlSubscribers = [];
    static currentFormsValidators = {};

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

        const { value, required, pattern } = inpt;

        const fieldPath = `${this.constructor.name}${formRef ? `-${formRef}` : ''}`;
        let isValid = true;


        if (pattern && value.trim() != '') {
            let regex = pattern;
            if (pattern in validationPatterns)
                regex = validationPatterns[pattern];

            const validation = value.match(new RegExp(regex));
            if (!validation || !validation[0]?.length) isValid = false;
        }

        if (value.trim() == '' && required) isValid = false;

        if (!isValid) inpt.classList.add('still-validation-failed-style');
        else inpt.classList.remove('still-validation-failed-style');

        BehaviorComponent.currentFormsValidators[fieldPath][field]['isValid'] = isValid;
        this[field] = value;
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
            mt.indexOf(' required ') >= 0
            || mt.indexOf('\nrequired\n') >= 0
            || mt.indexOf('\nrequired') >= 0
            || mt.indexOf('required\n') >= 0
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
                if (!validator.isValid) {
                    document
                        .querySelector('.' + validator.inputClass)
                        .classList.add('still-validation-failed-style');

                } else {
                    document
                        .querySelector('.' + validator.inputClass)
                        .classList.remove('still-validation-failed-style');
                }
            }
        }

        return valid;

    }

}