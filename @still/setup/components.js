import { StillAppSetup } from "../../config/app-setup.js";
import { stillRoutesMap as DefaultstillRoutesMap } from "../../config/route.map.js";
import { $still, ComponentNotFoundException, ComponentRegistror } from "../component/manager/registror.js";
import { BaseComponent } from "../component/super/BaseComponent.js";
import { BehaviorComponent } from "../component/super/BehaviorComponent.js";
import { ViewComponent as DefaultViewComponent } from "../component/super/ViewComponent.js";
import { TemplateBinding, TemplateReactiveResponde } from "../helper/template.js";
import { Router as DefaultRouter } from "../routing/router.js";
import { UUIDUtil } from "../util/UUIDUtil.js";
import { checkPropBind, WorkerHelper } from "../util/componentUtil.js";
import { getRouter, getRoutesFile, getViewComponent } from "../util/route.js";
import { $stillconst, authErrorMessage, ST_RE, WORKER_EVT } from "./constants.js";
import { StillError } from "./error.js";

const stillRoutesMap = await getRoutesFile(DefaultstillRoutesMap);
const Router = getRouter(DefaultRouter);
const ViewComponent = getViewComponent(DefaultViewComponent);

const $stillLoadScript = (path, className, base = null) => {

    const prevScript = document.getElementById(`${path}/${className}.js`);
    if (prevScript) return false;

    const script = document.createElement('script');
    script.src = `${base ? base : ''}${path}/${className}.js`;
    script.id = `${path}/${className}.js`;
    return script;
}

const ProduceComponentType = {
    parentCmp: '',
    registerCls: false,
    urlRequest: false,
    lone: false,
    loneCntrId: null
};

class ProducedCmpResultType {
    /** @type { DefaultViewComponent } */ newInstance;
    /** @type { string } */ template;
    /** @type { class | any } */ _class;
}

/** @template T */
export class SpotValue{
    /**@param { T } type */ 
    constructor(type, props = {}){ this.type = type, this.props = props  }
}

export class Components {

    /**  @returns {{template, }} */
    init() { }
    static inject(cls) { return cls; }
    template;
    entryComponentPath;
    entryComponentName;
    /** @type { ViewComponent } */
    component;
    componentName;
    static instance = null;
    notAssignedValue = [undefined, null, ''];
    stillCmpConst = $stillconst.STILL_COMPONENT;
    stillAppConst = $stillconst.APP_PLACEHOLDER;
    static componentPartsMap = {};
    static annotations = {};
    servicePath;
    services = new Map();
    static subscriptions = {};
    static stAppInitStatus = true;
    static baseUrl = Router.baseUrl;
    static vendorPath = `${Components.obj().parseBaseUrl(Router.baseUrl)}@still/vendors`;
    static parsingTracking = {};
    static prevLoadingTracking = new Set();
    static prevLoadLoopContainer = new Set();

    /** @type { Array<String> } */
    #cmpPermWhiteList = [];

    void() { }

    getTopLevelCmpId() {
        const { TOP_LEVEL_CMP, ANY_COMPONT_LOADED } = $stillconst;
        return `${TOP_LEVEL_CMP}`;
    }

    renderOnViewFor(placeHolder, cmp = null) {

        const isLoneCmp = Router.clickEvetCntrId;
        if (this.template instanceof Array) this.template = this.template.join('');

        let cntr = document.getElementById(placeHolder);
        if (isLoneCmp && isLoneCmp != 'null') cntr = document.getElementById(isLoneCmp);
        else {
            if (document.getElementById($stillconst.APP_PLACEHOLDER))
                cntr = document.getElementById($stillconst.APP_PLACEHOLDER);
        }

        cntr.innerHTML = this.template;

        if (isLoneCmp && cmp) setTimeout(() => {
            Components.emitAction(cmp.getName());
        }, 200);

        Components.handleMarkedToRemoveParts();
    }

    /** @returns { ProducedCmpResultType } */
    static async produceComponent(params = ProduceComponentType) {
        if (!params.cmp) return;
        const { cmp, parentCmp, registerCls, urlRequest: url } = params;

        let clsName = cmp, isVendorCmp = (cmp || []).at(0) == '@', cmpPath,
            template, folderPah, exception, baseUrl;

        /** the bellow line clears previous component from memory
         * @type { ViewComponent } */
        let newInstance;

        if (isVendorCmp) {
            const clsPath = cmp.split('/');
            clsName = clsPath.at(-1);
            clsPath.pop();
            const parsedUrl = Components.obj().parseBaseUrl(Components.baseUrl);
            folderPah = `${parsedUrl}@still/vendors/${clsPath.join('/').slice(1)}`;
            cmpPath = `${folderPah}/${clsName}`;
        } else {
            let cmpRoute = Router.routeMap[clsName]?.path;
            if (!cmpRoute) {
                StillError.handleStComponentNotFound('TypeError', parentCmp, clsName);
                return;
            }

            if (cmpRoute.at(-1) == '/') cmpRoute = cmpRoute.slice(0, -1);
            baseUrl = Router.getCleanUrl(url, clsName);
            folderPah = `${baseUrl}${cmpRoute}`;
            cmpPath = `${folderPah}/${clsName}`;
        }

        try {

            const cmpCls = await import(`${cmpPath}.js`);
            const parent = parentCmp ? { parent: parentCmp } : '';

            newInstance = new cmpCls[clsName](parent);
            Components.prevLoadingTracking.add(clsName);
            newInstance.lone = !!params.loneCntrId || params.lone;
            newInstance.loneCntrId = params.loneCntrId || Router.clickEvetCntrId;
            newInstance.$parent = parentCmp;

            if (!newInstance.template) {
                let tmplFileUrl = cmpPath + '.html';
                const { templateUrl } = newInstance;
                if (templateUrl) tmplFileUrl = `${folderPah}/${templateUrl}`;

                const result = await fetch(tmplFileUrl);
                if (result.status == 404) {
                    StillError.handleInvalidTmplUrl('TypeError', newInstance, templateUrl);
                    exception = true;
                    return newInstance;

                } else template = await result.text();

                if (template) newInstance.template = template;
            }

            const tmplt = cmpCls[clsName].toString();
            WorkerHelper.parseDelaySetup(tmplt, newInstance, false, clsName);

            return {
                newInstance, template: newInstance.template,
                _class: !registerCls && !url ? null : cmpCls[clsName]
            };

        } catch (error) {
            if (!exception)
                StillError.handleStComponentNotFound(error, parentCmp, clsName);
            return false;
        }

    }

    static parseTemlpateCssToScope(template) {

        const cssRE = /<style>[\s\S]*?<\/style>/gi;
        let styles = '';
        const scope = `scope_${UUIDUtil.newId()}`;

        template = template.toString().replace(cssRE, (mt) => {

            styles = styles + '\n' + mt
                .replace('<style>', '<style> @scope(.' + scope + ') {\n')
                .replace('</style>', '} </style>');

            return '';
        }, 'gi');

        const styleRE = /[a-z0-9 \. \$\#\&\*\-\_\~\>\<\:\;\,\.\|\=\'\%\@\!\(\)\[\]\{\} ]*?{/ig
        styles = styles.toString().replace(styleRE, (mtch) => mtch.trim());

        return `<output class="${scope}" style="display: contents;">${template}<output>\n${styles}`;

    }

    static async processInitProperties() {
        if(Object.keys(StillAppSetup.config.props).length){
            //Disable the logs
            const { default: df, error, warning, time } = StillAppSetup.config.props.logs;
            if (error === false) window.console.error = () => '';
            if (warning === false) window.console.warn = () => '';
            if (df === false) {
                window.console.log = () => '';
            }
            if (time !== true) {
                window.console.time = () => '';
                window.console.timeEnd = () => '';
            }
        }
    }

    async loadComponent() {
        (async () => {
            StillAppSetup.config.props = await Components.#loadConfig(StillAppSetup.configFile);
            Object.freeze(StillAppSetup.config.props);
            $still.context.currentView = await StillAppSetup.instance.init();
            await Components.processInitProperties();
            
            /**  @type { ViewComponent } */
            const currentView = $still.context.currentView;

            if (currentView.template.indexOf(this.stillCmpConst) >= 0) {

                $still.context.currentView = await (
                    await Components.produceComponent({ cmp: this.entryComponentName })
                ).newInstance;

                if (
                    (!AppTemplate.get().isAuthN()
                        && !$still.context.currentView.isPublic)
                    || !Components.obj().isInWhiteList($still.context.currentView)
                )
                    return document.write(authErrorMessage());

                setTimeout(() => $still.context.currentView.parseOnChange(), 500);
                StillAppSetup.register($still.context.currentView.constructor);
                this.template = this.getHomeCmpTemplate($still.context.currentView);

                ComponentRegistror.add($still.context.currentView.cmpInternalId, $still.context.currentView);

                const { TOP_LEVEL_CMP, ST_HOME_CMP } = $stillconst;
                this.template = currentView.template.replace(
                    this.stillCmpConst,
                    `<div id="${this.stillAppConst}" class="${TOP_LEVEL_CMP} ${ST_HOME_CMP}">
                        ${this.template}
                    </div>`
                );

                this.template = (new BaseComponent).parseStSideComponent(
                    this.template, 'fixed-part', $stillconst.TOP_LEVEL_CMP
                );

                /** Very edge case */
                const isHome = (new StillAppSetup).entryComponentName == this.entryComponentName;
                if (isHome) {
                    this.template = (new BaseComponent).parseStSideComponent(
                        this.template, $still.context.currentView.cmpInternalId, $still.context.currentView.cmpInternalId
                    );
                }
                if (!$still.context.currentView.lone && !Router.clickEvetCntrId) {
                    $still.context.currentView.onRender();
                    this.renderOnViewFor('stillUiPlaceholder', $still.context.currentView);
                }
                setTimeout(() => Components.handleInPlacePartsInit($still.context.currentView, 'fixed-part'));
                setTimeout(async () => {
                    Components.runAfterInit($still.context.currentView);
                    if (!Router.clickEvetCntrId) AppTemplate.injectToastContent();
                });
                StillAppSetup.get()['entryComponentId'] = $still.context.currentView.cmpInternalId;
                return;
            }
            if (document.getElementById(this.stillAppConst))
                this.renderOnViewFor(this.stillAppConst, $still.context.currentView);
            else new Components().renderPublicComponent($still.context.currentView);
            Components.runAfterInit($still.context.currentView)
        })();
    }


    isAppLoaded = () => document.getElementById(this.stillAppConst);

    /** @param { ViewComponent } cmp */
    renderPublicComponent(cmp) {

        if (cmp.isPublic || Components.obj().isInWhiteList(cmp)) {
            Components.registerPublicCmp(cmp);

            setTimeout(async () => await cmp.onRender());
            this.template = `
            <output class="${$stillconst.ANY_COMPONT_LOADED}" style="display:contents;">
                ${cmp.getBoundTemplate()}
            </output>
            `;
            setTimeout(() => cmp.parseOnChange(), 500);
            setTimeout(() => {
                cmp.setAndGetsParsed = true;
                (new Components).parseGetsAndSets(cmp)
            }, 10);

            this.renderOnViewFor('stillUiPlaceholder', cmp);
            ComponentRegistror.add(cmp.cmpInternalId, cmp);
            const cmpParts = Components.componentPartsMap[cmp.cmpInternalId];
            setTimeout(() => Components.handleInPartsImpl(cmp, cmp.cmpInternalId, cmpParts));
            setTimeout(() => Components.runAfterInit(cmp), 120);
            Components.handleMarkedToRemoveParts();
            Components.removeOldParts();
        } else document.body.innerHTML = (authErrorMessage());
    }

    static registerPublicCmp = (cmp) =>
        window['Public_' + cmp.constructor.name] = cmp;


    /**  @param {ViewComponent} cmp */
    getHomeCmpTemplate(cmp) {

        cmp.setUUID(cmp.getUUID());
        cmp = (new Components()).getParsedComponent(cmp);
        const loadCmpClass = $stillconst.ANY_COMPONT_LOADED;
        const template = cmp.getBoundTemplate();
        Components.registerPublicCmp(cmp);

        const { TOP_LEVEL_CMP, ST_HOME_CMP1 } = $stillconst

        return `<st-wrap 
                    id="${TOP_LEVEL_CMP}"
                    class="${loadCmpClass} ${TOP_LEVEL_CMP} ${ST_HOME_CMP1}">
                    ${template}
                </st-wrap>`;
    }

    setComponentAndName(cmp, cmpName) {
        this.component = cmp;
        this.componentName = cmpName;
        return this;
    }

    /** @param {ViewComponent} cmp */
    defineSetter = (cmp, f) => {
        if (cmp.myAnnotations()?.get(f)?.inject) return;
        cmp.__defineGetter__(f, () => {
            const optLst = cmp['stOptListFieldMap']?.get(f);
            const r = {
                value: cmp['$still_' + f], defined: true,
                onChange: (cb = () => { }) =>  cmp[`$still${f}Subscribers`].push(cb),
                onComplete: (cb = () => { }) => cmp[`$${f}CmpltCbs`].push(cb),
                firstPropag: false, onlyPropSignature: true,
                set: (val) => { cmp[f] = val, cmp[`$_stset${f}`] = true; },
                update: (val) => { cmp[`$_stupt${f}`] = true; cmp[f] = val; },
                delete: (val) => { Components.deleteDomNode(val, cmp, f); },
            };
            if(optLst?.chkBox) r.isChkbox = true;
            if(optLst?.radio) r.isRadio = true;
            if(optLst?.multpl) {
                if (r.value == '') r.value = []; 
                r.multpl = true;
            }

            const validator = BehaviorComponent.currentFormsValidators;
            if (validator[cmp.cmpInternalId]) {
                if (f in (validator[cmp?.constructor?.name] || [])) 
                    r['isValid'] = validator[cmp.constructor.name][f]['isValid'];
            }
            return r;
        });
    }

    static deleteDomNode(removingList, cmp, field){
        
        if(typeof removingList[0] === 'number' || typeof removingList[0] === 'string'){
            removingList.forEach(itmId => {
                const node = document.getElementById(cmp.cmpInternalId+itmId);
                node.parentElement.removeChild(node);
            });
        }else{
            //typeof removingList[0] === 'object' && !Array.isArray(removingList[0])
            const cntrId = `listenChangeOn-${cmp.cmpInternalId}-${field}`;
            const mainCnter = document.getElementsByClassName(cntrId)[0];
            let removingId;
            removingList.forEach(itm => {
                let container = mainCnter.getElementsByClassName(`child-${mainCnter.getAttribute('jstid')}-${itm.id}`)[0];
                if(itm?.childs){
                    itm?.childs.forEach(subItm => {
                        const childIdCmplt = container.getAttribute('stinternalid');
                        let subSubItm = container.getElementsByClassName(`child-${childIdCmplt}-${subItm.id}`)[0];                                      
                        removingId = subSubItm.getAttribute('stinternalid');                    
                        if(subSubItm.parentElement.tagName === 'ST-WRAP') subSubItm = document.getElementById(subItm.id);
                        subSubItm.parentElement.removeChild(subSubItm);
                    });
                }else{
                    removingId = container.getAttribute('stinternalid');
                    if(container.parentElement.tagName === 'ST-WRAP') container = document.getElementById(itm.id);
                    container.parentElement.removeChild(container);
                }
                $still.c.ref(removingId).unload();
            });
        }
    }

    parseOnChange = () => this;

    /** @param {ViewComponent} instance */
    parseGetsAndSets(instance = null, allowfProp = false, field = null, prntField = null) {
        const cmp = instance || this.component, o = this;
        cmp.setAndGetsParsed = true;
        const annot = cmp.runParseAnnot();

        if (field) return parseField(field, cmp);

        cmp.getProperties(allowfProp).forEach(field => parseField(field, cmp));

        function parseField(field, cmp) {
            const inspectField = cmp[field];            
            if(cmp[`$_stupt${prntField}`] === true) cmp[`$_stupt${field}`] = true;

            if(true === inspectField?.injectable || true === inspectField?.stSTI) return;
            if (inspectField?.onlyPropSignature || inspectField?.name == 'Prop'
                || cmp.myAnnotations()?.get(field)?.prop || annot?.get(field)?.prop
            ) {

                if (inspectField?.sTForm) {
                    cmp[field].validate = function () {
                        const formRef = field;
                        return BehaviorComponent.validateForm(`${cmp.cmpInternalId}-${formRef}`, cmp, cmp[field]);
                    }
                    cmp[field].reset = () => {
                        const formRef = field;
                        BehaviorComponent.validateForm(`${cmp.cmpInternalId}-${formRef}`, cmp, cmp[field], true);
                        document.getElementById(`fId_${cmp.cmpInternalId}`).reset();
                    }
                    return;
                }

                let listenerFlag = inspectField?.listenerFlag, inVal = inspectField?.inVal;
                cmp[field] = cmp[field]?.value || cmp[field];
                if (typeof inspectField == 'boolean') {
                    listenerFlag = `_stFlag${field}_${cmp.constructor.name}_change`;
                    cmp[field] = { inVal: inspectField }, inVal = inspectField;
                }

                if (listenerFlag) {
                    if (!('st_flag_ini_val' in cmp)) cmp['st_flag_ini_val'] = {};
                    cmp.st_flag_ini_val[field] = inVal;
                    const getValue = annot?.size ? inVal : inspectField.inVal;
                    cmp.__defineGetter__(field, () => getValue);

                    cmp.__defineSetter__(field, (val) => {
                        // This is to address the initial assignment for child component having (showIf) since ths instantiation is automatically by handleInPartsImpl
                        if (typeof val === 'object') {
                            if ('v' in val) {
                                val = val.v; delete cmp.st_flag_ini_val[field];
                            }
                        }
                        /** This is addressing the edge case where the (renderIf) is parsed after this setter is defined */
                        if (field in cmp.st_flag_ini_val && !(val?.parsed)) {
                            if(typeof val === 'boolean' || ['false','true'].includes(val))
                                val = !cmp.st_flag_ini_val[field]; 
                            delete cmp.st_flag_ini_val[field];
                        }
                        /** This is for handling (renderIf) */
                        const elmList = document.getElementsByClassName(listenerFlag);
                        for (const elm of elmList) {
                            let remHide = false;
                            if(!(val === 'true' || val === true || val === 'false' || val === false)){
                                if(elm.classList.contains(`${$stillconst.FLAG}${val?.toString()?.replace(/\s/,'-')}`)){
                                        remHide = true;
                                        elm.style.display = '';
                                }else 
                                    elm.style.display = 'none';
                            }
                            else if(elm.classList.contains($stillconst.NEGATE_FLAG)){
                                if(val === 'true' || val === true) elm.style.display = 'none';
                                else{
                                    remHide = true;
                                    elm.style.display = '';
                                }
                            }
                            else if(val === 'true' || val === true) elm.style.display = '';
                            else if(elm.style.display === '') elm.style.display = 'none';

                            if (val === true || remHide) elm.classList.remove($stillconst.PART_HIDE_CSS);
                            else elm.classList.add($stillconst.PART_HIDE_CSS);
                        }
                        cmp.__defineGetter__(field, () => val);
                    });
                }
            } else {

                let value = cmp[field];
                if (!cmp[field] && cmp[field] != 0) value = '';

                Object.assign(cmp, { ['$still_' + field]: value });
                Object.assign(cmp, { [`$still${field}Subscribers`]: [], [`$${field}CmpltCbs`]: [] });
                o.defineSetter(cmp, field);

                cmp.__defineSetter__(field, (newValue) => {
                    if(cmp['stOptListFieldMap']?.get(field)?.multpl)
                        cmp['$still_' + field] = newValue;
                    cmp.__defineGetter__(field, () => newValue);

                    //Address multi selection combobox: TOUCHING HERE
                    cmp['$still_' + field] = newValue;

                    o.defineSetter(cmp, field);
                    setTimeout(async () => await cmp.stOnUpdate());

                    if (cmp[`$still${field}Subscribers`].length > 0) {
                        setTimeout(() => cmp[`$still${field}Subscribers`].forEach(
                            subscriber => subscriber(cmp['$still_' + field])
                        ));
                    }

                    if (cmp.$stillClassLvlSubscribers.length > 0)
                        setTimeout(() => cmp.notifySubscribers(cmp.getStateValues()));

                    if (cmp[field]?.defined || cmp.dynLoopObject) {
                        Components.firstPropagation[`${cmp.cmpInternalId}-${field}`] = true;
                        o.propageteChanges(cmp, field, { A: !cmp['st'+field+'cbRem'], C: cmp['st'+field+'cbClk'] });
                    }
                    delete cmp['st'+field+'cbRem'];
                    delete cmp['st'+field+'cbClk'];

                });
                const firstPropagateTimer = setInterval(() => {
                    //Work in the garbage collector for this Components.firstPropagation flag
                    if(Components?.firstPropagation[`${cmp.cmpInternalId}-${field}`]) {
                        clearInterval(firstPropagateTimer);
                        //o.propageteChanges(cmp, field);
                    }
                    else if ('value' in cmp[field] && !Components?.firstPropagation[`${cmp.cmpInternalId}-${field}`]) {
                        clearInterval(firstPropagateTimer);
                        if (!o.notAssignedValue.includes(cmp['$still_' + field])) o.propageteChanges(cmp, field);
                        cmp[field].firstPropag = true;
                    }
                }, 200);
            }
        }

        return this;
    }

    static firstPropagation = {};

    static handleAtForNewNode(variableName, itm, tagName, f, cmp){
        window[`${variableName}_${f}`] = [itm], window[`${variableName}`] = '';
        
        eval(`${cmp['loopTmplt'][variableName]}`);
        const result = eval(`${variableName}`);
        const re = new RegExp(`<for-loop[\\s\\S]*?>([\\s\\S]*?)</for-loop>`,'i');                    
        const match = result.match(re);                  
        return match[1];
    }

    /** @param { ViewComponent } cmp */
    propageteChanges(cmp, field, chkBoxOpts = {}) {
        
        if(field?.startsWith('$_stup') || field?.endsWith('CmpltCbs')) return;
        const cpName = cmp.cmpInternalId.replace('/', '').replace('@', ''), f = field;
        const cssRef = `.listenChangeOn-${cpName}-${f}`;
        const subscribers = document.querySelectorAll(cssRef);
        
        if (subscribers && !cmp['stOptListFieldMap']?.has(f)){
            subscribers.forEach(/**@type {HTMLElement}*/elm => 
                this.dispatchPropagation(elm, f, cmp)
            );
        }
        
        const cssRefCombo = `.listenChangeOn-${cpName}-${f}-combobox`;
        const subscribersCombo = document.querySelectorAll(cssRefCombo);
        const stateChange = `.state-change-${cpName}-${f}`;
        const stateChangeSubsribers = document.querySelectorAll(stateChange);
        const { isChkbox, isRadio, multpl, value } = cmp[f];       

        // @if -> Top level statement variables on the condition change
        TemplateReactiveResponde.detectAtIfTopLevelConditionChange(cmp, f);
        // @for -> Gets called when data source (state variable) value got changed
        TemplateReactiveResponde.reloadeContainerOnDataSourceChange(cmp, f);
        // @for -> this is for Node update when it was generated using template logic
        TemplateReactiveResponde.updateDomTreeOnAtForDataSourceChange(cmp, f, value, cpName);

        if(isChkbox || (multpl && !cmp['stClk' + f])){
            // chkBoxOpts.A = add, chkBoxOpts.C = click
            if((chkBoxOpts.A && !chkBoxOpts.C) || multpl){
                const action = multpl ? 'selected' : 'checked';
                let waitSec = multpl ? new Number($still.multplWaitSec) : 0; //Adding  a delay to allow th combobox to render
                value.forEach(v => {
                    setTimeout(() => {
                        const opt = document.querySelector(`.${cpName}-${f}-val-${v}`.replace(/\s/g,'-'));
                        if(opt) {
                            opt[action] = true;
                            const empty = document.querySelector(`.${cpName}-${f}empty`);
                            if(empty) empty.selected = false;
                        }
                    },waitSec);
                });
                if($still.multplWaitSec > 0) $still.multplWaitSec = 0;
            }
        }

        if(isRadio){
            if(chkBoxOpts.A && !chkBoxOpts.C){
                const opt = document.querySelector(`.${cpName}-${f}-val-${value}`);
                if(opt) opt.checked = true; //cmp['$still_' + f] = value;
            }
        }

        if (stateChangeSubsribers) 
            stateChangeSubsribers.forEach(s => s.innerHTML = cmp['$still_' + f]);

        if (subscribersCombo) {
            subscribersCombo.forEach(/**@type {HTMLElement}*/elm => {
                setTimeout(() => this.propageteToInput(elm, f, cmp));
            });
        }
    }

    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    dispatchPropagation(elm, field, cmp) {

        if (elm.tagName == 'SELECT')
            return this.propageteToSelect(elm, field, cmp);

        if (elm.tagName == 'INPUT')
            return this.propageteToInput(elm, field, cmp);

        return this.propagetToHTMLContainer(elm, field, cmp);

    }

    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    propageteToInput(elm, field, cmp) {
        elm.value = cmp['$still_' + field];
    }

    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    propageteToSelect(elm, field, cmp) {
        (async () => {
            const container = document.createElement('optgroup');
            const old = elm?.getElementsByTagName('optgroup')[0];
            await this.parseAndAssigneValue(elm, field, cmp, container);
            if (old) elm.removeChild(old);
            elm.insertAdjacentElement('beforeend', container);

        })();
    }

    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    propagetToHTMLContainer(elm, field, cmp) {

        (async () => {
            let hasParent = elm.classList.contains('parent_class'), prntId, prntPrevLoad;
            if(!hasParent){
                if(!elm.hasAttribute($stillconst.LOOP_PREV_LOAD))
                    elm.setAttribute($stillconst.LOOP_PREV_LOAD, true);
            }else{
                prntId = elm.getAttribute('st-parent-cmp');
                prntPrevLoad = Components.prevLoadLoopContainer.has(prntId+''+cmp.constructor.name);
            }
            
            if(elm.getAttribute('stchildcmp') === 'true'){
                if(elm.getAttribute('firstLoad')) elm.setAttribute('firstLoad', false); 
            }
            
            let container = document.createElement(elm.tagName);
            let prevClass = elm.getAttribute('newCls');
            prevClass = elm.getAttribute('class').replace(prevClass, '');
            container.className = `${prevClass}`;

            container = await this.parseAndAssigneValue(elm, field, cmp, container, prntPrevLoad);
            if (elm.tagName == 'TBODY')
                elm.parentNode.insertAdjacentElement('beforeend', container.container);

            else {
                if(container?.fullRerender){
                    const loopCntr = elm.querySelector(`.loop-container-${cmp.cmpInternalId}`);
                    if (loopCntr) elm.removeChild(loopCntr);
                    const finalCtnr = document.createElement('output');
                    finalCtnr.innerHTML = container.container.innerHTML;
                    finalCtnr.className = `loop-container-${cmp.cmpInternalId}`;
                    finalCtnr.style.display = 'contents';
                    elm.insertAdjacentElement('beforeend', finalCtnr);
                }
            }
        })();

    }

    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    async parseAndAssigneValue(elm, field, cmp, container, wasPrntLoad = false) {

        const hash = elm.getAttribute('hash'), cmpId = cmp.cmpInternalId;
        container.classList.add($stillconst.SUBSCRIBE_LOADED);

        let tmpltContent, childCmp, f = elm.dataset.field;
        if (elm.tagName == 'SELECT') {
            const childs = elm.querySelectorAll('option');

            const placeholder = elm.getAttribute('placeholder') || 'Select an option';
            if (childs[0].outerHTML.toString().indexOf('{item.') > 0){
                tmpltContent = childs[0].outerHTML.toString();
                const valField = tmpltContent.split('value')[1].split('"')[1];
                const cls = `${cmpId}-${f}-val-${valField}st`;
                tmpltContent = tmpltContent.replace('<option','<option class="'+cls+'"');
            }

            let result = `<option value='' class="${cmpId}-${f}empty" selected>${placeholder}</option>`;
            container.innerHTML = (await this.parseForEachTemplate(tmpltContent, cmp, field, result)).result;
            return container;

        } else {

            if(elm.firstElementChild === null) return;
            tmpltContent = elm.firstElementChild.outerHTML.toString();
            const stDSource = elm.firstElementChild.getAttribute('loopDSource');

            childCmp = {
                stElement: elm.firstElementChild.getAttribute('componentRef'),
                props: JSON.parse(elm.firstElementChild.getAttribute('props')),
                stDSource: ![false, 'false'].includes(stDSource)
            }
        }

        /** Get the previous table body */
        const oldContainer = elm.parentNode.querySelector(`.${hash}`);
        /** Check if it exists previous table body and remove it */
        if (oldContainer){
            try {
                elm?.parentNode?.removeChild(oldContainer);
            } catch (error) {}   
        }
        container.classList.add(hash);
        const result = await this.parseForEachTemplate(tmpltContent, cmp, field, '', childCmp);
        if(result.fullRerender) container.innerHTML = result.result;
        return { container, fullRerender: result.fullRerender};

    }

    static loadedTemplates = new Set();

    async parseForEachTemplate(tmpltContent, cmp, field, result, childCmp = null, wasPrntLoad = false) {

        let template = tmpltContent.replace('display:none;', ''), childTmpl, childResult = '', tmpltChk = Components.loadedTemplates;
        let totalLoopItm = cmp['$still_' + field].length, loopCount = 0, childLvl = 1, fullRerender = false;
        if(template.indexOf('</st-lstgp>')) template = template.replace('display:none;', '');

        if (cmp['$still_' + field] instanceof Array) {

            if (childCmp?.stElement) {

                const childInstance = await (await Components.produceComponent({
                    cmp: childCmp.stElement, parentCmp: cmp, registerCls: true
                }));

                childTmpl = childInstance.template;
                let fields = Object.entries(childCmp.props), noFieldsMap;
                if (fields.length == 0) noFieldsMap = true;

                let prntId = cmp.cmpInternalId;
                if(cmp.$parent) {
                    prntId = cmp.$parent.cmpInternalId, childLvl = 2;
                };
                const loadKey = (childLvl == 2 ? cmp.cmpInternalId+prntId : prntId)+childCmp.stElement;
                wasPrntLoad = Components.prevLoadLoopContainer.has(loadKey);

                for (const rec of cmp['$still_' + field]) {
                    /** @type { ViewComponent } */
                    const inCmp = new childInstance._class();
                    inCmp.cmpInternalId = 'dynamic-' + inCmp.getUUID();
                    
                    inCmp.template = (tmpltChk.has(childCmp.stElement) ? childTmpl.replace(/<style>[\s\S]{0,}<\/style>/gi,'') : childTmpl);
                    tmpltChk.add(childCmp.stElement);
                    inCmp.dynLoopObject = true;
                    inCmp.stillElement = true;
                    inCmp.parentVersionId = cmp.versionId;
                    inCmp.$parent = cmp;
                    if(cmp[`$_stupt${field}`] === true) inCmp[`$_stupt${field}`] = true;

                    if (noFieldsMap && childCmp.stDSource)
                        fields = Object.entries(cmp['$still_' + field][0]);

                    await inCmp.onRender();
                    const result = this.replaceBoundFieldStElement(inCmp, fields, rec, noFieldsMap, cmp, field);
                    
                    if((loopCount + 1) === totalLoopItm && !wasPrntLoad)
                        Components.prevLoadLoopContainer.add(loadKey);                    

                    if(result.obj != null){
                        let content = result.obj?.getBoundTemplate();
                        
                        if(result.dynId) content = content.replace('<st-wrap','<st-wrap id="'+rec['id']+'"');
                        childResult += content;
                        fullRerender = true;
                    }

                    setTimeout(() => inCmp.parseOnChange(), 500);
                    ComponentRegistror.add(inCmp.cmpInternalId, inCmp);
                    setTimeout(async () => {
                        const instance = result.instance || inCmp;
                        if(cmp[`$_stupt${field}`] === true) instance[`$_stupt${field}`] = true;
                        
                        //if(result.obj === null && result.nodeChanged)                        
                        //    result.existingNode.parentElement.innerHTML = result.content;
                        
                        (new Components)
                            .parseGetsAndSets(ComponentRegistror.component(instance.cmpInternalId),false, null, field);

                        let updateStat = {};
                        if(cmp[`$_stupt${field}`] === true){
                            if(result.nodeChanged !== false || result.appending){
                                if(result.nodeChanged) updateStat = { nodeUpdate: true };
                                Components.runAfterInit(instance, updateStat);
                            }
                        }else{

                            if(result?.appending){
                                Components.runAfterInit(instance, updateStat);
                            }else{
                                if('nodeChanged' in result)
                                    if(!result.nodeChanged) return;
    
                                if(result.nodeChanged) updateStat = { nodeUpdate: true };
                                Components.runAfterInit(instance, updateStat);
                            }
                        }
                        
                    }, 10);
                    loopCount++;
                };
                // Run all the subscribe methods to onComplete for a specific variable
                setTimeout(() => cmp[`$${field}CmpltCbs`].forEach(async cb => {
                    const fn = cmp[`$${field}CmpltCbs`].shift(); await fn();
                }), 250);
            } else {
                fullRerender = true;
                cmp['$still_' + field].forEach((rec) => {
                    result += this.replaceBoundField(template, Object.entries(rec), cmp.cmpInternalId);
                });
            }
        }

        return { result: childCmp?.stElement ? childResult : result, fullRerender };
    }

    replaceBoundField(parsingTemplate, fields, parentId) {
        let nodeId = null, nodeExists = false;
        for (const [f, v] of fields) {
            if(f == 'id') nodeId = v;
            parsingTemplate = parsingTemplate.replaceAll(`{item.${f}}`, (m, pos, tmpl) => {
                const isCls = tmpl.slice(pos + m.length).startsWith('st');
                return isCls ? new String(v)?.replace(/\s/g,'-')+' ' : v;
            });
        }

        const isCombo = parsingTemplate.trim().startsWith('<option');
        const isRadioOrCheck = parsingTemplate.trim().startsWith('<input');
        
        if(nodeId && !(isCombo && isRadioOrCheck)){
            nodeExists = document.getElementById(`${parentId}-child-${nodeId}`)?.nodeValue;
            parsingTemplate = parsingTemplate.replace(/\>/,` id="${parentId}-child-${nodeId}">`);
            if(nodeExists){
                const newNode = new DOMParser().parseFromString(parsingTemplate,'text/html');
                document.getElementsByClassName(`loop-container-${parentId}`)[0].replaceChild(nodeExists,newNode);
            }
        }
        return parsingTemplate.replaceAll('($event', '(event');
    }

    /** 
     * @param { ViewComponent } obj
     * @returns { ViewComponent | Object }
     * */
    replaceBoundFieldStElement(obj, fields, rec, noFieldsMap, cmp, field) {
        // Abbreviating the Loop word as Lp
        if(obj['#stLpChild']) obj['#stLpUpdate'] = true;
        obj['#stLpChild'] = true, obj['#stLpStat'] = {}, obj['#stLpId'] = rec['id'];
        obj['#stLpIdDesc'] = obj.$parent.cmpInternalId+'-stStat-'+obj.constructor.name+rec['id'];
        
        if (noFieldsMap) {
            for (const [f, v] of Object.entries(rec)) {
                if(checkPropBind(obj, f)) obj['#stLpStat'][f] = v;
                if (f in obj) {
                    if (typeof v == 'string') obj[f] = v?.replace('item.', '')?.trim();
                    else obj[f] = v;
                }
            }
            
        } else {
            for (const [f, v] of fields) {
                if(checkPropBind(obj, f)) obj['#stLpStat'][f] = v;
                if (typeof v == 'string') obj[f] = rec[v?.replace('item.', '')?.trim()];
                else obj[f] = rec[v];
            }
        }

        obj['#stLpStat'] = JSON.stringify(obj['#stLpStat']);
        let existingNode, nodeChanged, internalId, appending, content; 
        if(cmp[`$_stupt${field}`]){
            existingNode = document.getElementById(obj['#stLpIdDesc']);
            if(!existingNode) {
                
                content = obj?.getBoundTemplate();
                let container = cmp['#stAppndId']
                    ? document.getElementById(cmp['#stAppndId']).parentNode
                    : document.getElementsByClassName(`loop-container-${cmp.cmpInternalId}`)[0];
                
                if(!container && obj.$parent.loopPrnt)
                    container = document.getElementsByClassName(`listenChangeOn-${cmp.cmpInternalId}-${field}`)[0];

                obj['#stAppndId'] = obj['#stLpIdDesc'];
                if(rec['id']) content = content.replace('<st-wrap','<st-wrap id="'+rec['id']+'"');
                container.insertAdjacentHTML('beforeend', content);
                nodeChanged = false, existingNode = true, appending = true;
                setTimeout(async () => await obj.stOnDOMUpdate(),10);

            }else{
                nodeChanged = existingNode?.getAttribute('stLpStat') != obj['#stLpStat'];
                internalId = existingNode?.getAttribute('stinternalid');
                if(internalId) obj.cmpInternalId = internalId;
                obj.loopPrnt = obj.$parent.cmpInternalId;
                
                if(nodeChanged === true){
                    content = obj?.getBoundTemplate();
                    existingNode.parentNode.innerHTML = content.replace('<st-wrap>','').replace('<st-wrap>','');
                }
                setTimeout(async () => await obj.stOnDOMUpdate(),10);
            }
        } 
        
        return existingNode 
            ? { nodeChanged, existingNode, obj: null, content, instance: obj, appending } 
            : { obj, dynId: rec['id'] };
    }

    /** @param {ViewComponent} cmp */
    defineNewInstanceMethod() { return this; }

    markParsed() {
        Object.assign(this.component, { stillParsedState: true });
        return this;
    }

    /**  @param {ViewComponent} cmp */
    getParsedComponent(cmp) {

        const componentName = cmp.getName();
        window[componentName] = cmp;
        const parsing = this
            .setComponentAndName(window[componentName], cmp.getName())
            .defineNewInstanceMethod();

        if (!Components.parsingTracking[cmp.cmpInternalId]) {
            Components.parsingTracking[cmp.cmpInternalId] = true;
            cmp.setAndGetsParsed = true;
            setTimeout(() => {
                parsing.parseGetsAndSets().markParsed()
            });
        } else {
            delete Components.parsingTracking[cmp.cmpInternalId];
        }
        return window[componentName];
    }

    /**  
     * @param {ViewComponent} cmp 
     * @returns {ViewComponent}
     */
    getNewParsedComponent(cmp, cmpName = null, allowProps = false) {

        this
            .setComponentAndName(cmp, cmpName || cmp.getName())
            .defineNewInstanceMethod()
            .parseOnChange();

        if (!Components.parsingTracking[cmp.cmpInternalId]) {
            Components.parsingTracking[cmp.cmpInternalId] = true;
            cmp.setAndGetsParsed = true;
            this.parseGetsAndSets(null, allowProps);
        } else
            delete Components.parsingTracking[cmp.cmpInternalId];
        this.markParsed();

        return cmp;
    }

    static unloadLoadedComponent(cntrPlaceholder = null) {
        return new Promise((resolve) => {
            if (cntrPlaceholder) cntrPlaceholder.innerHTML = '';

            const { ANY_COMPONT_LOADED } = $stillconst;
            /**  @type { Array<HTMLElement|ViewComponent> } */
            const cmps = document.querySelectorAll(`.${ANY_COMPONT_LOADED}`);
            for (const cmp of cmps) cmp.style.display = 'none';
            resolve([]);
        })
    }

    /** @param {ViewComponent} cmp */
    static async reloadedComponent(cmp, isHome) {
        const isUnAuthn = !AppTemplate.get().isAuthN();
        let cmpName = cmp.constructor.name, template;

        if ((!cmp.isPublic && isUnAuthn) && !Components.obj().isInWhiteList(cmp)) {

            if (document.querySelector(`.${$stillconst.ST_FIXE_CLS}`)) {

                return document.getElementById($stillconst.UI_PLACEHOLDER)
                    .insertAdjacentHTML('afterbegin', authErrorMessage());

            } else return document.write(authErrorMessage());
        }

        /** @type { ViewComponent } */
        let newInstance = await (
            await Components.produceComponent({ cmp: cmpName, loneCntrId: cmp.loneCntrId })
        ).newInstance;

        newInstance.setUUID(cmp.getUUID());
        template = newInstance.getBoundTemplate(null, true);
        newInstance = (new Components()).getParsedComponent(newInstance);
        newInstance.setRoutableCmp(true);

        let elmRef = cmp.getUUID();
        if (isHome) {
            elmRef = isUnAuthn ? $stillconst.ST_HOME_CMP : $stillconst.ST_HOME_CMP1;
        }

        let container = cmp.loneCntrId && cmp.loneCntrId?.trim() != 'null'
            ? document.getElementById(cmp.loneCntrId)
            : document.querySelector(`.${elmRef}`);
        const previousContainer = container;
        if (!previousContainer) {
            await newInstance.onRender();
            container = Components.getCmpViewContainer(cmpName, newInstance.cmpInternalId, newInstance.getTemplate());

            ComponentRegistror.add(newInstance.cmpInternalId, newInstance);
        } else {
            await newInstance.onRender();
            container.innerHTML = newInstance.getTemplate();
        }

        if (newInstance?.lone) setTimeout(() => {
            Components.emitAction(newInstance.getName(), newInstance.cmpInternalId);
        }, 200);

        if (!previousContainer) {
            const cmpParts = Components.componentPartsMap[newInstance.cmpInternalId];
            Components.handleInPartsImpl(newInstance, newInstance.cmpInternalId, cmpParts);
        }

        container.style.display = 'contents';
        const isTHereFixedPart = document.querySelector(`.${$stillconst.ST_FIXE_CLS}`);

        if (!isTHereFixedPart && isUnAuthn || (isTHereFixedPart && isUnAuthn)
        ) {
            Router.callCmpAfterInit(
                null, isHome, isHome ? Router.appPlaceholder : null
            );
        }

        Components.runAfterInit(newInstance)
        setTimeout(async () => newInstance.parseOnChange(), 200);
        if (!newInstance.setAndGetsParsed) {
            newInstance.setAndGetsParsed = true;
            setTimeout(() => {
                (new Components).parseGetsAndSets(
                    ComponentRegistror.component(newInstance.cmpInternalId)
                )
            }, 10);
        }
        if (cmp.loneCntrId)
            ComponentRegistror.add(newInstance.cmpInternalId, newInstance);

        if (cmp.isPublic) this.registerPublicCmp(newInstance);
        else ComponentRegistror.add(cmpName, newInstance);
    }

    static getCmpViewContainer(cmpName, cmpId, template) {

        let cntr = document.querySelector(`.cmp-name-page-view-${cmpName}`);
        if (!cntr) {
            cntr = document.createElement('output');
            cntr.style.display = 'contents';
            cntr.id = `${cmpId}-check`;
            cntr.className = `cmp-name-page-view-${cmpName}`;
            cntr.innerHTML = template;

            let appContr = document.getElementById($stillconst.APP_PLACEHOLDER);
            if (!appContr) appContr = document.getElementById($stillconst.UI_PLACEHOLDER);
            appContr.insertAdjacentHTML('afterbegin', cntr.outerHTML);
        }
        return cntr;
    }

    static unloadApp() {
        const appContainer = document.getElementById($stillconst.APP_PLACEHOLDER);
        const parent = appContainer.parentElement;
        parent.removeChild(appContainer);
    }

    /** @param { ViewComponent } parentCmp */
    static handleInPlaceParts(parentCmp, cmpInternalId = null) {

        /** @type { Array<ComponentPart> } */
        let cmpParts = Components.componentPartsMap[cmpInternalId || parentCmp.cmpInternalId];
        if (cmpInternalId == true)
            cmpParts = Object.values(Components.componentPartsMap)[1];

        Components.handleInPartsImpl(parentCmp, cmpInternalId, cmpParts);

    }

    /**  @param { ViewComponent } parentCmp */
    static handleInPlacePartsInit(parentCmp, cmpInternalId = null) {

        const allParts = Object.entries(Components.componentPartsMap);
        for (const [parentId, cmpParts] of allParts) {
            const parentCmp = $still.context.componentRegistror.componentList[parentId]
            if (parentCmp?.instance?.lone) {

                Components.subscribeAction(
                    parentCmp.instance.getName(),
                    (placeHolderId) => {
                        Components.handleInPartsImpl(
                            parentCmp?.instance, parentId, cmpParts, placeHolderId
                        );
                    }
                );

            } else
                Components.handleInPartsImpl(parentCmp?.instance, parentId, cmpParts);
        }

    }

    static getPartPlaceHolder(parentCmp, cmpInternalId, placeHolderRef) {

        if (placeHolderRef) 
            return document.getElementsByClassName(`still-placeholder${placeHolderRef}`);

        return cmpInternalId == 'fixed-part'
            ? document.getElementById(`stillUiPlaceholder`).getElementsByTagName('still-placeholder')
            : document.getElementsByClassName(`still-placeholder${parentCmp?.getUUID()}`)
    }

    /**
     * @param {BaseComponent} parentCmp 
     * @param {*} cmpInternalId 
     * @param {*} cmpParts 
     */
    static handleInPartsImpl(parentCmp, cmpInternalId, cmpParts, placeHolderRef = null) {

        if ((!cmpParts || !parentCmp) && cmpInternalId != 'fixed-part') return;

        const placeHolders = Components
            .getPartPlaceHolder(parentCmp, cmpInternalId, placeHolderRef);

        /** Get all <st-element> component to replace with the actual component template */
        if (cmpInternalId != 'fixed-part') 
            if (parentCmp) parentCmp.versionId = UUIDUtil.newId();

        const cmpVersionId = cmpInternalId == 'fixed-part' ? null : parentCmp.versionId;
        for (let idx = 0; idx < cmpParts.length; idx++) {
            const parentClss = placeHolders[idx]?.parentNode?.classList;

            /** Preventing this component to be instantiated in case it should not be 
             * rendered due to the (renderIf) flag value is found to be false */
            if (parentClss?.contains($stillconst.PART_REMOVE_CSS)) continue;

            const { proxy, component, props, annotations, ref, loopPrnt, itm } = cmpParts[idx];
            
            if (component == undefined) continue;

            (async () => {
                /** TODO: Dynamic import of assets of a vendor component  */
                /* if (isVendorCmp) {
                    const imports = await cmpCls[realClsName]?.importAssets();
                    imports?.scripts?.forEach(r => {
                        BaseComponent.importScript(`${cmpPath}/${r}`);
                    });
                } */
               const instance = await (
                   await Components.produceComponent({ cmp: component, parentCmp })
                ).newInstance;
                
                let cmpTmp;
                let { build: buildTime } = instance['stSetDelay'];
                if(props['@delayed']) buildTime = WorkerHelper.parseTime(props['@delayed'], component, parentCmp.getName());
                //Delaying component building for the specified time in case defined
                if(buildTime) await new Promise((res, rej) => setTimeout(() => res(''), buildTime))
                

                let cmpName, canHandle = true, refName;
                if (!Components.obj().canHandleCmpPart(instance)) return;

                instance.dynCmpGeneratedId = `st_${UUIDUtil.numberId()}`;
                /** In case the parent component is Lone component, then child component will also be */
                instance.lone = parentCmp?.lone;
                await instance.onRender();
                instance.cmpInternalId = `dynamic-${instance.getUUID()}${component}`;
                instance.stillElement = true;
                instance.proxyName = proxy, instance.loopPrntId = loopPrnt;
                instance.nstngCount = parentCmp?.nstngCount ? parentCmp.nstngCount + 1 : 1;
                if(cmpInternalId == 'fixed-part') instance['isStFixed'] = true;
                ComponentRegistror.add(instance.cmpInternalId, instance);

                if (instance)
                    cmpName = 'constructor' in instance ? instance.constructor.name : null;

                /** REINSTANTIATE */
                cmpTmp = (new Components).getNewParsedComponent(instance, cmpName, true);
                cmpTmp.parentVersionId = cmpVersionId;

                //if (cmpInternalId != 'fixed-part') {
                Components.parseProxy(proxy, cmpTmp, parentCmp, annotations);
                cmpTmp['stName'] = cmpName, StillAppSetup.register(cmpTmp);

                let items = {};
                if(props.item) {
                    items = JSON.parse(props.item), cmpTmp['stEmbededAtFor'] = true;
                    delete props.item;
                }

                const allProps = Object.entries({...props, ...items});
                for (let [prop, value] of allProps) {
                                        
                    if (prop == 'ref') refName = TemplateBinding.handleReferenceName(parentCmp, value, cmpTmp);
                    //Proxy gets ignored becuase it was assigned above and it should be the child class
                    if (prop != 'proxy' && prop != 'component') {

                        if(typeof value !== 'string'){
                            cmpTmp[prop] = value;
                        }else{

                            if (prop.charAt(0) == '(' && prop.at(-1) == ")") {
                                const method = prop.replace('(', '').replace(')', '');
                                cmpTmp[method] = (...param) => parentCmp[value.split('(')[0]](...param);
                                continue;
                            }
    
                            let prefix = String(value).toLowerCase();
                            if (prop in instance && !value?.startsWith('parent.') && !value?.startsWith('self.')) {
                                //Because this assignement will trigger getters for flag, passing an object 
                                //with v field will allow identify that this is framework initial instance assignement
                                const _value = ['false', false].includes(value) ? { v: false, stBVal: true } : ['true', true].includes(value) ? { v: true, stBVal: true } : value;
                                
                                if(cmpInternalId != 'fixed-part') instance[prop] =  _value;
                                if(cmpInternalId == 'fixed-part') {
                                    instance[prop] = _value?.stBVal ? _value.v : _value;
                                    instance.__defineGetter__(prop, () => _value?.stBVal ? _value.v : _value);
                                }
                                continue;
                            }
    
                            if (prefix.startsWith('parent.')) prefix = 'parent.';
                            else if (prefix.startsWith('self.')) prefix = 'self.';
                            else prefix = '';
                            
                            if (prefix == '' && typeof value === 'string') {
                                value = value.trim();
                                if (!isNaN(value) || (value.startsWith('\'') && value.endsWith('\''))) 
                                    cmpTmp[prop] = value;
                            }
    
                            else if ((String(value).toLowerCase().startsWith(prefix) || prefix == '') && typeof value === 'string') {

                                const parentProp = parentCmp[value.replace(prefix, '').trim()];
                                if (parentProp?.onlyPropSignature) cmp[prop] = parentProp.value;
                                else cmp[prop] = parentProp?.value || parentProp;
    
                            } else
                            cmpTmp[prop] = value;
                        }

                    }
                    /** Replace the parent component on the registror So that it get's
                     * updated with the new and fresh data, properties and proxies */
                    ComponentRegistror.add(
                        parentCmp?.constructor?.name,
                        parentCmp
                    );
                }
                //}

                //replaces the actual template in the <st-element> component placeholder
                placeHolders[idx]
                    ?.insertAdjacentHTML('afterbegin', cmpTmp.getBoundTemplate());
                // Renders second level of nesting
                if(cmpTmp?.nstngCount == 1) Components.handleInPlaceParts(cmpTmp);
                setTimeout(async () => {
                    /** Runs the load method which is supposed to implement what should be run
                     * for the component to be displayed accordingly in the User interface */
                    await cmpTmp.load();
                    setTimeout(() => Components.runAfterInit(cmpTmp), 120);
                    //setTimeout(() => Components.emitAction(refName), 120);
                    if ((idx + 1) == cmpParts.length && cmpInternalId != 'fixed-part')
                        setTimeout(() => Components.emitAction('runImport'), 120);

                    Components.handleMarkedToRemoveParts();
                });
            })();
        }

        if (cmpInternalId != 'fixed-part') {
            Components.subscribeAction('runImport', () => {
                if ('importAssets' in parentCmp) {
                    const imports = parentCmp?.importAssets(), assets = [];
                    if (imports?.scripts) assets.push(...imports?.scripts)
                    if (imports?.styles) assets.push(...imports?.styles)
                    if ((assets || []).length)
                        assets.forEach(BaseComponent.importScript);
                }
            })
        }
    }

    /** @param { ViewComponent } cmp */
    canHandleCmpPart(cmp) {
        if (Components.obj().isInWhiteList(cmp)) return true;
        if (AppTemplate.get().isAuthN() && !Components.obj().isInWhiteList(cmp))
            return false;

        if ((!AppTemplate.get().isAuthN()
            && !cmp?.isPublic)
            || !Components.obj().isInWhiteList(cmp))
            return false;
        return true;
    }

    static handleMarkedToRemoveParts() {

        setTimeout(() => {
            const markedToRemoveElm = document
                .getElementsByClassName($stillconst.PART_REMOVE_CSS);
            for (const elm of markedToRemoveElm) elm.innerHTML = '';
        }, 500);

    }

    static removeVersionId;
    static setRemovingPartsVersionId(versionId) {
        Components.removeVersionId = versionId;
    }

    static removeOldParts() {

        (async () => {

            const registror = $still.context.componentRegistror.componentList;
            await registror[Router.preView?.cmpInternalId]?.instance?.stOnUnload();
            await registror[Router.preView?.constructor?.name]?.instance?.stOnUnload();

            delete registror[Router.preView?.cmpInternalId];
            delete registror[Router.preView?.constructor?.name];
            const versionId = Components.removeVersionId;

            setTimeout(() => {
                if (versionId) {
                    document
                        .querySelectorAll(`.loop-container-${Router.preView.cmpInternalId}`)
                        .forEach(elm => elm.innerHTML = '');

                    const list = Object
                        .entries(registror)
                        .filter(r => r[1].instance.parentVersionId == versionId)
                        .map(r => r[0]);

                    list.forEach(
                        async versionId => {
                            await registror[versionId]?.instance?.stOnUnload();
                            delete registror[versionId]
                        }
                    );
                }

                Object
                    .entries($still.context.componentRegistror.componentList)
                    .forEach(async r => {
                        if (r[1].instance.navigationId < Router.navCounter) {
                            await registror[r[0]]?.instance?.stOnUnload();
                            delete $still.context.componentRegistror.componentList[r[0]]
                        }
                    })
            })
        })()
    }

    static parseProxy(proxy, cmp, parentCmp, annotations) {
        if (proxy) {
            const sbscbrs = parentCmp[proxy].subscribers;
            parentCmp[proxy] = cmp;
            if (sbscbrs && sbscbrs.length) sbscbrs.forEach(async cb => await cb());
        }
    }

    /** @type { { Object<[key]: ViewComponent> } } */
    static afterIniSubscriptions = {};

    /**
     * @param {string} event 
     * @param {ViewComponent} cmp 
     */
    static subscribeStAfterInit = (cpmName, cmp) =>
        Components.afterIniSubscriptions[cpmName] = cmp;

    /**  @param {string} event */
    static emitAfterIni(cpmName) {
        (async () => {
            const registror = $still.context.componentRegistror.componentList;
            Components.runAfterInit(registror[cpmName].instance);
        })
        delete Components.afterIniSubscriptions[cpmName];
    }

    /**  @returns { boolean } */
    static checkStInit(cpmName) {
        return cpmName in Components.afterIniSubscriptions;
    }

    static subscribeAction(actonName, action) {

        if (actonName in Components.subscriptions) {
            if (Components.subscriptions[actonName].status == $stillconst.A_STATUS.DONE) {
                action();
                return;
            }
        }

        if (!(actonName in Components.subscriptions)) {
            const status = $stillconst.A_STATUS.PENDING
            Components.subscriptions[actonName] = { status, actions: [], count: 0 };
        }

        const count = Components.subscriptions[actonName].count;
        Components.subscriptions[actonName].actions.push(action);
        Components.subscriptions[actonName].count = count + 1;

    }

    static emitAction(actonName, value = null) {
        if (!(actonName in Components.subscriptions)) {
            Components.subscriptions[actonName] = { status: $stillconst.A_STATUS.DONE };
        }

        if (actonName in Components.subscriptions) {
            Components.subscriptions[actonName].actions?.forEach(async action => await action(value));
            Components.subscriptions[actonName].status = $stillconst.A_STATUS.DONE;
        }
    }

    static clearSubscriptionAction = (actonName) =>
        delete Components.subscriptions[actonName];

    static parseAnnottationRE() {
        const injectOrProxyRE = /(\@Inject|\@Proxy|\@Prop|\@Controller){0,1}[\n \s \*]{0,}/;
        const servicePathRE = /(\@Path){0,1}[\s\\/'A-Z-a-z0-9\.\@]{0,}[\n \s \*]{0,}/;
        const commentRE = /(\@type){0,1}[\s \@ \{ \} \: \| \< \> \, A-Za-z0-9]{1,}[\* \s]{1,}\//;
        const newLineRE = /[\n]{0,}/;
        const fieldNameRE = /[\s A-Za-z0-9 \$ \# \(]{1,}/;
        return injectOrProxyRE.source + servicePathRE.source + commentRE.source + newLineRE.source + fieldNameRE.source;
    }

    static processAnnotation(mt, propertyName = null, cmpName = null) {

        if (!propertyName) {
            const commentEndPos = mt.indexOf('*/') + 2;
            propertyName = mt.slice(commentEndPos).replace('\n', '').trim();
        }

        let inject, proxy, prop, propParsing, type, servicePath, svcPath, controller, propValue = null;
        if (propertyName != '') {

            inject = mt.includes('@Inject'), servicePath = mt.includes('@Path');
            proxy = mt.includes('@Proxy'), prop = mt.includes('@Prop');
            controller = mt.includes('@Controller');
            const value = Components.propValue(mt.split(/@Path|@Prop/)[1]?.split(' ')[1]?.replace('\n', ''));
            svcPath = !servicePath ? '' : value;

            if (prop && mt.includes('@config.')) propValue = value;
            if (mt.includes("@type")) {
                type = mt.split('{')[1].split('}')[0].trim().replace(/\s/g, '');
                if (svcPath == undefined) StillError.undefinedPathInjectionError(type, cmpName);
            }
        }

        propParsing = controller || inject || servicePath || proxy || prop || $stillconst.PROP_TYPE_IGNORE.includes(type);
        return { type, inject, servicePath, proxy, prop, propParsing, svcPath, controller, propValue };
    }

    static propValue(val) {
        return val?.startsWith('@config.')
            ? StillAppSetup.config.get(val.replace('@config.', '')) : val;
    }

    static processedAnnotations = {};
    static registerAnnotation(cmp, prop, annotations) {
        if (!(cmp in Components.processedAnnotations)) Components.processedAnnotations[cmp] = {};
        Components.processedAnnotations[cmp][prop] = annotations;
    }

    static preProcessAnnotations() {

        const re = Components.parseAnnottationRE();
        setTimeout(() => {

            const routes = stillRoutesMap.viewRoutes.lazyInitial;
            const cmps = Object.keys(stillRoutesMap.viewRoutes.lazyInitial);

            for (const cmp of cmps) {

                const script = $stillLoadScript(routes[cmp], cmp, './');
                if (script) {

                    script.onload = function () {

                        try {
                            eval(`${cmp}`).toString().replace(new RegExp(re, 'g'), async (mt) => {

                                const {
                                    type, inject, proxy, prop, propParsing, propertyName, controller
                                } = Components.processAnnotation(mt, null, cmp);
                                Components.registerAnnotation(cmp, propertyName, {
                                    type, inject, proxy, prop, propParsing, controller
                                });
                            });
                        } catch (error) { }

                    }
                    document.head.insertAdjacentElement('beforeend', script);
                }
            };
        });

    }

    static knownClasses = [
        ComponentNotFoundException.name, BaseComponent.name,
        Components.name, 'StillAppSetup'
    ];
    /** @param { { name, prototype } } cmp */
    static register(cmp) {
        /** Will register base and supper classe of the framewor
         * as well as any component class of the Application */
        if (
            cmp.prototype instanceof Components
            || cmp.prototype instanceof BaseComponent
            || cmp.prototype instanceof ViewComponent
            || cmp.__proto__ instanceof BaseComponent
            || cmp.__proto__ instanceof ViewComponent
            || Components.knownClasses.includes(cmp?.name)
        ) window[cmp.name || cmp.stName] = cmp;

        else if (typeof cmp == 'function') window[cmp.name] = cmp;
    }

    setHomeComponent(cmp) {
        this.entryComponentName = cmp.name;
        this.entryComponentPath = stillRoutesMap.viewRoutes.regular[cmp.name]?.path;
    }

    setServicePath(path) { this.servicePath = path }

    static importedMap = new Set();
    static setupImportWorkerState = false;
    setupImportWorker() {

        if (!Components.setupImportWorkerState) {

            Components.setupImportWorkerState = true;
            const worker = new Worker(
                `${Components.obj().parseBaseUrl(Router.baseUrl)}@still/component/manager/import_worker.js`,
                { type: 'module' }
            );

            worker.postMessage({ components: this['getPrefetchList'](), vendorPath: Components.vendorPath });
            worker.onmessage = function (r) {
                const { path, module, cls } = r.data;
                if (!Components.importedMap.has(path)) {
                    Components.importedMap.add(path);
                    BaseComponent.importScript(path, module, cls);
                }
            }
        }
    }

    /** @returns { ViewComponent } */
    static ref = (name) => ComponentRegistror.getFromRef(name);

    static loadInterceptWorker() {
        if ('serviceWorker' in navigator) {
            const baseUrl = Components.obj().parseBaseUrl(Router.baseUrl);
            navigator.serviceWorker.register(`${baseUrl}@still/component/manager/intercept_worker.js`, { type: 'module' })
                .then(() => setTimeout(() => console.log('Interceptor Worker Registered'), 1000))
                .catch(err => console.error('Interceptor SW Registration Failed:', err));
        }
    }

    static loadLoadtWorker() {
        if ('serviceWorker' in navigator) {
            const baseUrl = Components.obj().parseBaseUrl(Router.baseUrl);
            StillAppSetup.get().loadWorker = new Worker(`${baseUrl}@still/component/manager/load_worker.js`, { type: 'module' });
        }
    }

    static async #loadConfig(file = null) {
        const configFile = `${Components.obj().parseBaseUrl()}config/settings/${file || 'default.json'}`;
        try {
            const properties =  await fetch(configFile);
            if(properties.status === 404){
                if(!configFile.endsWith('default.json')) new Error('Config file '+file+' not found');
                return { };
            }
                
            return await properties.json();
        } catch (error) {
            console.error(error);
        }
    }

    parseBaseUrl(Url = Components.baseUrl) {
        let baseUrl = Url.split('//');
        if (baseUrl.length > 2) return baseUrl.slice(0, 2).join('//') + '/';
        return Router.baseUrl;
    }

    static loadCssAssets() {
        const css2 = '@still/ui/css/still.css';
        [css2].forEach(path => {
            const cssTag = document.createElement('link');
            cssTag.href = `${Router.baseUrl}${path}`;
            document.head.insertAdjacentElement('beforeend', cssTag);
        });
    }

    static _obj = null;
    /** @returns { Components } */
    static obj() {
        if (!Components._obj) Components._obj = new Components();
        return Components._obj;
    }

    isInWhiteList(cmp) {
        const isInBlackList = StillAppSetup.get().getBlackList().includes(cmp?.getName());
        const isInWhiteList = StillAppSetup.get().getWhiteList().includes(cmp?.getName());
        if (!isInBlackList && !isInWhiteList && cmp?.isPublic) return true;
        if (isInBlackList) return false;
        return isInWhiteList;
    }

    /** 
     * @param { ViewComponent | String } cmp
     * @param { Object | any | null } data
     * */
    static async new(cmp, data = null) {
        let cmpName = cmp;
        if (cmp?.__proto__?.name == 'ViewComponent') cmpName = cmp.name;
        const { newInstance: instance } = await Components.produceComponent({ cmp: cmpName });
        (async () => await instance.stOnRender(data))();
        instance.cmpInternalId = `dynamic-${instance.getUUID()}${instance.getName()}`;
        const template = instance.getBoundTemplate();
        setTimeout(() => instance.parseOnChange(), 500);
        setTimeout(() => {
            instance.setAndGetsParsed = true;
            (new Components).parseGetsAndSets(instance)
        }, 10);
        ComponentRegistror.add(instance.cmpInternalId, instance);
        setTimeout(() => Components.runAfterInit(instance), 500);
        return { template, component: instance };
    }

    parseDevider(t, cp, id = 'id="$StId"', a = 'class="separator"', b = 'class="handle"', c = 'class="divider"', d = 'class="handlehor"') {
        const reStStart = /\<st-divider[\s\t]{0,}/, reStClose = /[\/\>]{2}/;
        const reAnyProp = /[\=\"A-Za-z0-9\s\t\r\n\.\(\)\&\;\#]{0,}[\s]{0,}/;
        const RE = new RegExp(reStStart.source + reAnyProp.source + reStClose.source, 'g');
        const t2 = `<div ${c} ${id}><l-l class='label'>{{}}</l-l><div ${d}></div></div>`;
        const t1 = `<div ${a} ${id}><l-l class='label'>{{}}</l-l><div ${b}></div></div>`;
        t = t.replace(RE, (_) => {
            let tmpl = t1, props = {}, m = _.replace(/\t/g, '').replace(/\n/, ' ').replace(/\s{2,}/, ' ');
            m.split(/"\s/i).map((r) => {
                let [p, v] = r.startsWith('<') ? r.split(' ')[1].split('="') : r.split('="');
                if (!p.endsWith('>'))
                    props[p?.replace(/\n/, '')?.replace('(onResize)', 'ev1')?.replace('(onLblClick)', 'ev2')] = v.split('"')[0];
            });
            if (props?.type == 'vertical') tmpl = t2;
            tmpl = tmpl.replace('{{}}', props?.label || '');
            const dividerId = `devid-${UUIDUtil.newId()}`;
            if (!cp['stillDevidersCmp']) cp['stillDevidersCmp'] = [];
            cp['stillDevidersCmp'].push({ dividerId, ...props, parent: cp });
            return tmpl.replace('$StId', `${dividerId}`)
        });
        return t;
    }
    /** This is a complement to the parseDiveder  */
    setVertDivider(c) {
        c['stillDevidersCmp'].forEach((p) => {
            const { dividerId, type, ev1: onResize, ev2: onLblClick } = p;
            if (type != 'horizontal') return;
            const separator = document.getElementById(dividerId);
            p.parent[p.proxy] = separator;
            const method = Components.obj().newResizeEvt(c, onResize);
            const { previousElementSibling: _left, nextElementSibling: _right } = separator;
            let [isResizing, startX, leftPanelWidth] = [false, undefined, undefined];

            separator.addEventListener('mousedown', (e) => {
                [isResizing, startX, leftPanelWidth] = [true, e.clientX, _left.offsetWidth];
                document.body.style.cursor = 'ew-resize';
                separator.classList.add('resizing'); // Add class to style handle during resize
            });

            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;
                const deltaX = e.clientX - startX;
                const newLeftPanelWidth = leftPanelWidth + deltaX;
                if (newLeftPanelWidth > 50 && window.innerWidth - newLeftPanelWidth > 50)
                    [_left.style.width, _right.style.flexGrow] = [`${newLeftPanelWidth}px`, 1];
                if (method) (async () => await method({ leftWidth: newLeftPanelWidth }))();
            });

            document.addEventListener('mouseup', () => {
                if (isResizing) {
                    [isResizing, document.body.style.cursor] = [false, 'default'];
                    separator.classList.remove('resizing'); // Remove class after resize
                }
            });
        })
    }

    newResizeEvt(c, evtType) {
        if (!evtType) return () => { };
        return async (val) => {
            const mtd = evtType.split('(')[0];
            if (!c[mtd]) throw new ReferenceError(`Method ${mtd}() does not exists in ${c.getName()}.js`)
            await c[mtd](val)
        };
    }

    setHrzntlDevider(c) {
        c['stillDevidersCmp'].forEach((p) => {
            const { dividerId, type, ev1: onRsiz, ev2: onLblClk, minHeight, maxHeight } = p;

            if (type != 'vertical') return;
            const d = document.getElementById(dividerId);
            d.querySelector('.label').onclick = async () => await Components.obj().newResizeEvt(c, onLblClk)();
            if (p.startHeight) d.style.marginTop = p.startHeight + 'px';
            const method = Components.obj().newResizeEvt(c, onRsiz);
            const { previousElementSibling: _top, nextElementSibling: _bottom, parentElement: cntr } = d;
            cntr.classList.add('container-divider-parent');
            _top.className = _top.className + ' panel top';
            _bottom.classNam = _bottom.className + ' panel bottom';
            let isDragging = false, maH = Number(maxHeight), miH = Number(minHeight);
            p.parent[p?.proxy] = {
                element: d,
                setHeight: (number) => onDividerMove(null, (d.parentElement.clientHeight - number)),
                setMaxHeight: () => onDividerMove(null, d.parentElement.clientHeight - Number(maH)),
            };

            d.addEventListener("mousedown", function () {
                isDragging = true, document.body.style.cursor = 'ns-resize';
            });

            document.addEventListener("mousemove", (e) => {
                if (!isDragging) return; onDividerMove(e);
            });

            document.addEventListener("mouseup", () => {
                isDragging = false, document.body.style.cursor = 'default';
            });

            function onDividerMove(e, height = null) {

                const { offsetTop: containerOffsetTop, offsetHeight: containerHeight } = cntr;
                let topHeight = height;
                if (!height) topHeight = e.clientY - containerOffsetTop;
                const bottomHeight = containerHeight - topHeight - d.offsetHeight;

                if ((miH && (bottomHeight < miH) && !height) || maH && (bottomHeight > maH)) return;

                [_top.style.flex, _bottom.style.flex] = ['none', 'none'];
                [_top.style.height, _bottom.style.height] = [topHeight + "px", bottomHeight + "px"];
                (async () => await method({ topHeight, bottomHeight }))();
            }
        })
    }

    parseAdjustable(template, cmp) {
        const tmpl = `
        <div class="still-resizable-cntr" id="{{$stId}}">
            <div class="resize-top"></div><div class="resize-left"></div>
            <div style="margin-top: 10px; margin-left: 10px;">{{$stContPlaceholder}}</div>
        </div>`;
        const openAdjustable = /<st-element[\s]{0,}component="AdjustableContainer"[\s]{0,}>/;
        const closeAdjustable = /<\/st-element[\s]{0,}>/;
        const re = openAdjustable.source + /([\s\S]*)/.source + closeAdjustable.source
        return template.replace(new RegExp(re, 'g'), (_, mt2) => {
            const adjtbleId = `adjust-${UUIDUtil.newId()}`;
            if (!cmp['stillAdjastableCmp']) cmp['stillAdjastableCmp'] = [];
            cmp['stillAdjastableCmp'].push(adjtbleId);
            return tmpl.replace('{{$stContPlaceholder}}', mt2).replace('{{$stId}}', adjtbleId);
        }
        );
    }

    parseLocalLoader(template) {
        return template.replace(/<st-loader[\s\(\)a-z0-9\!\.\=\"]{0,}[\s]{0,}[\/]{0,}>/i, (mt) => {
            let sheet = document.styleSheets[0], complement = mt.replace('<st-loader','').replace('>',''), lbl = '';
            
            if(!sheet['has-still-cmp-loader']){
                sheet['has-still-cmp-loader'] = true;
                sheet.insertRule(`
                    .still-cmp-loader {
                        border: 10px solid #f3f3f3; border-top: 10px solid #3d3f40; 
                        border-radius: 50%; width: 120px; margin: 0 auto;
                        height: 120px; animation: still-cmp-loaderspin 2s linear infinite;
                    }`,sheet.cssRules.length);

                sheet.insertRule(`
                    @keyframes still-cmp-loaderspin {0% {transform:rotate(0deg);} 100% {transform:rotate(360deg);}
                    }`,sheet.cssRules.length);

                sheet.insertRule(`st-loader-cntr{ display: flex;  }`, sheet.cssRules.length)

                if(mt.indexOf(' center ') > 0)
                    sheet.insertRule(`st-loader-cntr{ 
                        position: absolute;  left: 50%; top: 50%; transform: translate(-50%, -50%); }`, sheet.cssRules.length)
            }
            const lblStartPos = complement.indexOf('(label)="');
            if(lblStartPos > 0){
                lbl = complement.slice(lblStartPos+9).slice(0,complement.slice(lblStartPos+9).indexOf('"'));            
                complement = complement.replace(`(label)="${lbl}"`,'')
            }

            return `
            <st-loader-cntr style="flex-direction:column;align-items:center;" ${complement}>
                <div class="still-cmp-loader"></div>${lbl}
            </st-loader-cntr>
            `;
        });
    }

    static runAfterInit(cmp, params = {}) {
        setTimeout(async () => {
            //console.log(`THIS COMPONENT IS ${cmp.getName()} AND `, cmp['stSetDelay'], ' - ',cmp['#stIsTopLvlCmp']);
            
            await cmp.stOnDOMUpdate();
            if(!(cmp['#stIsTopLvlCmp'] === true && cmp['stSetDelay']?.init))
                setTimeout(async () => await cmp.stAfterInit(params),20);
        } ,10);
        if ('stillDevidersCmp' in cmp) {
            Components.obj().setVertDivider(cmp);
            Components.obj().setHrzntlDevider(cmp);
        }
    }
}
window.$still = $still;