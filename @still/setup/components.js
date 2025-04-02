import { StillAppSetup } from "../../app-setup.js";
import { stillRoutesMap as DefaultstillRoutesMap } from "../../route.map.js";
import { $still, ComponentNotFoundException, ComponentRegistror } from "../component/manager/registror.js";
import { BaseComponent } from "../component/super/BaseComponent.js";
import { BehaviorComponent } from "../component/super/BehaviorComponent.js";
import { ViewComponent as DefaultViewComponent } from "../component/super/ViewComponent.js";
import { Router as DefaultRouter } from "../routing/router.js";
import { UUIDUtil } from "../util/UUIDUtil.js";
import { getRouter, getRoutesFile, getViewComponent } from "../util/route.js";
import { $stillconst } from "./constants.js";
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
    /** @type { DefaultViewComponent } */
    newInstance;
    /** @type { string } */ template;
    /** @type { class | any } */ _class;
}

export const loadComponentFromPath = (path, className, callback = () => { }) => {
    return new Promise(resolve => resolve(''));
}

const loadTemplate = async (path, placeHolder) => {
    try {
        return (await fetch(`${path}/template.html`)).text();
    } catch (err) {
        console.error(`Error loading visual component part for ${placeHolder}`);
        return false;
    }
}

class LoadedComponent {

    /**  @type {Array<string>}*/ cpmImports;

    /** @type {HTMLElement}*/ cmp;
}

export class Components {

    /**
     * @returns {{template, }}
     */
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
    static vendorPath = `${Router.baseUrl}@still/vendors`;
    static parsingTracking = {};
    static prevLoadingTracking = new Set();

    void() { }

    /**
     * @returns { StillAppSetup }
     */
    static get() {
        if (StillAppSetup.instance == null)
            StillAppSetup.instance = new StillAppSetup();
        return StillAppSetup.instance;
    }

    getTopLevelCmpId() {
        const { TOP_LEVEL_CMP, ANY_COMPONT_LOADED } = $stillconst;
        return `${TOP_LEVEL_CMP}`;
    }

    renderOnViewFor(placeHolder, cmp = null) {

        const isLoneCmp = Router.clickEvetCntrId;

        if (this.template instanceof Array)
            this.template = this.template.join('');

        let cntr = document.getElementById(placeHolder);
        if (isLoneCmp) cntr = document.getElementById(isLoneCmp);
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

    renderOUtsideOnViewFor(placeHolder, template) {
        if (this.template instanceof Array)
            this.template = this.template.join('');

        document
            .getElementById(placeHolder)
            .innerHTML = `<div>${template}<div>`;
    }

    static newSetup() {
        return new StillAppSetup();
    }

    /**
     * 
     * @param {HTMLElement} cmp 
     * @returns { LoadedComponent }
     */
    async loadComponentDEPRECATE(cmp) {
        try {

            const { tagName } = cmp;
            const htmlElm = String(tagName).toLowerCase();
            const { path, name: cmpName } = context.componentMap[htmlElm];
            const content = await loadTemplate(path, cmpName);
            if (cmp) {
                if (!content) {
                    throw new Error(`Error loading visual component part for ${tagName}`);
                }
                cmp.innerHTML = content;
            }

            const cpmImports = await loadComponentFromPath(path, cmpName);
            return { cpmImports, cmp };

        } catch (error) {
            console.error(`Error on tgemplate load: `, error);
        }
    }

    /**
     *  @returns { ProducedCmpResultType } 
    */
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
            folderPah = `${Components.baseUrl}@still/vendors/${clsPath.join('/').slice(1)}`;
            cmpPath = `${folderPah}/${clsName}`;
        } else {
            let cmpRoute = Router.routeMap[clsName]?.path;
            if (!cmpRoute) {
                StillError.handleStComponentNotFound(
                    'TypeError', parentCmp, clsName
                );
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
        styles = styles.toString().replace(styleRE, (mtch) => {
            return mtch.trim();
        });

        return `<output class="${scope}" style="display: contents;">
                    ${template}
                <output>
                \n${styles}`;

    }

    /* static async fetchTemplate(tmplFileUrl, filePath) {
        const result = await fetch(tmplFileUrl);
        if (result.status == 404) {
            StillError.handleInvalidTmplUrl('TypeError', parentCmp, filePath);
            return
        }
        return result;

    } */

    async loadComponent() {
        loadComponentFromPath(
            this.entryComponentPath,
            this.entryComponentName
        ).then(async () => {

            //Components.preProcessAnnotations();
            $still.context.currentView = await StillAppSetup.instance.init();

            /**  @type { ViewComponent } */
            const currentView = $still.context.currentView;

            if (currentView.template.indexOf(this.stillCmpConst) >= 0) {

                $still.context.currentView = await (
                    await Components.produceComponent({ cmp: this.entryComponentName })
                ).newInstance;

                if (!AppTemplate.get().isAuthN() && !$still.context.currentView.isPublic)
                    return document.write($stillconst.MSG.PRIVATE_CMP);


                setTimeout(() => $still.context.currentView.parseOnChange(), 500);
                StillAppSetup.register($still.context.currentView.constructor);
                this.template = this.getHomeCmpTemplate($still.context.currentView);

                ComponentRegistror.add(
                    $still.context.currentView.cmpInternalId,
                    $still.context.currentView
                );

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

                if (!$still.context.currentView.lone && !Router.clickEvetCntrId)
                    this.renderOnViewFor('stillUiPlaceholder', $still.context.currentView);
                setTimeout(() => Components.handleInPlacePartsInit($still.context.currentView, 'fixed-part'));
                //setTimeout(() => Components.handleInPlacePartsInit($still.context.currentView));
                setTimeout(async () => {
                    await $still.context.currentView.stAfterInit();
                    if (!Router.clickEvetCntrId) AppTemplate.injectToastContent();
                });

                return;
            }

            if (document.getElementById(this.stillAppConst))
                this.renderOnViewFor(this.stillAppConst, $still.context.currentView);
            else
                new Components().renderPublicComponent($still.context.currentView);

            setTimeout(async () => await $still.context.currentView.stAfterInit());
        });
    }


    isAppLoaded() {
        return document.getElementById(this.stillAppConst);
    }


    /** @param { ViewComponent } cmp */
    renderPublicComponent(cmp) {

        if (cmp.isPublic) {
            Components.registerPublicCmp(cmp);

            this.template = cmp.getBoundTemplate();
            setTimeout(() => cmp.parseOnChange(), 500);
            setTimeout(() => {
                cmp.setAndGetsParsed = true;
                (new Components).parseGetsAndSets(cmp)
            }, 10);

            this.renderOnViewFor('stillUiPlaceholder', cmp);
            ComponentRegistror.add(cmp.cmpInternalId, cmp);
            const cmpParts = Components.componentPartsMap[cmp.cmpInternalId];
            setTimeout(() =>
                Components.handleInPartsImpl(cmp, cmp.cmpInternalId, cmpParts)
            );
            Components.handleMarkedToRemoveParts();
        } else {
            document.body.innerHTML = ($stillconst.MSG.PRIVATE_CMP);
        }

    }

    static registerPublicCmp(cmp) {
        window['Public_' + cmp.constructor.name] = cmp;
    }

    getInitialPrivateTemplate(cmpName) {

        $still.context.currentView = eval(`new ${cmpName}()`);
        let template = this.getCurrentCmpTemplate($still.context.currentView);
        template = currentView.template.replace(
            this.stillCmpConst,
            `<div id="${this.stillAppConst}" class="${$stillconst.TOP_LEVEL_CMP}">${template}</div>`
        );

        return template;

    }

    /**
     * 
     * @param {ViewComponent} cmp  
     */
    getCurrentCmpTemplate(cmp, regularId = false) {
        const init = cmp;
        init.setUUID(regularId ? cmp.getUUID() : this.getTopLevelCmpId());
        const loadCmpClass = $stillconst.ANY_COMPONT_LOADED;
        return (init.template)
            .replace('class="', `class="${init.getUUID()} ${loadCmpClass} `);
    }

    /**
     * 
     * @param {ViewComponent} cmp 
     */
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

    /** 
     * @param {ViewComponent} cmp 
     */
    defineSetter = (cmp, field) => {

        cmp.__defineGetter__(field, () => {

            const result = {
                value: cmp['$still_' + field],
                onChange: (callback = function () { }) => {
                    cmp[`$still${field}Subscribers`].push(callback);
                },
                defined: true,
                firstPropag: false
            };

            const validator = BehaviorComponent.currentFormsValidators;
            if (validator[cmp.constructor.name]) {
                if (field in validator[cmp.constructor.name]) {
                    result['isValid'] = validator[cmp.constructor.name][field]['isValid'];
                }
            }

            return result;
        });

    }

    /** 
     * @param {ViewComponent} cmp 
     */
    parseClassObserver() {

        const cmp = this.component;
        Object.assign(cmp, {
            subcribers: [],
            onChange: (callback = () => { }) => {
                cmp[`$still${field}Subscribers`].push(callback);
            }
        });

        return this;
    }

    parseOnChange() {
        return this;
    }

    /** 
     * @param {ViewComponent} instance 
     */
    parseGetsAndSets(instance = null, allowfProp = false, loneContainer = null) {
        /** @type { ViewComponent } */
        const cmp = instance || this.component;
        const cmpName = this.componentName;

        cmp.getProperties(allowfProp).forEach(field => {

            const inspectField = cmp[field];
            if (inspectField?.onlyPropSignature || inspectField?.name == 'Prop') {

                if (inspectField.sTForm) {
                    cmp[field].validate = function () {
                        return BehaviorComponent.validateForm(`${cmp.constructor.name}-${field}`);
                    }
                    return;
                }

                const listenerFlag = inspectField?.listenerFlag;
                cmp[field] = cmp[field].value;
                if (listenerFlag) {

                    cmp.__defineGetter__(field, () => inspectField.inVal);

                    cmp.__defineSetter__(field, (val) => {
                        cmp[field];
                        /** This is for handling (renderIf) */
                        const elmList = document.getElementsByClassName(inspectField.listenerFlag);
                        for (const elm of elmList) {
                            if (val) elm.classList.remove($stillconst.PART_HIDE_CSS);
                            else elm.classList.add($stillconst.PART_HIDE_CSS);
                        }

                        cmp.__defineGetter__(field, () => val);
                    });

                }
            } else {

                let value = cmp[field];
                if (!cmp[field] && cmp[field] != 0) value = '';

                Object.assign(cmp, { ['$still_' + field]: value });
                Object.assign(cmp, { [`$still${field}Subscribers`]: [] });
                this.defineSetter(cmp, field);

                cmp.__defineSetter__(field, (newValue) => {
                    cmp.__defineGetter__(field, () => newValue);
                    cmp['$still_' + field] = newValue;
                    this.defineSetter(cmp, field);
                    (async () => await cmp.stOnUpdate());

                    if (cmp[`$still${field}Subscribers`].length > 0) {
                        setTimeout(() => cmp[`$still${field}Subscribers`].forEach(
                            subscriber => subscriber(cmp['$still_' + field])
                        ));
                    }

                    if (cmp.$stillClassLvlSubscribers.length > 0)
                        setTimeout(() => cmp.notifySubscribers(cmp.getStateValues()));

                    if (cmp[field]?.defined || cmp.dynLoopObject)
                        this.propageteChanges(cmp, field);

                });
                let timeCounter = 0;
                const firstPropagateTimer = setInterval(() => {
                    if ('value' in cmp[field]) {
                        clearInterval(firstPropagateTimer);
                        if (!this.notAssignedValue.includes(cmp['$still_' + field])) {
                            this.propageteChanges(cmp, field);
                        }
                        cmp[field].firstPropag = true;
                    }
                }, 200);

            }

        });
        return this;
    }

    /** @param { ViewComponent } cmp */
    propageteChanges(cmp, field) {

        const cpName = cmp.dynLoopObject || cmp.lone
            ? cmp.cmpInternalId
            : cmp.getProperInstanceName();
        const cssRef = `.listenChangeOn-${cpName}-${field}`;
        const subscribers = document.querySelectorAll(cssRef);
        const cssRefCombo = `.listenChangeOn-${cpName}-${field}-combobox`;
        const subscribersCombo = document.querySelectorAll(cssRefCombo);
        const stateChange = `.state-change-${cpName}-${field}`;
        const stateChangeSubsribers = document.querySelectorAll(stateChange);

        if (stateChangeSubsribers) {
            stateChangeSubsribers.forEach(subcriber => {
                subcriber.innerHTML = cmp['$still_' + field];
            });
        }

        if (subscribers) {
            subscribers.forEach(/** @type {HTMLElement} */elm => {
                this.dispatchPropagation(elm, field, cmp);
            });
        }

        if (subscribersCombo) {
            subscribersCombo.forEach(/** @type {HTMLElement} */elm => {
                setTimeout(() => {
                    this.propageteToInput(elm, field, cmp);
                });
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

            let container = document.createElement(elm.tagName);
            let prevClass = elm.getAttribute('newCls');
            prevClass = elm.getAttribute('class').replace(prevClass, '');
            container.className = `${prevClass}`;

            container = await this.parseAndAssigneValue(elm, field, cmp, container);
            if (elm.tagName == 'TBODY')
                elm.parentNode.insertAdjacentElement('beforeend', container);

            else {

                const finalCtnr = document.createElement('output');
                finalCtnr.innerHTML = container.innerHTML;
                finalCtnr.className = `loop-container-${cmp.cmpInternalId}`;
                finalCtnr.style.display = 'contents';
                elm.insertAdjacentElement('beforeend', finalCtnr);
            }

        })();

    }

    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    async parseAndAssigneValue(elm, field, cmp, container) {

        const hash = elm.getAttribute('hash');
        container.classList.add($stillconst.SUBSCRIBE_LOADED);

        let tmpltContent, childCmp;
        if (elm.tagName == 'SELECT') {
            const childs = elm.querySelectorAll('option');

            const placeholder = elm.getAttribute('placeholder') || 'Select an option';
            if (childs[0].outerHTML.toString().indexOf('value="{item.') > 0)
                tmpltContent = childs[0].outerHTML.toString();

            let result = `<option value='' selected>${placeholder}</option>`;
            container.innerHTML = await this.parseForEachTemplate(tmpltContent, cmp, field, result);
            return container;

        } else {
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
        if (oldContainer) elm?.parentNode?.removeChild(oldContainer);
        container.classList.add(hash);

        container.innerHTML = await this.parseForEachTemplate(
            tmpltContent, cmp, field, '', childCmp
        );
        return container;

    }

    async parseForEachTemplate(tmpltContent, cmp, field, result, childCmp = null) {

        let template = tmpltContent.replace('display:none;', ''), childTmpl,
            childResult = '';

        if (cmp['$still_' + field] instanceof Array) {

            if (childCmp?.stElement) {

                const childInstance = await (await Components.produceComponent({
                    cmp: childCmp.stElement,
                    parentCmp: cmp, registerCls: true
                }));

                childTmpl = childInstance.template;
                let fields = Object.entries(childCmp.props), noFieldsMap;
                if (fields.length == 0) noFieldsMap = true;


                for (const rec of cmp['$still_' + field]) {
                    /** @type { ViewComponent } */
                    const inCmp = new childInstance._class();
                    inCmp.cmpInternalId = 'dynamic-' + inCmp.getUUID();
                    inCmp.template = childTmpl;
                    inCmp.dynLoopObject = true;
                    inCmp.stillElement = true;
                    inCmp.parentVersionId = cmp.versionId;

                    if (noFieldsMap && childCmp.stDSource)
                        fields = Object.entries(cmp['$still_' + field][0]);

                    await inCmp.onRender();
                    childResult += await this
                        .replaceBoundFieldStElement(inCmp, fields, rec, noFieldsMap)
                        .getBoundTemplate();

                    setTimeout(() => inCmp.parseOnChange(), 500);
                    ComponentRegistror.add(inCmp.cmpInternalId, inCmp);
                    setTimeout(() => {
                        (new Components)
                            .parseGetsAndSets(
                                ComponentRegistror.component(inCmp.cmpInternalId)
                            )
                    }, 10);
                };

            } else {

                cmp['$still_' + field].forEach((rec) => {
                    let parsingTemplate = template;
                    let fields = Object.entries(rec);
                    result += this.replaceBoundField(parsingTemplate, fields);
                });

            }

        }
        return childCmp?.stElement ? childResult : result;
    }

    replaceBoundField(parsingTemplate, fields) {
        for (const [f, v] of fields) {
            parsingTemplate = parsingTemplate.replaceAll(`{item.${f}}`, v);
        }
        return parsingTemplate;
    }

    /** 
     * @param { ViewComponent } obj
     * @returns { ViewComponent }
     * */
    replaceBoundFieldStElement(obj, fields, rec, noFieldsMap) {

        if (noFieldsMap) {
            for (const [f, v] of Object.entries(rec)) {
                if (f in obj) {
                    if (typeof v == 'string')
                        obj[f] = v?.replace('item.', '')?.trim();
                    else
                        obj[f] = v;
                }
            }
        } else {
            for (const [f, v] of fields) {
                if (typeof v == 'string')
                    obj[f] = rec[v?.replace('item.', '')?.trim()];
                else
                    obj[f] = rec[v];
            }
        }

        return obj;
    }


    /** @param {ViewComponent} cmp */
    defineNewInstanceMethod() {

        const cmp = this.component;
        const cmpName = this.componentName;
        Object.assign(cmp, {
            new: (params) => {

                /**  @type {ViewComponent} */
                let instance;
                if (params instanceof Object)
                    instance = this.getNewParsedComponent(eval(`new ${cmpName}({...${JSON.stringify(params)}})`));

                if (params instanceof Array)
                    instance = this.getNewParsedComponent(eval(`new ${cmpName}([...${JSON.stringify(params)}])`));

                instance.cmpInternalId = `dynamic-${instance.getUUID()}${cmpName}`;
                /** TODO: Replace the bellow with the export under componentRegistror */
                ComponentRegistror.add(
                    instance.cmpInternalId,
                    instance
                );

                if (instance) return instance;

                return eval(`new ${cmpName}('${params}')`);
            }
        });
        return this;
    }

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
            setTimeout(() => {
                cmp.setAndGetsParsed = true;
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
        } else {
            delete Components.parsingTracking[cmp.cmpInternalId];
        }
        this.markParsed();

        return cmp;

    }

    static unloadLoadedComponent(cntrPlaceholder = null) {
        return new Promise((resolve) => {

            if (cntrPlaceholder) {
                cntrPlaceholder.innerHTML = '';
            }

            const { ANY_COMPONT_LOADED } = $stillconst;
            /**
             * @type { Array<HTMLElement|ViewComponent> }
             */
            const cmps = document.querySelectorAll(`.${ANY_COMPONT_LOADED}`);
            for (const cmp of cmps) cmp.style.display = 'none';
            resolve([]);


        })
    }

    static markPrevContarOrphan(cmpClassId) {
        const cmpCntrs = document.querySelectorAll(`.${cmpClassId}`);
        cmpCntrs.forEach(elm => elm.classList.add('orphan-cmp-container'));
    }

    /** @param {ViewComponent} cmp */
    static async reloadedComponent(cmp, isHome) {
        const isUnAuthn = !AppTemplate.get().isAuthN();
        if (!cmp.isPublic && isUnAuthn) {

            if (document.querySelector(`.${$stillconst.ST_FIXE_CLS}`)) {

                return document.getElementById($stillconst.UI_PLACEHOLDER)
                    .insertAdjacentHTML('afterbegin', $stillconst.MSG.PRIVATE_CMP);

            } else return document.write($stillconst.MSG.PRIVATE_CMP);
        }

        let cmpName = cmp.constructor.name, template;

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

        let container = cmp.loneCntrId
            ? document.getElementById(cmp.loneCntrId)
            : document.querySelector(`.${elmRef}`);
        const previousContainer = container;
        if (!previousContainer) {
            //Components.markPrevContarOrphan(`cmp-name-page-view-${cmpName}`);
            container = Components.getCmpViewContainer(cmpName, newInstance.cmpInternalId);
            container.innerHTML = '';
            ComponentRegistror.add(newInstance.cmpInternalId, newInstance);
        }

        await newInstance.onRender();
        container.innerHTML = newInstance.getTemplate();
        if (newInstance?.lone) setTimeout(() => {
            Components.emitAction(newInstance.getName(), newInstance.cmpInternalId);
        }, 200);

        if (!previousContainer) {
            const cmpParts = Components.componentPartsMap[newInstance.cmpInternalId];
            Components.handleInPartsImpl(newInstance, newInstance.cmpInternalId, cmpParts);
        }

        container.style.display = 'contents';
        const isTHereFixedPart = document.querySelector(`.${$stillconst.ST_FIXE_CLS}`);

        if (
            !isTHereFixedPart && isUnAuthn
            || (isTHereFixedPart && isUnAuthn)
        ) {
            Router.callCmpAfterInit(
                null, isHome, isHome ? Router.appPlaceholder : null
            );
        }

        setTimeout(async () => newInstance.parseOnChange(), 200);
        //await newInstance.stAfterInit();
        await newInstance.onRender();
        if (cmp.loneCntrId) {
            ComponentRegistror.add(newInstance.cmpInternalId, newInstance);
            //ComponentRegistror.add(cmpName, newInstance);
        }

        if (cmp.isPublic) this.registerPublicCmp(newInstance);
        else ComponentRegistror.add(cmpName, newInstance);

    }

    static getCmpViewContainer(cmpName, cmpId) {

        let cntr = document.querySelector(`.cmp-name-page-view-${cmpName}`);
        if (!cntr) {

            cntr = document.createElement('output');
            cntr.style.display = 'contents';
            cntr.id = `${cmpId}-check`;
            cntr.className = `cmp-name-page-view-${cmpName}`;

            let appContr = document.getElementById($stillconst.APP_PLACEHOLDER);
            if (!appContr) appContr = document.getElementById($stillconst.UI_PLACEHOLDER);
            appContr.insertAdjacentHTML('afterbegin', cntr);

        }

        return cntr;
    }

    static unloadApp() {
        const appContainer = document.getElementById($stillconst.APP_PLACEHOLDER);
        const parent = appContainer.parentElement;
        parent.removeChild(appContainer);
    }

    /**
     * 
     * @param {ViewComponent} cmp 
     */
    renderCmpParts(cmp) { }

    /**
     * 
     * @param { ViewComponent } parentCmp 
     */
    static handleInPlaceParts(parentCmp, cmpInternalId = null) {

        /** @type { Array<ComponentPart> } */
        let cmpParts = Components.componentPartsMap[cmpInternalId || parentCmp.cmpInternalId];
        if (cmpInternalId == true)
            cmpParts = Object.values(Components.componentPartsMap)[1];

        Components.handleInPartsImpl(parentCmp, cmpInternalId, cmpParts);

    }

    /**
     * 
     * @param { ViewComponent } parentCmp 
     */
    static handleInPlacePartsInit(parentCmp, cmpInternalId = null) {

        ///** @type { Array<ComponentPart> } */
        const allParts = Object.entries(Components.componentPartsMap);
        for (const [parentId, cmpParts] of allParts) {
            //ComponentRegistror.add(cmpInternalId, instance);
            const parentCmp = $still.context.componentRegistror.componentList[parentId]
            //let cmpParts = Components.componentPartsMap[cmpInternalId];
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

        if (placeHolderRef) {
            return document.getElementsByClassName(`still-placeholder${placeHolderRef}`);
        }

        return cmpInternalId == 'fixed-part'
            ? document.getElementById(`stillUiPlaceholder`).getElementsByTagName('still-placeholder')
            : document.getElementsByClassName(`still-placeholder${parentCmp?.getUUID()}`)

    }

    /**
     * 
     * @param {BaseComponent} parentCmp 
     * @param {*} cmpInternalId 
     * @param {*} cmpParts 
     * @returns 
     */
    static handleInPartsImpl(parentCmp, cmpInternalId, cmpParts, placeHolderRef = null) {

        if (!cmpParts || !parentCmp) return;

        const placeHolders = Components
            .getPartPlaceHolder(parentCmp, cmpInternalId, placeHolderRef);

        /**
         * Get all <st-element> component to replace with the
         * actual component template
         */
        if (cmpInternalId != 'fixed-part') {
            if (parentCmp) parentCmp.versionId = UUIDUtil.newId();
        }

        const cmpVersionId = cmpInternalId == 'fixed-part' ? null : parentCmp.versionId;
        for (let idx = 0; idx < cmpParts.length; idx++) {
            const parentClss = placeHolders[idx]?.parentNode?.classList;

            /**
             * Preventing this component to be instantiated in case it 
             * should not be rendered due to the (renderIf) flag value
             * is found to be false
             */
            if (parentClss?.contains($stillconst.PART_REMOVE_CSS))
                continue;

            const { proxy, component, props, annotations, ref } = cmpParts[idx];
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
                instance.dynCmpGeneratedId = `st_${UUIDUtil.numberId()}`;
                /** In case the parent component is Lone component, then child component will also be */
                instance.lone = parentCmp.lone;
                await instance.onRender();
                instance.cmpInternalId = `dynamic-${instance.getUUID()}${component}`;
                instance.stillElement = true;
                instance.proxyName = proxy;
                ComponentRegistror.add(instance.cmpInternalId, instance);

                let cmpName;
                if (instance) {
                    cmpName = 'constructor' in instance ? instance.constructor.name : null;
                }

                /** TOUCH TO REINSTANTIATE */
                const cmp = (new Components).getNewParsedComponent(instance, cmpName);
                cmp.parentVersionId = cmpVersionId;

                if (cmpInternalId != 'fixed-part') {
                    Components.parseProxy(proxy, cmp, parentCmp, annotations);
                    cmp.setParentComponent(parentCmp);
                    cmp['name'] = cmpName;
                    StillAppSetup.register(cmp);

                    const allProps = Object.entries(props);
                    for (let [prop, value] of allProps) {

                        if (prop == 'ref') ComponentRegistror.add(value, cmp);

                        //Proxy gets ignored becuase it was assigned above and it should be the child class
                        if (prop != 'proxy' && prop != 'component') {
                            if (prop.charAt(0) == '(' && prop.at(-1) == ")") {
                                const method = prop.replace('(', '').replace(')', '');
                                cmp[method] = function (...param) {
                                    return parentCmp[value.split('(')[0]](...param);
                                }
                                continue;
                            }

                            let prefix = String(value).toLowerCase();

                            if (prefix.startsWith('parent.')) prefix = 'parent.';
                            else if (prefix.startsWith('self.')) prefix = 'self.';
                            else prefix = '';

                            if (prefix == '') {
                                value = value.trim();
                                if (
                                    !isNaN(value)
                                    || (value.startsWith('\'') && value.endsWith('\''))
                                ) cmp[prop] = value;
                            }

                            else if (String(value).toLowerCase().startsWith(prefix) || prefix == '') {

                                const parentProp = parentCmp[value.replace(prefix, '').trim()];
                                if (parentProp?.onlyPropSignature) cmp[prop] = parentProp.value;
                                else cmp[prop] = parentProp?.value || parentProp;

                            } else
                                cmp[prop] = value;
                        }
                        /**
                         * Replace the parent component on the registror So that it get's
                         * updated with the new and fresh data, properties and proxies
                         */
                        ComponentRegistror.add(
                            parentCmp.constructor.name,
                            parentCmp
                        );
                    }
                }

                /**
                 * replaces the actual template in the <st-element> component placeholder
                 */
                placeHolders[idx]
                    ?.insertAdjacentHTML('afterbegin', cmp.getBoundTemplate());
                setTimeout(async () => {
                    /**
                     * Runs the load method which is supposed to implement what should be run
                     * for the component to be displayed accordingly in the User interface
                     */
                    await cmp.load();
                    setTimeout(async () => await cmp.stAfterInit(), 120);
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

    static handleMarkedToRemoveParts() {

        setTimeout(() => {
            const markedToRemoveElm = document
                .getElementsByClassName($stillconst.PART_REMOVE_CSS);
            for (const elm of markedToRemoveElm) {
                elm.innerHTML = '';
            }
        }, 500);

    }

    /**
     * 
     * @param {ViewComponent} cls 
     * @returns { string } 
     */
    static generatePropListener(cls, prop) {

        const clsListener = 'vamo';
        const initialValue = cls[prop];
        return clsListener;

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

        })

    }

    static parseProxy(proxy, cmp, parentCmp, annotations) {

        const cmpName = parentCmp.constructor.name;
        if (proxy) {
            const subscribers = parentCmp[proxy].subscribers;
            parentCmp[proxy] = cmp;

            if (subscribers && subscribers.length)
                subscribers.forEach(async cb => await cb());
        }

    }


    async loadFromPath(path, className) {

        return new Promise((resolve) => {

            const script = $stillLoadScript(path, className);

            if (!script) {
                resolve([]);
                return;
            }

            const timer = setInterval(() => {

                let scriptLoad = document.getElementById(script.id);
                if (scriptLoad) {
                    clearInterval(timer);
                    resolve(scriptLoad);
                }

            }, 200);

        });

    }

    /**
     * @type { { Object<[key]: ViewComponent> } }
     */
    static afterIniSubscriptions = {};

    /**
     * 
     * @param {string} event 
     * @param {ViewComponent} cmp 
     */
    static subscribeStAfterInit(cpmName, cmp) {
        Components.afterIniSubscriptions[cpmName] = cmp;
    }

    /**
     * 
     * @param {string} event 
     */
    static emitAfterIni(cpmName) {
        (async () => {
            const registror = $still.context.componentRegistror.componentList;
            await registror[cpmName].instance.stAfterInit();
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

    static clearSubscriptionAction(actonName) {
        delete Components.subscriptions[actonName];
    }

    static parseAnnottationRE() {
        const injectOrProxyRE = /(\@Inject|\@Proxy|\@Prop){0,1}[\n \s \*]{0,}/;
        const servicePathRE = /(\@ServicePath){0,1}[\s\\/'A-Z-a-z0-9]{0,}[\n \s \*]{0,}/;
        const commentRE = /(\@type){0,1}[\s \@ \{ \} \: \| \< \> \, A-Za-z0-9]{1,}[\* \s]{1,}\//;
        const newLineRE = /[\n]{0,}/;
        const fieldNameRE = /[\s A-Za-z0-9 \$ \# \(]{1,}/;
        return injectOrProxyRE.source + servicePathRE.source + commentRE.source + newLineRE.source + fieldNameRE.source;
    }

    static processAnnotation(mt, propertyName = null) {

        if (!propertyName) {
            const commentEndPos = mt.indexOf('*/') + 2;
            propertyName = mt.slice(commentEndPos).replace('\n', '').trim();
        }

        let inject, proxy, prop, propParsing, type, servicePath, svcPath;
        if (propertyName != '') {

            inject = mt.includes('@Inject'), servicePath = mt.includes('@ServicePath');
            proxy = mt.includes('@Proxy'), prop = mt.includes('@Prop');
            svcPath = !servicePath
                ? '' : mt.split('@ServicePath')[1].split(' ')[1].replace('\n', '');

            if (mt.includes("@type")) {
                type = mt.split('{')[1].split('}')[0].trim();
                type = type.replace(/\s/g, '');
            }
        }

        propParsing = inject || servicePath || proxy || prop || $stillconst.PROP_TYPE_IGNORE.includes(type);

        return { type, inject, servicePath, proxy, prop, propParsing, svcPath };

    }

    static processedAnnotations = {};

    static registerAnnotation(cmp, prop, annotations) {
        if (!(cmp in Components.processedAnnotations)) {
            Components.processedAnnotations[cmp] = {};
        }
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
                                    type, inject, proxy, prop, propParsing, propertyName
                                } = Components.processAnnotation(mt);
                                Components.registerAnnotation(cmp, propertyName, {
                                    type, inject, proxy, prop, propParsing
                                });
                            });
                        } catch (error) { }

                    }
                    document.head.insertAdjacentElement('beforeend', script);
                }
            };
        });

    }

    static knownClassed = [
        ComponentNotFoundException.name,
        BaseComponent.name,
        Components.name,
        'StillAppSetup'
    ]
    /** 
     * @param { { name, prototype } } cmp 
     * */
    static register(cmp) {
        /**
         * Will register base and supper classe of the framewor
         * as well as any component class of the Application 
         */
        if (
            cmp.prototype instanceof Components
            || cmp.prototype instanceof BaseComponent
            || cmp.prototype instanceof ViewComponent
            || cmp.__proto__ instanceof BaseComponent
            || cmp.__proto__ instanceof ViewComponent
            || Components.knownClassed.includes(cmp?.name)
        ) window[cmp.name] = cmp;

        else if (typeof cmp == 'function')
            window[cmp.name] = cmp;

    }

    setHomeComponent(cmp) {
        this.entryComponentName = cmp.name;
        this.entryComponentPath = stillRoutesMap.viewRoutes.regular[cmp.name]?.path;
    }

    setServicePath(path) {
        this.servicePath = path;
    }


    static importedMap = new Set();
    static setupImportWorkerState = false;
    setupImportWorker() {

        if (!Components.setupImportWorkerState) {

            Components.setupImportWorkerState = true;
            const worker = new Worker(
                `${Router.baseUrl}@still/component/manager/import_worker.js`,
                { type: 'module' }
            );

            worker.postMessage({
                components: this['getPrefetchList'](),
                vendorPath: Components.vendorPath
            });

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
            navigator.serviceWorker.register(`${Router.baseUrl}@still/component/manager/intercept_worker.js`, { type: 'module' })
                .then(() => console.log('Service Worker Registered'))
                .catch(err => console.log('SW Registration Failed:', err));
        }

    }

    static loadCssAssets() {

        const css1 = '@still/css/still-fundamental.css';
        const css2 = '@still/ui/css/still.css';

        [css1, css2].forEach(path => {
            const cssTag = document.createElement('link');
            cssTag.href = `${Router.baseUrl}${path}`;
            document.head.insertAdjacentElement('beforeend', cssTag);
        });

    }

}
window.$still = $still;