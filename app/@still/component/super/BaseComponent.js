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
    /**
     * @type { ViewComponent }
     */
    component;

    constructor({ template, component, proxy, props }) {
        this.template = template;
        this.component = component;
        this.proxy = proxy;
        this.props = props;
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
    /**
     * @type { Array<ComponentPart> }
     */
    $stillExternComponentParts = [];


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

        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = [
            'settings', 'componentName', 'template',
            'cmpProps', 'htmlRefId', 'new', 'cmpInternalId',
            'routableCmp', '$stillLoadCounter', 'subscribers',
            '$stillIsThereForm', '$stillpfx', 'subImported',
            'onChangeEventsList', 'isPublic', '$stillExternComponentParts',
            'dynCmpGeneratedId', 'stillElement'
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

                /* if (typeof fieldInspect == 'function') {
                    if (fieldInspect.name == 'Prop') {
                        return false;
                    }
                } */

                return !excludingFields.includes(field)
                    && !field.startsWith(this.$stillpfx)
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

        /**
         * Inject/Bind the component state/properties to the
         * referenced place
         */
        fields.forEach(field => {
            tamplateWithState = tamplateWithState.replace(`@${field}`, currentClass[field]?.value || currentClass[field]);
            tamplateWithState = this.getBoundInputForm(tamplateWithState, field);
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
                setTimeout(() => {
                    const param = paramVal.indexOf('$event') == 0 ? event : paramVal;
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

    getBoundInputForm(template, field, value) {
        /**
         * Bind (value) on the input form
         */

        if (this.isThereAForm()) {

            const emptyField = '';
            const clsPath = this.getClassPath();

            const extremRe = /[\n \r \< \$ \( \) \- \s A-Za-z \= \"]{0,}/.source;
            const matchValueBind = /\(value\)\=\"\w*\"\s?/.source;
            const matchForEachRE = '(forEach)=\"';
            const valueBindRE = new RegExp(extremRe + matchValueBind + extremRe, "gi");

            template = template.replace(valueBindRE, (mt) => {

                const isThereComboBox = mt.indexOf('select') >= 0;
                const matchForEach = mt.indexOf(matchForEachRE);
                let forEachValue = '';
                if (matchForEach >= 0)
                    forEachValue = mt.substr(matchForEach, mt.indexOf('"'));

                if (mt.length > 0) {

                    const checkPos = mt.indexOf(`(value)="`) + 9;
                    const field = mt.slice(checkPos, mt.indexOf('"', checkPos));

                    let val = emptyField
                    if (!(this[field] instanceof Object) && !!(this[field]))
                        val = this[field];

                    let subscriptionCls = '';
                    let comboSuffix = isThereComboBox ? '-combobox' : '';
                    if (mt.indexOf(`class="`) >= 0)
                        mt = mt.replace(`class="`, `class="listenChangeOn-${this.getProperInstanceName()}-${field}${comboSuffix} `);
                    else
                        subscriptionCls = `class="listenChangeOn-${this.getProperInstanceName()}-${field}${comboSuffix}" `;

                    let replacer = `${subscriptionCls} `;
                    if (!(isThereComboBox))
                        replacer = `${forEachValue} value="${val}" ${subscriptionCls} onkeyup="${clsPath}.onValueInput('${field}',this.value)"`;

                    mt = mt.replace(`(value)="${field}"`, replacer);
                }
                return mt;
            });
        }
        return template;
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
        /**
         * Bind the component state and return it (template)
         * NOTE: Needs to be always the first to be called
         */
        let template = this.getBoundState();

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

    parseStSideComponent(template) {

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

        const re = /\<st-element[\> \. \" \, \w \s \= \- \ \( \)]{0,}/g;
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

            const [cmpId, cmp] = [`st_${Math.random().toString().split('.')[1]}`, eval(`new ${cmpName}()`)];
            cmp.dynCmpGeneratedId = cmpId;
            cmp.cmpInternalId = `dynamic-${cmp.getUUID()}${cmpName}`;
            cmp.stillElement = true;
            $still.context.componentRegistror.componentList[cmp.cmpInternalId] = { instance: cmp };
            this.$stillExternComponentParts.push(
                new ComponentPart({
                    template: cmp.getBoundTemplate(), component: cmp,
                    proxy, props
                })
            );

            return `<still-placeholder style="display:content;"></still-placeholder>`;

        });

        return template;

    }

}
