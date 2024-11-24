class SettingType {
    componentName = undefined;
    path = undefined;
    imports = [];
    use = [];
    dependsOf = [];
    includs = [];
    scripts = [];
}

class StEvent {
    value;
    onChange(callback) { }
    //_subscribers;
    //get subscribers(){}
    //set subscribers(v){}

    constructor(value) {
        this.value = value;
    }
}

class ComponentPart {
    template;
    proxy;
    props;
    /** @type { Map<{ type: string, inject: boolean, proxy: boolean, prop: boolean, propParsing: boolean }> } */
    annotations;
    /**
     * @type { ViewComponent }
     */
    component;

    constructor({ template, component, proxy, props, annotations }) {
        this.template = template;
        this.component = component;
        this.proxy = proxy;
        this.props = props;
        this.annotations = annotations;
    }

    render() {
        const { template, component } = this;
        const cntr = document.getElementById(component.dynCmpGeneratedId);
        //cntr.innerHTML
    }

}

class BaseComponent extends BehaviorComponent {


    /**
     * @type {SettingType}
     */
    settings = null;
    componentName;
    componentId;
    template;
    cmpProps = [];
    cmpInternalId = null;
    routableCmp = null;
    $stillLoadCounter = 0;
    $stillIsThereForm = null;
    $stillpfx = $stillconst.STILL_PREFIX;
    subImported = false;
    isRoutable;
    onChangeEventsList = [];
    afterInitEventToParse = [];
    isPublic = false;
    dynCmpGeneratedId = null;
    stillElement = false;
    proxyName = null;
    parentVersionId = null;
    versionId = null;
    #annotations = new Map();
    wasAnnotParsed = false;


    /**
     * signature method only
     * @param {object|any} 
     * @returns { ViewComponent | BaseComponent } 
     */
    new(params) { }

    async load() { }

    async onRender() { }

    stOnUpdate() { }

    stAfterInit() { }

    reRender() { }

    props(props = {}) {
        this.cmpProps = props;
        return this;
    }

    setRoutableCmp(flag) {
        this.routableCmp = true;
    }

    getRoutableCmp() {
        return this.routableCmp;
    }

    getName() {
        return this.constructor.name;
    }

    getInstanceName() {
        return this.constructor.name.replace('C', '');
    }

    getProperties() {

        if (!this.wasAnnotParsed) this.#parseAnnotations();

        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = [
            'settings', 'componentName', 'template',
            'cmpProps', 'htmlRefId', 'new', 'cmpInternalId',
            'routableCmp', '$stillLoadCounter', 'subscribers',
            '$stillIsThereForm', '$stillpfx', 'subImported',
            'onChangeEventsList', 'isPublic', '$stillExternComponentParts',
            'dynCmpGeneratedId', 'stillElement', 'stMyParent', 'proxyName',
            'parentVersionId', 'versionId', 'behaviorEvtSubscriptions',
            'wasAnnotParsed'
        ];
        return fields.filter(
            field => {

                const fieldInspect = this[field];
                if (fieldInspect?.name == 'Prop'
                    || fieldInspect?.onlyPropSignature)
                    return true;

                /**
                 * Check the liklyhood
                 * of the field ot be a proxy
                 */
                if (fieldInspect instanceof Object && !(fieldInspect instanceof Array)) {
                    /**
                     * Ignore current field
                     * in case it's a Proxy
                     */
                    if (
                        (fieldInspect.name == 'Proxy' && 'revocable' in fieldInspect)
                        /* || fieldInspect.name == 'Prop'
                        || fieldInspect?.onlyPropSignature */
                    )
                        return false;
                }

                return !excludingFields.includes(field)
                    && !field.startsWith(this.$stillpfx)
                    && !(this.#annotations.get(field)?.propParsing)
            }
        );

    }

    getStateValues() {
        const result = {};
        const fields = this.getProperties();
        for (const field of fields) {
            result[field] = this[this.$stillpfx + '_' + field];
        }
        return this;
    }

    getProperInstanceName() {
        return this.getRoutableCmp() ? this.getName() : this.getInstanceName();
    }

    getClassPath() {
        let path;
        const dynamic = $stillconst.DYNAMIC_CMP_PREFIX;

        if (this.stillElement) {
            path = `$still.context.componentRegistror.getComponent('${this.cmpInternalId}')`;
        }

        else if (this.isPublic) {
            path = `Public_${this.constructor.name}`;
        }

        else {

            if (
                this.cmpInternalId && !this.isRoutable
                && !this.getRoutableCmp()
                /* && this.cmpInternalId.indexOf(dynamic) == 0 */
            ) {
                /** If component was generated dynamically in a loop */
                path = `$still.context.componentRegistror.getComponent('${this.cmpInternalId}')`;

            } else {

                if (this.getRoutableCmp())
                    path = `$still.context.componentRegistror.getComponent('${this.getName()}')`;
                else
                    path = `$still.component.get('${this.getInstanceName()}')`;
            }

        }

        return path;
    }

    isThereAForm() {
        if (!this.$stillIsThereForm) {
            const form = $stillconst.CMP_FORM_PREFIX
            this.$stillIsThereForm = this.template.indexOf(form) >= 0;
        }
        return this.$stillIsThereForm;
    }

    getBoundState() {

        const fields = this.getProperties();
        const currentClass = this;

        if (this.template instanceof Array)
            this.template = this.template.join('');


        let tamplateWithState = this.template;

        /**
         * Bind @dynCmpGeneratedId which takes place in special
         * situation that a component is created to be reference
         * as a tag <st-extern>
         */
        tamplateWithState = tamplateWithState.replace(
            `@dynCmpGeneratedId`,
            currentClass[`dynCmpGeneratedId`]
        );

        let formsRef = [];
        if (this.isThereAForm()) {
            formsRef = this.#getFormReference(tamplateWithState);
            if (formsRef?.length)
                formsRef.forEach(r => currentClass[r.formRef] = new STForm());
        }

        /**
         * Inject/Bind the component state/properties to the
         * referenced place
         */
        fields.forEach(field => {
            tamplateWithState = tamplateWithState.replace(`@${field}`, currentClass[field]?.value || currentClass[field]);
            tamplateWithState = this.getBoundInputForm(tamplateWithState, formsRef);
        });

        return tamplateWithState;
    }

    getBoundLoop(template) {
        /**
         * Bind (for loop)
         */
        const extremRe = /[\n \r \< \$ \( \) \. \- \s A-Za-z \= \"]{0,}/.source;
        const matchForEach = /(\(forEach\))\=\"(\w*){0,}\"/.source;
        const forEach = '(forEach)="';

        const re = new RegExp(extremRe + matchForEach + extremRe, 'gi');
        let cmd = this.getClassPath();

        template = template.replace(re, (mt) => {
            let ds = '';
            const loopPos = mt.indexOf(forEach);
            if (loopPos >= 0) {
                ds = mt.substr(loopPos).split('"')[1].trim();
            }

            let subscriptionCls = '';
            if (mt.indexOf(`class="`) >= 0)
                mt = mt.replace(`class="`, `class="listenChangeOn-${this.getProperInstanceName()}-${ds} `);
            else
                subscriptionCls = `class="listenChangeOn-${this.getProperInstanceName()}-${ds}" `;

            mt = mt.replace(`(forEach)="${ds}"`, subscriptionCls);

            return mt;

        }).replaceAll('each="item"', 'style="display:none;"');

        return template;
    }

    getBoundProps(template) {
        /**
         * Inject/Bind the component props/params to the
         * referenced place
         */
        Object.entries(this.cmpProps).forEach(([key, value]) => {
            template = template.replace(`{{${key}}}`, value);
        });

        return template;
    }

    getBoundClick(template) {
        /**
         * Bind (click) event to the UI
         */
        let cmd = this.getClassPath();
        template = template.replaceAll(
            /\(click\)\=\"/gi,
            `onclick="${cmd}.`
        );

        return template;
    }

    parseOnChange() {

        this.onChangeEventsList.forEach(elm => {

            const evtComposition = elm.evt.split('="')[1].split('(');
            const evt = evtComposition[0];
            const paramVal = evtComposition[1].replace(')', '');
            const uiElm = elm._className;
            document.querySelector(`.${uiElm}`).onchange = async (event) => {
                const inpt = event.target;
                const { value, dataset: { formref, field, cls } } = inpt;
                const fieldPath = `${cls}${formref ? `-${formref}` : ''}`;

                let isValid = true;
                if (value == '')
                    isValid = false;

                if (!isValid) inpt.classList.add('still-validation-failed-style');
                else inpt.classList.remove('still-validation-failed-style');

                if (fieldPath && field)
                    BehaviorComponent.currentFormsValidators[fieldPath][field]['isValid'] = isValid;

                setTimeout(() => {
                    const param = paramVal.indexOf('$event') == 0 ? event : paramVal;
                    eval(this.getClassPath())[field] = value;
                    eval(this.getClassPath())[evt](param);
                })
            }
        });
    }

    getBoundOnChange(template) {

        const extremRe = /[\n \r \( \) A-Za-z0-9 \- \s \" \=]{0,}/.source;
        const mathIfChangeEvt = /\(change\)\=\"(\w*)\([\_\$A-Za-z0-9]{0,}\)\"/;
        const matchChange = '(change)="';

        const re = new RegExp(extremRe + mathIfChangeEvt.source + /\s?/.source + extremRe, 'gi');

        template = template.replace(re, (mtch) => {

            const changePos = mtch.indexOf(matchChange) + matchChange.length;
            const changeEvt = mtch.substr(changePos).split(')')[0] + ')';

            if (mtch.length > 0) {

                const _className = ` onChange_${Math.random().toString().substring(2)}`;
                this.onChangeEventsList.push({ evt: `(change)="${changeEvt}"`, _className: _className.trim() });
                if (mtch.indexOf('class="') >= 0) {
                    mtch = mtch
                        .replace(`class="`, `class="${_className} `);
                } else {
                    mtch += `class="${_className.trim()} " `;
                }
            }
            mtch = mtch.replace(mathIfChangeEvt, '');
            return mtch;
        });
        return template;

    }

    getBoundInputForm(template, formsRef) {
        /**
         * Bind (value) on the input form
         */
        if (this.isThereAForm()) {

            const extremRe = /[\n \r \< \$ \( \) \- \s A-Za-z0-9 \{ \} \[ \] \, \ç\à\á\ã\â\è\é\ê\ẽ\í\ì\î\ĩ\ó\ò\ô\õ\ú\ù\û\ũ \= \"]{0,}/.source;
            const matchValueBind = /\(value\)\=\"\w*\"\s?/.source;
            const matchForEachRE = '(forEach)=\"';

            const valueBindRE = new RegExp(extremRe + matchValueBind + extremRe, "gi");

            template = template.replace(valueBindRE, (mt, matchPos) => {

                const isThereComboBox = mt.indexOf('select') >= 0;
                const matchForEach = mt.indexOf(matchForEachRE);
                let forEachValue = '';
                if (matchForEach >= 0)
                    forEachValue = mt.substr(matchForEach, mt.indexOf('"'));

                if (mt.length > 0) {

                    const checkPos = mt.indexOf(`(value)="`) + 9;
                    const field = mt.slice(checkPos, mt.indexOf('"', checkPos));
                    const formRef = formsRef?.find(r => matchPos > r.pos) || '';

                    const { replacer, mt: updatedMt } = this.#getFormInputReplacer(
                        mt, field, isThereComboBox, forEachValue, formRef
                    );
                    mt = updatedMt.replace(`(value)="${field}"`, replacer);
                }
                return mt;
            });
        }
        return template;
    }

    /**
     * 
     * @param {string} template 
     * @returns { string }
     */
    getBoundRender(template) {

        const extremRe = /[\n \r \< \$ \( \) \- \s A-Za-z \= \" \.]{0,}/.source;
        const matchRenderIfRE = /\(renderIf\)\="[A-Za-z0-9 \. \( \)]{0,}\"/;
        const matchShowIfRE = /\(showIf\)\="[A-Za-z0-9 \. \( \)]{0,}\"/;
        const reSIf = new RegExp(extremRe + matchShowIfRE.source + extremRe, 'gi');
        const reRIf = new RegExp(extremRe + matchRenderIfRE.source + extremRe, 'gi');
        const handleError = this.#handleErrorMessage;

        console.log(template.match(matchRenderIfRE));

        template = this.parseRenderIf(template, reRIf, matchRenderIfRE, matchShowIfRE, handleError);
        template = this.parseShowIf(template, reSIf, matchShowIfRE, handleError);

        return template;
    }

    parseShowIf(template, reSIf, matchShowIfRE, handleErrorMessage) {
        const cls = this;
        return template.replace(reSIf, (mt) => {

            let result = mt;
            const cleanMatching = mt.replace('\n', '').replace(/\s{0,}/, '');
            if (cleanMatching.charAt(0) == '<') {
                const matchInstance = mt.match(matchShowIfRE)[0];
                const showFlag = matchInstance.split('"')[1].replace('"', "");

                let showFlagValue, listenerFlag;
                if (showFlag.indexOf('self.') == 0) {
                    const classFlag = `${showFlag.replace('self.', '').trim()}`;

                    try {
                        showFlagValue = eval(`cls.${classFlag}`);
                        listenerFlag = '_stFlag' + classFlag + '_' + cls.constructor.name + '_change';
                        Object.assign(showFlagValue, { listenerFlag, inVal: showFlagValue.value });
                    } catch (e) {
                        handleErrorMessage(classFlag, matchInstance);
                    }
                }

                /**
                 * Validate the if the flag value is false, in case it's false then hide
                 */
                let hide = '';
                if (!showFlagValue.value) hide = $stillconst.PART_HIDE_CSS;
                else hide = '';

                if (mt.indexOf('class="') > 0) {
                    /**
                     * .replace('class="', `class="${hide} `) 
                     *      Add the framework hide classso that component gets hidden
                     * 
                     * .replace(matchInstance, '');
                     *      Remove the (renderIf) dorectove so it does not shows-up on the final HTML code
                     */
                    result = mt
                        .replace('class="', `class="${hide} ${listenerFlag} `)
                        .replace(matchInstance, '');
                } else {
                    /**
                     * .replace(matchInstance, `class="${hide}"`) 
                     *      Replace the (renderIf)="anything" directive and value with hide classe
                     */
                    result = mt.replace(matchInstance, `class="${hide} ${listenerFlag}"`);
                }
            }
            return result;
        });
    }

    parseRenderIf(template, reRIf, matchRenderIfRE, matchShowIfRE, handleErrorMessage) {

        const cls = this;
        return template.replace(reRIf, (mt) => {

            const cleanMatching = mt.replace('\n', '').replace(/\s{0,}/, '');
            let result = mt;
            if (cleanMatching.charAt(0) == '<') {
                const matchInstance = mt.match(matchRenderIfRE)[0];
                const renderFlag = matchInstance.split('"')[1].replace('"', "");
                let renderFlagValue;
                if (renderFlag.indexOf('self.') == 0) {
                    const classFlag = `${renderFlag.replace('self.', '').trim()}`;
                    try {
                        renderFlagValue = eval(`cls.${classFlag}`);
                    } catch (e) {
                        handleErrorMessage(classFlag, matchInstance);
                    }
                }

                /**
                 * Validate the if the flag value is false, in case it's false then hide it and
                 * then mark this view part to be removed 
                 */
                if (!renderFlagValue.value) {

                    const isThereShowIf = mt.match(matchShowIfRE);
                    /**
                     * Remove (showif) from the tag since showIf is 
                     * irrelevant in case Render if is false
                     */
                    if (isThereShowIf) mt = mt.replace(matchShowIfRE, '');

                    const hide = $stillconst.PART_HIDE_CSS;
                    const remove = $stillconst.PART_REMOVE_CSS;
                    if (mt.indexOf('class="') > 0) {
                        /**
                         * .replace('class="', `class="${hide} ${remove} `) 
                         *      Mark the component part to be remove and to be hidden beforehand on bellow stmt
                         *      in this situation, there is a classe stated already, it adds the two new classes
                         * 
                         * .replace(matchInstance, '');
                         *      Remove the (renderIf) dorectove so it does not shows-up on the final HTML code
                         */
                        result = mt
                            .replace('class="', `class="${hide} ${remove} `)
                            .replace(matchInstance, '');
                    } else {
                        /**
                         * .replace(matchInstance, `class="${hide} ${remove}"`) 
                         *      Replace the (renderIf)="anything" directive and value with 
                         *      classes for both hide and remove the view part
                         */
                        result = mt.replace(matchInstance, `class="${hide} ${remove}"`);
                    }
                } else {
                    result = mt.replace(matchInstance, '');
                }
            }
            return result;
        });
    }

    incrementLoadCounter() {
        setTimeout(() => {
            this.$stillLoadCounter = this.$stillLoadCounter + 1;
        }, 1000);
    }

    /**
     * Parse the template, inject the components 'props' and 'state' if defined in the component
     */
    getBoundTemplate() {

        console.time('tamplateBindFor' + this.getName());

        this.#parseAnnotations();

        /**
         * Bind the component state and return it (template)
         * NOTE: Needs to be always the first to be called
         */
        let template = this.getBoundState();

        template = this.getBoundRender(template);

        /** Parse still tags */
        template = this.parseStSideComponent(template),
            /** Bind the props to the template and return */
            template = this.getBoundProps(template);
        /** Bind the click to the template and return */
        template = this.getBoundClick(template);

        template = this.getBoundLoop(template);

        template = this.getBoundOnChange(template);

        console.timeEnd('tamplateBindFor' + this.getName());

        return template;
    }

    render() {
        this.incrementLoadCounter();
        document.write(this.getBoundTemplate());
    }

    getTemplate(count = true) {
        this.incrementLoadCounter();
        return this.getBoundTemplate();
    }

    prepareRender() {

        const fields = this.getProperties();
        const currentClass = this;

        fields.forEach(field => {
            this.template = this.template.replace(`@${field}`, currentClass[field].value);
        });

        Object.entries(this.cmpProps).forEach(([key, value]) => {
            this.template = this.template.replace(`{{${key}}}`, value);
        });

    }

    /**
     * 
     * @param {SettingType} settings 
     */
    setup(settings) {
        this.componentName = this.constructor.name;
        this.settings = settings;

        new Promise((resolve) => {

            setTimeout(() => {
                if (settings.includs) {
                    settings.includs.forEach((/** @type {ViewComponent} */cmp) => cmp.render());
                    resolve(null);
                } else {
                    resolve(null);
                }
            });

        }).then(() => {

            if (settings.scripts) settings.scripts.forEach(this.importScript);

        });

        $still.context.componentRegistror.export({ ...settings, instance: this });
    }

    setPath(path) {
        this.settings.path = path;
        return this;
    }

    setComponentName(name) {
        this.settings.componentName = name;
        return this;
    }

    register() {
        $still.context.componentRegistror.export(settings);
    }

    importScript(scriptPath) {
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptPath;
        document.head.appendChild(script);
    }

    updateState(object = {}) {
        this.getProperties().forEach(field => {
            if (this['_' + field] = undefined) {
                this['_' + field] = {
                    value: object[field]
                };
            }
        })
    }

    constructor() {
        super();
    }

    setUUID(hash) {
        this.cmpInternalId = hash;
    }

    getUUID() {
        if (!this.cmpInternalId)
            this.cmpInternalId = '_cmp' + Math.random().toString().split('.')[1];
        return this.cmpInternalId;
    }

    getCmpId() {
        if (!this.componentId)
            this.cmpInternalId = Math.random().toString().split('.')[1];
        return this.cmpInternalId;
    }

    /** 
     * This serves for Components class to register any DOM event listener added for the component
     * for not only onchange event is being addressed through here
     */
    /* addAfterInitEvents(event){
        this.afterInitEventToParse.push(event);
    } */

    /** 
     * Initially this is for parsing onchange events as they are generated on the Components class
     * in the future other events can be migrated to here according to the performance gain or not
     */
    /* parseAfterInitEvents(){
        this.afterInitEventToParse.forEach(evt => {
            console.log(`creating an event`);
            evt();
        });
    } */

    reRender() {

        const settings = this.settings;
        new Promise((resolve) => {

            setTimeout(() => {
                if (settings.includs) {
                    settings.includs.forEach((/** @type {ViewComponent} */cmp) => cmp.render());
                    resolve(null);
                } else {
                    resolve(null);
                }
            });

        }).then(() => {
            if (settings.scripts) settings.scripts.forEach(this.importScript);
        });
    }

    wasItLoadedBefor() {
        return ComponentRegistror.previousLoaded(this);
    }

    stRunOnFirstLoad(cb = () => { }) {
        if (this.wasItLoadedBefor() && this.$stillLoadCounter)
            return false;
        cb();
    }

    async stLazyExecution(cb = () => { }) {

        const multiplier = 1000;
        let retryCounter = 2;

        const timer = setInterval(async () => {

            try {
                await cb();
                clearInterval(timer);
            } catch (error) {
                if (error instanceof ComponentNotFoundException) {

                    if (retryCounter < 8) retryCounter++
                    const content = JSON.parse(error.message);
                    const path = $stillGetRouteMap().route[content.component];

                    const script = $stillLoadScript(path, content.component);
                    document.head.insertAdjacentElement('beforeend', script);
                    script.onload = function () {
                        const registror = $still.context.componentRegistror.componentList;
                        const instance = eval(`new ${content.component}()`);
                        instance.subImported = true;
                        if (!(instance in registror))
                            registror[content.component] = { instance, subImported: true };
                    }
                    await sleepForSec(multiplier * retryCounter);

                }
            }

        }, 500);

    }

    stAfterAppInit(cb = () => { }) {
        const timer = setTimeout(() => {

            try {
                cb();
                clearTimeout(timer);
            } catch (error) { }

        }, 1000);
    }

    resetState() {
        Router.goto(this.getProperInstanceName());
    }

    parseStSideComponent(template, cmpInternalId = null, cmpUUID = null) {

        const uuid = cmpUUID || this.getUUID();
        if (cmpInternalId) this.cmpInternalId = cmpInternalId;

        const parseValue = (r, v, f, mt) => {

            v = v.trim();
            const lastChar = r.trim().at(-1);
            if (lastChar != '"' && lastChar != ">") {
                const strtPos = mt.indexOf(`${f}="`);
                v = mt.substring(
                    (strtPos + f.length + 2),
                    mt.indexOf('"', (strtPos + f.length + 2))
                );
            };

            return v.replace(/\"/g, '')
                .replace("\n", "")
                .replace(">", "");
        }

        let re = /\<st-element[\> \. \" \, \w \s \= \- \ \( \)]{0,}/g;
        if (cmpInternalId == 'fixed-part')
            re = /\<st-fixed[\> \. \" \, \w \s \= \- \ \( \)]{0,}/g;

        if (this.cmpInternalId in Components.componentPartsMap) {
            delete Components.componentPartsMap[this.cmpInternalId];
        }

        this.versionId = UUIDUtil.newId();
        template = template.replace(re, (mt) => {

            const propMapper = {};
            mt.split(' ').forEach(r => {
                if (r != '' && r.indexOf('="') > 0) {
                    let [f, v] = r.split('=');
                    const [field, value] = [f, parseValue(r, v, f, mt)];
                    propMapper[field] = value;
                }
            });

            const [cmpName, proxy] = [propMapper['component'], propMapper['proxy']];
            const props = {};
            Object.entries(propMapper).forEach(([prop, val]) => {
                props[prop] = val;
            });

            const [cmpId, cmp] = [`st_${UUIDUtil.numberId()}`, eval(`new ${cmpName}()`)];
            cmp.onRender();
            cmp.dynCmpGeneratedId = cmpId;
            cmp.cmpInternalId = `dynamic-${cmp.getUUID()}${cmpName}`;
            cmp.stillElement = true;
            cmp.proxyName = proxy;
            ComponentRegistror.register(
                cmp.cmpInternalId,
                cmp
            );

            if (!(this.cmpInternalId in Components.componentPartsMap)) {
                Components.componentPartsMap[this.cmpInternalId] = [];
            }

            Components.componentPartsMap[this.cmpInternalId].push(
                new ComponentPart({
                    template: null, component: cmp,
                    proxy, props,
                    annotations: this.#annotations
                })
            );

            return `<still-placeholder style="display:content;" class="still-placeholder${uuid}"></still-placeholder>`;

        });

        return template;

    }

    #handleErrorMessage(classFlag, matchInstance) {
        if (classFlag.at(-1) == ')') {
            console.error(`
                Method with name ${classFlag} does not exists for 
                ${cls.constructor.name} as referenced on ${matchInstance}
            `);
        }
        else {
            console.error(`
                Property with name ${classFlag} does not exists for 
                ${cls.constructor.name} as referenced on ${matchInstance}
            `);
        }
    }

    /**
     * 
     * @param { string } template 
     * @returns { Array<{ formRef: string, pos: number }> }
     */
    #getFormReference(template) {

        const matchFormRefRE = /\(formRef\)\={1}\"[a-zA-Z0-9]{0,}\"/g;
        const formRef = [...template.matchAll(matchFormRefRE)];
        if (formRef.length) {
            const allForms = formRef.map(r => ({ formRef: r[0].split("=")[1].replaceAll('"', ''), pos: r.index }));
            return allForms;
        }
        return null;

    }

    #getFormInputReplacer(mt, field, isThereComboBox, forEachValue, formRef) {

        let val = ''
        if (!(this[field] instanceof Object) && !!(this[field]))
            val = this[field];

        const validatorClass = BehaviorComponent.setOnValueInput(mt, this, field, (formRef?.formRef || null));
        const classList = `${validatorClass} listenChangeOn-${this.getProperInstanceName()}-${field}`;

        const clsPath = this.getClassPath();

        let subscriptionCls = '';
        const clsName = this.constructor.name;
        const comboSuffix = isThereComboBox ? '-combobox' : '';
        const dataFields = `${isThereComboBox
            ? `data-formRef="${formRef?.formRef || ''}" 
                   data-field="${field}" 
                   data-cls="${clsName}"`
            : ''
            }`;

        if (mt.indexOf(`class="`) >= 0)
            mt = mt.replace(`class="`, `${dataFields} class="${classList}${comboSuffix} `);
        else
            subscriptionCls = `${dataFields} class="${classList}${comboSuffix}" `;

        let replacer = `${subscriptionCls} `;
        if (!(isThereComboBox))
            replacer = `${forEachValue} 
                        value="${val}" ${subscriptionCls}  
                        onkeyup="${clsPath}.onValueInput(event,'${field}',this, '${formRef?.formRef || null}')"`;

        return { mt, replacer };

    }

    ignoreProp = [];
    services = [];
    #parseAnnotations() {

        const classDefinition = this.constructor.toString();
        const injectOrProxyRE = /(\@Inject|\@Proxy|\@Prop){0,1}[\n \s \*]{0,}/;
        const commentRE = /(\@type){0,1}[\s \@ \{ \} \: \| \< \> \, A-Za-z0-9]{1,}[\* \s]{1,}\//;
        const newLineRE = /[\n]{0,}/;
        const fieldNameRE = /[\s A-Za-z0-9 \$ \# \(]{1,}/;
        const re = injectOrProxyRE.source + commentRE.source + newLineRE.source + fieldNameRE.source;
        const cmp = this;

        classDefinition.replace(new RegExp(re, 'g'), async (mt) => {

            /**
             * If statement is in place to not parse skip method 
             * parsing when it finds a comment annotation
             */
            if (!mt.includes('(')) {
                const commentEndPos = mt.indexOf('*/') + 2;
                const propertyName = mt.slice(commentEndPos).replace('\n', '').trim();

                let inject, proxy, prop, propParsing, type;
                if (propertyName != '') {

                    inject = mt.includes('@Inject');
                    proxy = mt.includes('@Proxy');
                    prop = mt.includes('@Prop');

                    if (mt.includes("@type")) {
                        type = mt.split('{')[1].split('}')[0].trim();
                        type = type.replace(/\s/g, '');
                    }
                    propParsing = inject || proxy || prop || $stillconst.PROP_TYPE_IGNORE.includes(type);

                    if (inject) {
                        let service = ComponentSetup.get()?.services?.get(type);
                        cmp.#handleServiceInjection(cmp, propertyName, type, service);
                    }
                }
                cmp.#annotations.set(propertyName, { type, inject, proxy, prop, propParsing });

            }
        });
        this.wasAnnotParsed = true;

    }

    #handleServiceInjection(cmp, propertyName, type, service) {

        //cmp[propertyName]['subscribers'] = [];
        const tempObj = {

            on: async (_, action) => {

                if (cmp[propertyName]?.ready) {
                    await action();
                    return;
                }

                if (!('subscribers' in tempObj)) {
                    Object.assign(tempObj, { subscribers: [], status: $stillconst.A_STATUS.PENDING })
                }
                tempObj.subscribers.push(action);
            },

            load: () => {

                if (!('status' in tempObj)) {
                    Object.assign(tempObj, { status: $stillconst.A_STATUS.DONE, subscribers: [] });
                    return;
                }

                tempObj.status = $stillconst.A_STATUS.PENDING;
                tempObj.subscribers?.forEach(async (action) => await action());
            }

        }

        cmp[propertyName] = tempObj;

        if (service) cmp[propertyName] = { ...cmp[propertyName], ...service, ready: true };

        const servicePath = ComponentSetup.get().servicePath + '/' + type + '.js';

        if (!document.getElementById(servicePath)) {
            const script = document.createElement('script');
            [script.src, script.id] = [servicePath, servicePath];
            script.onload = async function () {

                const service = eval(`new ${type}()`);
                ComponentSetup.get()?.services?.set(type, service);
                handleServiceAssignement(service);
                Components.emitAction(cmp.constructor.name);
            }
            document.head.insertAdjacentElement('beforeend', script);

        } else {
            Components.subscribeAction(
                cmp.constructor.name,
                () => {
                    const service = ComponentSetup.get()?.services?.get(type);
                    handleServiceAssignement(service);
                }
            );
        };

        function handleServiceAssignement(service) {

            service['ready'] = true;
            service['status'] = cmp[propertyName].status;
            service['subscribers'] = cmp[propertyName].subscribers;
            service['load'] = cmp[propertyName].load;
            service['on'] = cmp[propertyName].on;
            cmp[propertyName] = service;
            cmp[propertyName].load();

        }

    }

}
