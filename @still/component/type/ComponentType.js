export class ComponentType {
    /** @type { ViewComponent | String } */ component;
    /** @type { Array<String> } */ assets;
}

export class StillDivider {
    /** @type { HTMLElement } */ element;
    setHeight(number){}; setMaxHeight(){}
}

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


/** @template T */
export class State {
    /** @type T */
    value;
    onChange(callback = (/** @type T */ updatedValue) => {}){}
}