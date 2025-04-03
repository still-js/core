import { StillAppSetup } from "../../../app-setup.js";
import { stillRoutesMap as DefaultstillRoutesMap } from "../../../route.map.js";
import { Router as DefaultRouter } from "../../routing/router.js";
import { Components } from "../../setup/components.js";
import { $stillconst, ST_RE as RE } from "../../setup/constants.js";
import { UUIDUtil } from "../../util/UUIDUtil.js";
import { getBasePath, getRouter, getRoutesFile } from "../../util/route.js";
import { $still, ComponentNotFoundException, ComponentRegistror } from "../manager/registror.js";
import { sleepForSec } from "../manager/timer.js";
import { STForm } from "../type/STForm.js";
import { BehaviorComponent } from "./BehaviorComponent.js";
import { ViewComponent } from "./ViewComponent.js";
import { BaseService } from "./service/BaseService.js";

const stillRoutesMap = await getRoutesFile(DefaultstillRoutesMap);
const Router = getRouter(DefaultRouter);

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
    /** @type { ViewComponent } */
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

export class BaseComponent extends BehaviorComponent {


    /**
     * @type {SettingType}
     */
    settings = null;
    componentName;
    componentId;
    template;
    templateUrl;
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
    baseUrl = window.location.href;
    #stateChangeSubsribers = [];
    bindStatus;
    $parent;
    routesMap = {
        ...stillRoutesMap.viewRoutes.lazyInitial,
        ...stillRoutesMap.viewRoutes.regular
    };
    dynLoopObject = false;
    lone = false;
    loneCntrId = null;
    setAndGetsParsed = false;
    navigationId = Router.navCounter;


    /**
     * signature method only
     * @param {object|any} 
     * @returns { ViewComponent | BaseComponent } 
     */
    new(params) { }

    async load() { }

    async onRender() {
        this.stOnRender();
    }

    async stOnUpdate() { }

    async stAfterInit() { }

    async stOnUnload() { }

    async stOnRender() { }

    reRender() { }

    static importScripts() { }

    static importAssets() { }

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
        return this.constructor.name;
    }

    getStateSubriber() {
        return this.#stateChangeSubsribers;
    }

    getProperties(allowfProp = false) {

        if (!this.wasAnnotParsed) this.#parseAnnotations();

        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = [
            'settings', 'componentName', 'template',
            'cmpProps', 'htmlRefId', 'new', 'cmpInternalId',
            'routableCmp', '$stillLoadCounter', 'subscribers',
            '$stillIsThereForm', '$stillpfx', 'subImported',
            'onChangeEventsList', 'isPublic', '$stillExternComponentParts',
            'dynCmpGeneratedId', 'stillElement', 'proxyName',
            'parentVersionId', 'versionId', 'behaviorEvtSubscriptions',
            'wasAnnotParsed', 'stateChangeSubsribers', 'bindStatus',
            'templateUrl', '$parent', 'dynLoopObject', 'lone', 'loneCntrId',
            'setAndGetsParsed', 'navigationId'
        ];
        return fields.filter(
            field => {

                const fieldInspect = this[field];
                if (fieldInspect instanceof Function) return false;

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

                if (!allowfProp) {
                    return !excludingFields.includes(field)
                        && !field.startsWith(this.$stillpfx)
                        && !(this.#annotations.get(field)?.propParsing)
                }

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


        if (this.stillElement || !this.isPublic || this.lone) {
            if (!this.cmpInternalId) this.cmpInternalId = this.getUUID();
            path = `$still.context.componentRegistror.getComponent('${this.cmpInternalId}')`;
        }

        else if (this.isPublic)
            path = `$still.context.componentRegistror.getComponent('${this.cmpInternalId}')`;

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

    getBoundState(isReloading = false) {

        const allowfProp = true;
        const fields = this.getProperties(allowfProp);
        const currentClass = this;
        const clsName = this.dynLoopObject || this.lone || isReloading
            ? this.cmpInternalId
            : currentClass.constructor.name;

        if (this.template instanceof Array)
            this.template = this.template.join('');

        let tamplateWithState = this.template;

        /** Bind @dynCmpGeneratedId which takes place in special
         * situation that a component is created to be reference
         * as a tag <st-extern> */
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

        /** Inject/Bind the component state/properties to the
         * referenced place */
        fields.forEach(field => {

            const fieldRE = new RegExp(`@${field}`);
            const finalRE = /\^/.source + fieldRE.source + /\$/;

            tamplateWithState = tamplateWithState.replaceAll(
                `@${field}`,
                (mt, pos) => {

                    /** Extract next 40 chars to handle conflict */
                    const nextChar = tamplateWithState.slice(pos, pos + field.length + 41);

                    /** Check if the match isn't only coencidence 
                     * (e.g. number and number1 are similir in the begining) 
                     * */
                    if (!nextChar.replace(`@${field}`, '')[0]?.match(/[A-Za-z0-9]/)) {

                        let data = currentClass[field];
                        if (data instanceof Object) {
                            if ('value' in data) data = currentClass[field]?.value
                        }

                        if (this.#annotations.has(field)) return data

                        //this.#stateChangeSubsribers.push(`subrcibe-${clsName}-${field}`);
                        return `<state class="state-change-${clsName}-${field}">${data}</state>`;

                    } else {
                        return `@${field}`;
                    }
                }
            );
            tamplateWithState = this.getBoundInputForm(tamplateWithState, formsRef);
        });

        return tamplateWithState;
    }

    getBoundLoop(template) {
        /** Bind (for loop) */
        const cmpName = this.dynLoopObject || this.lone
            ? this.cmpInternalId
            : this.getProperInstanceName()
        const extremRe = /[\n \r \< \$ \( \) \. \- \s A-Za-z \= \"]{0,}/.source;
        const matchForEach = /(\(forEach\))\=\"(\w*){0,}\"/.source;
        const forEach = '(forEach)="';

        const re = new RegExp(extremRe + matchForEach + extremRe, 'gi');
        let cmd = this.getClassPath();

        template = template.replace(re, (mt) => {
            let ds = '';
            const loopPos = mt.indexOf(forEach);
            if (loopPos >= 0) ds = mt.substr(loopPos).split('"')[1].trim();

            let subscriptionCls = '';

            const subsCls = `listenChangeOn-${cmpName}-${ds}`;
            const hashValue = `hash_${this.getUUID()}`;
            const hash = `hash="${hashValue}"`;
            const newClassName = `newCls="${subsCls}"`;
            const finalAttrs = `${newClassName} ${hash} class="${subsCls}`;

            if (mt.indexOf(`class="`) >= 0)
                mt = mt.replace(`class="`, `${finalAttrs} `);
            else
                subscriptionCls = `${finalAttrs}" `;

            mt = mt.replace(`(forEach)="${ds}"`, subscriptionCls);

            return `<output class="${hashValue}"></output>${mt}`;

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

    getBoundClick(template, containerId = null) {
        //Bind (click) event to the UI
        containerId = containerId || this.loneCntrId;
        let cmd = this.getClassPath();
        template = template.replaceAll(
            /\(click\)\=\"[a-zA-Z \(\)'\,\. \$]{0,}/gi,
            (mt) => {

                const methodName = mt.split('="')[1], otherParams = mt.split(",");
                let data = otherParams[1]?.trim().replace(/\'/g, ''),
                    routeName = otherParams[0]?.split('\'')[1]?.trim(),
                    urlFlag = otherParams[2]?.replace(')', '').trim();

                const isEvtParam = mt.split('="')[1].split("(")[1]?.trim() == '$event,'
                    || mt.split('="')[1].split("(")[1]?.trim() == '$event)';

                if (methodName.indexOf('goto(\'') == 0) {
                    if (data) {
                        if (data.startsWith('self.'))
                            data = this[data.replace('self.', '')];
                    }

                    if (urlFlag) {
                        if (urlFlag.startsWith('self.'))
                            urlFlag = this[urlFlag.replace('self.', '')];
                        urlFlag = [true, 'true'].includes(urlFlag);
                    }

                    if (!data || data == 'null') {
                        return `onclick="Router.aliasGoto1('${routeName}',${urlFlag}, '${containerId}')`
                    }
                    data = Router.routingDataParse(data);
                    return `onclick="Router.aliasGoto('${routeName}','${data}', ${urlFlag}, '${containerId}')`;
                }
                if (isEvtParam) {
                    Router.clickEvetCntrId = containerId;
                    Router.serviceId = containerId;
                    return mt.replace('(click)="', 'onclick="' + cmd + '.').replace('$event', 'event');
                }

                return mt.replace('(click)="', `onclick="${cmd}.`);
            }
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
                    const instance = eval(this.getClassPath());

                    if (field != undefined) {
                        if (!(field in instance)) {
                            throw new Error(`Field with name ${field} is not define in ${this.getName()}`);
                        }
                        instance[field] = value;
                    }

                    if (evt != 'Components.void') {
                        if (!(evt in instance)) {
                            throw new Error(`Method with name ${evt}() is not define in ${this.getName()}`);
                        }
                        instance[evt](param);
                    }

                })
            }
        });
    }

    getBoundOnChange(template) {

        const extremRe = /[\n \r \( \) A-Za-z0-9 \- \s \ç\à\á\ã\â\è\é\ê\ẽ\í\ì\î\ĩ\ó\ò\ô\õ\ú\ù\û\ũ \. \_ \" \=]{0,}/.source;
        const mathIfChangeEvt = /\(change\)\=\"(\w*)\([\_\$A-Za-z0-9]{0,}\)\"/;
        const matchChange = '(change)="';

        const re = new RegExp(extremRe + mathIfChangeEvt.source + /\s?/.source + extremRe, 'gi');

        template = template.replace(re, (mtch) => {

            const changePos = mtch.indexOf(matchChange) + matchChange.length;
            const changeEvt = mtch.substr(changePos).split(')')[0] + ')';

            if (mtch.length > 0) {

                const _className = ` onChange_${Math.random().toString().substring(2)}`.trim();
                this.onChangeEventsList.push({ evt: `(change)="${changeEvt}"`, _className });
                if (mtch.indexOf('class="') >= 0) {
                    mtch = mtch
                        .replace(`class="`, `class="${_className} `);
                } else {
                    mtch += `class="${_className} " `;
                }
            }

            mtch = mtch.replace(mathIfChangeEvt, '');
            return mtch;
        });
        return template;

    }

    getBoundInputForm(template, formsRef) {
        //Bind (value) on the input form
        if (this.isThereAForm()) {

            const extremRe = /[\n \r \< \$ \( \) \- \s A-Za-z0-9 \{ \} \[ \] \, \ç\à\á\ã\â\è\é\ê\ẽ\í\ì\î\ĩ\ó\ò\ô\õ\ú\ù\û\ũ \= \"]{0,}/.source;
            const matchValueBind = /\(value\)\=\"\w*\"\s?/.source;
            const matchForEachRE = '(forEach)=\"';
            const matchValue = '(value)="';
            const matchChange = '(change)="';

            const valueBindRE = new RegExp(extremRe + matchValueBind + extremRe, "gi");

            template = template.replace(valueBindRE, (mt, matchPos) => {

                const isThereComboBox = mt.indexOf('<select') >= 0;
                const value = mt.indexOf(matchValue);
                const changeEvt = mt.indexOf(matchChange);

                const onChangeId = this.dynLoopObject
                    ? this.cmpInternalId
                    : Math.random().toString().substring(2);
                if ((isThereComboBox && value >= 0) && changeEvt < 0) {
                    const _className = ` onChange_${onChangeId}`.trim();
                    this.onChangeEventsList.push({ evt: '`(change)="Components.void()"`', _className });

                    if (mt.indexOf('class="') >= 0) {
                        mt = mt
                            .replace(`class="`, `class="${_className} `);
                    } else
                        mt += `class="${_className} " `;
                }

                const matchForEach = mt.indexOf(matchForEachRE);
                let forEachValue = '';
                if (matchForEach >= 0)
                    forEachValue = mt.substr(matchForEach, mt.indexOf('"'));

                if (mt.length > 0) {

                    const checkPos = value + 9;
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

        template = this.parseRenderIf(template, reRIf, matchRenderIfRE, matchShowIfRE, handleError);
        template = this.parseShowIf(template, reSIf, matchShowIfRE, handleError);

        return template;
    }


    parseShowIf(template, reSIf, matchShowIfRE, handleErrorMessage) {

        const clsName = this.dynLoopObject || this.lone
            ? this.cmpInternalId
            : this.constructor.name;
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
                        const value = eval(`cls.${classFlag}`);
                        showFlagValue = { value: value?.parsed ? value.value : value, onlyPropSignature: true };
                        listenerFlag = '_stFlag' + classFlag + '_' + clsName + '_change';
                        Object.assign(showFlagValue, { listenerFlag, inVal: showFlagValue.value, parsed: true });
                        this[classFlag] = showFlagValue;
                    } catch (e) {
                        handleErrorMessage(classFlag, matchInstance);
                    }
                }

                // Validate the if the flag value is false, in case it's false then hide
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

                /** Validate the if the flag value is false, in case it's false then hide it and
                 * then mark this view part to be removed */
                if (!renderFlagValue) {

                    const isThereShowIf = mt.match(matchShowIfRE);
                    /** Remove (showif) from the tag since showIf is 
                     * irrelevant in case Render if is false */
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

    // Parse the template, inject the components 'props' and 'state' if defined in the component
    getBoundTemplate(containerId = null, isReloading = false) {

        console.time('tamplateBindFor' + this.getName());

        if (!this.cmpInternalId) this.cmpInternalId = this.getUUID();
        this.#parseAnnotations();

        /** Bind the component state and return it (template)
         * NOTE: Needs to be always the first to be called */
        let template = this.getBoundState(isReloading);
        template = this.getBoundRender(template);

        /** Parse still tags */
        template = this.parseStSideComponent(template),
            /** Bind the props to the template and return */
            template = this.getBoundProps(template);
        /** Bind the click to the template and return */
        template = this.getBoundClick(template, containerId);

        template = this.getBoundLoop(template);

        template = this.getBoundOnChange(template);

        console.timeEnd('tamplateBindFor' + this.getName());

        this.bindStatus = true;

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
     * @param {SettingType} settings 
     */
    setup(settings) {
        this.componentName = this.constructor.name;
        this.settings = settings;

        if (settings.scripts) settings.scripts.forEach(BaseComponent.importScript);
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

    register = () =>
        $still.context.componentRegistror.export(settings);

    static importScript(scriptPath, module = false, cls = null) {

        const ext = scriptPath.slice(-3);
        const type = {
            '.js': document.createElement('script'),
            'css': document.createElement('link'),
        }

        const script = type[ext];

        if (ext == '.js') {
            script.async = true;
            script.src = scriptPath;
            if (module) script.type = 'module';
        }

        if (ext == 'css') {
            script.href = scriptPath;
            script.rel = 'stylesheet';
        }

        try {

            document.head.appendChild(script);
            if (module)
                script.onload(() => window[cls] = cls);

        } catch (error) { }

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

    wasItLoadedBefor = () =>
        ComponentRegistror.previousLoaded(this);

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
                    const { path } = this.routesMap[content.component];

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

    stWhenReady(cb = () => { }) {
        const timer = setTimeout(async () => {

            try {
                await cb();
                clearTimeout(timer);
            } catch (error) {
                console.log(`Error on when ready: `, error);
            }
        }, 1000);
    }

    parseStSideComponent(template, cmpInternalId = null, cmpUUID = null) {

        const uuid = cmpUUID || this.getUUID(), parentCmp = this;
        if (cmpInternalId) this.cmpInternalId = cmpInternalId;

        let styleRe = RE.bind_css, re = RE.st_element, matchCounter = 0;
        if (cmpInternalId == 'fixed-part') re = RE.st_fixed;

        this.versionId = UUIDUtil.newId();
        template = template.replace(re, (mt) => {

            if (matchCounter == 0) {
                if (this.cmpInternalId in Components.componentPartsMap)
                    delete Components.componentPartsMap[this.cmpInternalId];
                matchCounter++;
            }

            const propMap = this.parseStTag(mt, cmpInternalId);
            let checkStyle = mt.match(styleRe), foundStyle = false;
            if (checkStyle?.length == 3) foundStyle = mt.match(styleRe)[2];

            this.setTempProxy(parentCmp, propMap);

            const { component, ref, proxy: p, each, ...tagProps } = propMap;
            const foundProps = Object.values(tagProps);
            const isThereProp = foundProps.some(r => !r.startsWith('item.'))
                || foundProps.length == 0;

            if (!(this.cmpInternalId in Components.componentPartsMap))
                Components.componentPartsMap[this.cmpInternalId] = [];

            /** Only parse and <st-element> individually in case it's not inside a container
             * with (forEach) notation */
            if (isThereProp) {
                Components.componentPartsMap[this.cmpInternalId].push(
                    new ComponentPart({
                        template: null, component: propMap['component'], props: propMap,
                        proxy: propMap['proxy'], annotations: this.#annotations
                    })
                );
            }

            const addCls = `${cmpInternalId == 'fixed-part' ? $stillconst.ST_FIXE_CLS : ''}`;
            const display = propMap?.each == 'item' ? 'none' : 'contents';
            /**  The attributes componentRef, prop and loopDSource (data source of the forEach)
             * all of them serve as a Metadata for in case the <st-element> is wrapped by a
             * container with (forEach) notation/directive, hence being passed as loopAttrs */
            const loopAttrs = (!isThereProp && propMap?.each != 'item')
                ? ''
                : ` componentRef="${propMap['component']}" loopDSource="${propMap?.each == 'item'}"
                    props=${Object.values(tagProps).length > 0 ? JSON.stringify(tagProps) : '{}'}`;

            return `<still-placeholder 
                        class="still-placeholder${uuid} ${addCls}" ${loopAttrs}
                        style="display:${display}; ${foundStyle != false ? foundStyle : ''}" 
                    >
                    </still-placeholder>`;
        });

        return template;
    }

    setTempProxy(parentCmp, propMap) {

        if (propMap['proxy'] in parentCmp) {
            parentCmp[propMap['proxy']] = { on: (_1, _2) => { }, subscribers: [] };
            parentCmp[propMap['proxy']].on = function (evt, cb = () => { }) {
                if (evt == 'load')
                    parentCmp[propMap['proxy']]?.subscribers?.push(cb);
            }
        } else {
            if (propMap['proxy'] != undefined) {
                const prtName = parentCmp.constructor.name;
                const error = 'Your referencing a proxy ' + propMap['proxy']
                    + ' which is not declare in ' + prtName + ' component';
                throw new ReferenceError(error);
            }
        }
    }

    /** @param { ViewComponent } assigneToCmp */
    parseStTag(mt, type, assigneToCmp = null) {

        const props = mt
            .replace(type == 'fixed-part' ? '<st-fixed' : '<st-element', '')
            .replaceAll('\t', '')
            .replaceAll('\n', '')
            //.replaceAll(' ', '')
            .replaceAll('=', '')
            .replace('>', '').split('"');

        const result = {};
        if (props.length >= 3) props.pop();

        let idx = 0
        while (idx < props.length) {

            const field = typeof props[idx] == 'string' ? props[idx].trim() : props[idx];
            const value = props[++idx];
            if (assigneToCmp) {

                assigneToCmp.getProperties().forEach(r => {
                    if (r.toLowerCase() == field) assigneToCmp[r] = value;
                });

            } else {
                result[field] = typeof value == 'string' ? value : value;
            }
            ++idx;
        }

        return result;
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
        else if (this[field] instanceof Object) {
            if ('value' in this[field]) val = this[field].value;
        }

        const onChangeId = this.dynLoopObject || this.lone
            ? this.cmpInternalId
            : this.getProperInstanceName();
        const validatorClass = BehaviorComponent.setOnValueInput(mt, this, field, (formRef?.formRef || null));
        const classList = `${validatorClass} listenChangeOn-${onChangeId}-${field}`;

        const clsPath = this.getClassPath();

        let subscriptionCls = '';
        const clsName = this.constructor.name;
        const comboSuffix = isThereComboBox ? '-combobox' : '';
        const dataFields = `${isThereComboBox
            ? `data-formRef="${formRef?.formRef || ''}" data-field="${field}" data-cls="${clsName}"`
            : ''
            }`;

        if (mt.indexOf(`class="`) >= 0)
            mt = mt.replace(`class="`, `${dataFields} class="${classList}${comboSuffix} stillInputField-${field} `);
        else
            subscriptionCls = `${dataFields} class="${classList}${comboSuffix} stillInputField-${field}" `;

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

        const cmp = this;
        const cmpName = this.constructor.name;

        if (cmpName in Components.processedAnnotations) {

            const annotations = Object.entries(Components.processedAnnotations[cmpName]);
            for (const [propertyName, annotation] of annotations) {
                if (annotation?.propParsing) {
                    if (annotation?.inject) {
                        let service = StillAppSetup.get()?.services?.get(annotation?.type);
                        cmp.#handleServiceInjection(cmp, propertyName, annotation?.type, service);
                    }
                    cmp.#annotations.set(propertyName, annotation);
                }
            }

        } else {

            const classDefinition = this.constructor.toString();
            const re = Components.parseAnnottationRE();

            classDefinition.replace(new RegExp(re, 'g'), async (mt) => {

                /** If statement is in place to not parse skip method 
                 * parsing when it finds a comment annotation */
                if (!mt.includes('(')) {
                    const commentEndPos = mt.indexOf('*/') + 2;
                    const propertyName = mt.slice(commentEndPos).replace('\n', '').trim();

                    let inject, proxy, prop, propParsing, type, svcPath;
                    if (propertyName != '') {

                        const result = Components.processAnnotation(mt, propertyName);
                        inject = result.inject;
                        prop = result.prop;
                        proxy = result.proxy;
                        type = result.type;
                        propParsing = result.propParsing;
                        svcPath = result.svcPath.replace(/\t/g, '').replace(/\n/g, '').replace(/\s/g, '').trim();

                        svcPath = svcPath?.endsWith('/') ? svcPath.slice(0, -1) : svcPath;

                        if (inject) {
                            let service = StillAppSetup.get()?.services?.get(type);
                            cmp.#handleServiceInjection(cmp, propertyName, type, service, svcPath);
                        }
                    }
                    cmp.#annotations.set(propertyName, { type, inject, proxy, prop, propParsing, svcPath });

                }
            });

        }

        this.wasAnnotParsed = true;

    }

    #handleServiceInjection(cmp, propertyName, type, service, svcPath) {

        /** This is because first time service is instantiated it is assigned assynchronously
         * By the time the assignment is taking place it might happen that the template parsing
         * did initiate and it can again go over property parsin */
        if (cmp[propertyName]?.assigned) return;

        const tempObj = {

            on: async (_, action) => {

                const svcInstance = StillAppSetup.get().services.get(type);
                if (
                    (cmp[propertyName]?.ready
                        && cmp[propertyName]?.status == $stillconst.A_STATUS.DONE)
                    || svcInstance
                ) {
                    await action(svcInstance);
                    return;
                }

                if (!('subscribers' in tempObj)) {
                    Object.assign(tempObj, { subscribers: [], status: $stillconst.A_STATUS.PENDING })
                }
                tempObj.subscribers.push(action);
            },

            load: async () => {

                if (!('status' in tempObj)) {
                    Object.assign(tempObj, { status: $stillconst.A_STATUS.DONE, subscribers: [] });
                    return;
                }

                tempObj.status = $stillconst.A_STATUS.PENDING;
                tempObj.subscribers?.forEach(async (action) => {
                    const svcInstance = StillAppSetup.get().services.get(type);
                    await action(svcInstance);
                    tempObj.subscribers?.shift();
                });
            },
            assigned: true

        }

        cmp[propertyName] = tempObj;
        if (service) return handleServiceAssignement(service);

        const servicePath = this.#getServicePath(type, svcPath);
        if (!StillAppSetup.get()?.services?.get(type)) {

            import(servicePath)
                .then(async cls => {

                    /** @type { BaseService } */
                    const service = new cls[type](this);
                    service.parseServiceEvents();
                    StillAppSetup.get()?.services?.set(type, service);
                    handleServiceAssignement(service);
                    Components.emitAction(type);

                })
                .catch(err => { })

        } else {
            Components.subscribeAction(
                type,
                () => {
                    const service = this.#getServicePath(type, svcPath);
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

    #getServicePath(type, svcPath) {
        let path = svcPath == '' ? StillAppSetup.get().servicePath : '';
        if (path?.startsWith('/')) path = path.slice(1);
        if (path?.endsWith('/')) path = path.slice(0, -1);
        path = getBasePath('service', svcPath) + '' + path;
        return path + '/' + type + '.js';
    }

}
