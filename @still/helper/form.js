import { BehaviorComponent } from "../component/super/BehaviorComponent.js";
import { ViewComponent } from "../component/super/ViewComponent.js";
import { STForm } from "../component/type/ComponentType.js";

class InParams {
    className; 
    id; 
    datasets = {}; 
    value; type; 
    placeholder; 
    min; max; required; warn;
    /** @type { 'number'|'alhpanumeric'|'text'|'email'|'phone'|'date'|'dateUS' } */
    validator;
} ;

export const FormHelper = {
    /**
     * @param { ViewComponent } cmp Component instance
     * @param { STForm } formRef Form Reference
     * @param { String } fName Field name
     * @param { String } value Initial value */
    newField(cmp, formRef, fName, value = null){
        //Components is available globally from import { Components } from "../setup/components";        
        Components.ref(cmp.cmpInternalId).setDynamicField(fName, value);
        Components.obj().parseGetsAndSets(cmp, false,fName);

        return {
            /** @param { InParams } params  */
            input(params = inParams){
                if(formRef === undefined) return;
                const {className, id, datasets = {}, type, placeholder, min, max, required, validator, warn, value} = params;
                const datafields = Object.entries(datasets).map(([f,v]) => (`data-${f}="${v}"`)).join(' ');
                const ftype=`type="${type || 'text'}"`, isOptList = ['radio','checkbox'].includes(type);
                const hint = `${placeholder ? `placeholder="${placeholder}"` : ''}`;
                const val = `${value ? `value="${value}"` : ''}`, _id = `${id ? `id="${id}"` : ''}`;
                const mn = `${min ? `min="${min}"` : ''}`, mx = `${max ? `max="${max}"` : ''}`;
                const req = `${required ? ' (required)="true" ' : ''}`, wrn = `${warn ? ` (validator-warn)="${warn}"` : ''}`;
                const checked = `${ ['checkbox','radio'].includes(type) && value === true ? `checked="true"` : "" }`;
                const evt = ['checkbox','radio'].includes(type) ? `onclick` : `onkeyup`;
                
                const validatorClass = required ? BehaviorComponent.setOnValueInput(req, cmp, fName, (formRef?.name || null)) : '';
                const validateEvt = `${evt}="$still.c.ref('${cmp.cmpInternalId}').onValueInput(event,'${fName}',this, '${formRef.name}')"`;
                const vlidtor = `${validator ? `(validator)=${validator}`: ''}`;
                const cmpId = cmp.cmpInternalId?.replace('/','').replace('@','');
                const input = `
                    <input ${datafields}
                        class="${genInputsClasses(validatorClass, cmpId, fName, val, isOptList)} ${cmp.cmpInternalId}-${fName} ${className || ''}"
                        ${ftype} ${val} ${_id} ${req.trim()} ${wrn} ${hint} ${mn} ${mx} ${validateEvt} ${vlidtor} ${checked}>
                `;
                return {
                    add(cb = function(input){}, subContainer = null){
                        let cnt = cb(input), ctr = document.getElementById(formRef.formId);
                        if(subContainer) ctr = ctr.querySelector(subContainer);
                        ctr.insertAdjacentHTML('beforeend', `<span>${cnt || input}</span>`);
                    },
                    element: input 
                }
            }
        }
    },
    /**
    * @param { ViewComponent } cmp Component instance
    * @param { STForm } formRef Form Reference
    * @param { String } fName Field name */
   delField(cmp, formRef, fName){        
        delete BehaviorComponent.currentFormsValidators[cmp.cmpInternalId+'-'+formRef.name][fName];
        const inpt = document.getElementsByClassName(`listenChangeOn-${cmp.cmpInternalId}-${fName}`)[0];
        inpt.parentElement.removeChild(inpt);
    }
}

export function genInputsClasses(validatorClass, cmpId, field, optValue, isOptList = false, isThereComboBox = false){
    const listenCls = isThereComboBox ? '' : `listenChangeOn-${cmpId}-${field}`;
    return `${validatorClass} ${listenCls} ${ isOptList ? `${cmpId}-${field}-val-${optValue}` : '' }`;
}