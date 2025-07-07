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
    errorCount;
    constructor(refName, formId){ this.name = refName, this.formId = formId };
    /**  @returns { boolean } */
    validate() { };
    /** Clears the form  */
    reset(){};
}

/** @template T */
export class State {
    /** @type T */
    value;
    onChange(callback = (/** @type T */ updatedValue) => {}){}
    onComplete(callback = () => {}){}
}

/** @template T */
export class ListState extends State {
    /** @param { T } newList set or override the datasource value */
    set(newValues){}    
    
    /** @param { T } updatedList updated list of items */
    update(updatedList){}

    /** @param { T } idsList Id of the element to be removed */
    delete(idsList){}
}