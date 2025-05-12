export class STForm {
    onlyPropSignature = true;
    sTForm = true;
    name;
    formId;
    constructor(refName, formId){ this.name = refName, this.formId = formId };
    /**  @returns { boolean } */
    validate() { }
}

window.STForm = STForm;