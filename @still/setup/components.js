import { StillAppSetup } from "../../app-setup.js";
import { stillRoutesMap } from "../../route.map.js";
import { ComponentNotFoundException, ComponentRegistror } from "../component/manager/registror.js";
import { BaseComponent } from "../component/super/BaseComponent.js";
import { BehaviorComponent } from "../component/super/BehaviorComponent.js";
import { ViewComponent } from "../component/super/ViewComponent.js";
import { Router } from "../routing/router.js";
import { UUIDUtil } from "../util/UUIDUtil.js";
import { $stillconst } from "./constants.js";
import { StillError } from "./error.js";

const $stillLoadScript = (path, className, base = null) => {

    const prevScript = document.getElementById(`${path}/${className}.js`);
    if (prevScript) return false;

    const script = document.createElement('script');
    script.src = `${base ? base : ''}${path}/${className}.js`;
    script.id = `${path}/${className}.js`;
    //document.head.insertAdjacentElement('beforeend', script);
    return script;

}

const ProduceComponentType = { parentCmp: '', registerCls: false };

export const loadComponentFromPath = (path, className, callback = () => { }) => {

    return new Promise((resolve, reject) => {

        resolve('');
        /* if (
            className in $still.component.list
            || className in $still.context.componentRegistror.componentList
        ) {
            const isRoutable = className in $still.context.componentRegistror.componentList;
            resolve({ imported: true, isRoutable });
            return false;
        }

        try {
            eval(`${className}`);
            resolve([]);
        } catch (error) {

            if (!path) resolve([]);
            else {

                try {

                    console.log("o path", path)
                    console.log("o className ", className)
                    //const script = $stillLoadScript(path, className);

                    // if(!script) {


                    console.log("quem eh ...", script)

                    document.head.insertAdjacentElement('beforeend', script);

                    script.addEventListener('load', () => {
                        if (document.getElementById(script.id)) {
                            setTimeout(() => {
                                callback();
                                resolve([]);
                            });
                        }
                    });
                    // }

                } catch (e) {
                    console.log(e)
                }

            }

        } */

    });

}

const getPjsComponents = () => {
    return document.querySelectorAll('.pjs-app-component');
}

const getPjsComponentsFrom = (cmp) => {
    return cmp.querySelectorAll('.pjs-app-component');
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
    /**
     * @type {Array<string>}
     */
    cpmImports;

    /**
     * @type {HTMLElement}
     */
    cmp;
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
    static routesMap = Router.routeMap;
    static baseUrl = Router.baseUrl;
    static vendorPath = `${Router.baseUrl}@still/vendors`;

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

    renderOnViewFor(placeHolder) {
        if (this.template instanceof Array)
            this.template = this.template.join('');

        let cntr = document.getElementById(placeHolder);
        if (document.getElementById($stillconst.APP_PLACEHOLDER)) {
            cntr = document.getElementById($stillconst.APP_PLACEHOLDER);
        }

        cntr.innerHTML = this.template;
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

    static async produceComponent(params = ProduceComponentType) {

        const { cmp, parentCmp, registerCls } = params;

        let clsName = cmp, cmpPath, template, folderPah, exception,
            isVendorCmp = (cmp || []).at(0) == '@';

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
            let cmpRoute = Router.routeMap[clsName];
            if (!cmpRoute) {
                StillError.handleStComponentNotFound(
                    'TypeError', parentCmp, clsName
                );
                return;
            }

            if (cmpRoute.at(-1) == '/') cmpRoute = cmpRoute.slice(0, -1);
            folderPah = `${Router.baseUrl}${cmpRoute}`;
            cmpPath = `${folderPah}/${clsName}`;
        }


        try {

            const cmpCls = await import(`${cmpPath}.js`);
            //if (registerCls) ComponentRegistror.addClass(cmpCls[clsName]);
            const parent = parentCmp ? { parent: parentCmp } : '';

            newInstance = new cmpCls[clsName](parent);
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

            //newInstance.template = Components.parseTemlpateCssToScope(newInstance.template);
            return {
                newInstance, template: newInstance.template,
                _class: !registerCls ? null : cmpCls[clsName]
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
            $still.context.currentView = StillAppSetup.instance.init();

            /**  @type { ViewComponent } */
            const currentView = $still.context.currentView;

            if (currentView.template.indexOf(this.stillCmpConst) >= 0) {

                $still.context.currentView = await (
                    await Components.produceComponent({ cmp: this.entryComponentName })
                ).newInstance;
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

                this.renderOnViewFor('stillUiPlaceholder');
                setTimeout(() => Components.handleInPlacePartsInit($still.context.currentView, 'fixed-part'));
                //setTimeout(() => Components.handleInPlacePartsInit($still.context.currentView));
                setTimeout(async () => {
                    await $still.context.currentView.stAfterInit();
                    AppTemplate.injectToastContent();
                });

                return;
            }

            if (document.getElementById(this.stillAppConst))
                this.renderOnViewFor(this.stillAppConst);
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
            setTimeout(() => cmp.parseOnChange(), 500);
            this.template = this.getNewParsedComponent(cmp).getTemplate();
            this.renderOnViewFor('stillUiPlaceholder');
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

        return `<st-wramp 
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
        const cmpName = this.componentName;

        Object.assign(cmp, {
            subcribers: [],
            onChange: (callback = () => { }) => {
                cmp[`$still${field}Subscribers`].push(callback);
            }
        });

        return this;
    }

    parseOnChange() {

        /** @type {ViewComponent} */
        const cmp = this.component;

        /* cmp.addAfterInitEvents(() => {

            console.log(`Created a new onchange event listener`);
            cmp.onChangeEventsList.forEach(elm => {

                const evtComposition = elm.evt.split('="')[1].split('(');
                const evt = evtComposition[0];
                const paramVal = evtComposition[1].replace(')','');
                const uiElm = elm._className;
    
                document.querySelector(`.${uiElm}`).addEventListener('change', (e) => {
                    const param = paramVal == '$event' ? e : paramVal;
                    eval(`${cmp.getClassPath()}.${evt}(${param})`);
                    console.log(`Touched on the on change`);
                });
            })
        }) */

        return this;
    }

    /** 
     * @param {ViewComponent} instance 
     */
    parseGetsAndSets(instance = null) {
        /** @type { ViewComponent } */
        const cmp = instance || this.component;
        const cmpName = this.componentName;

        cmp.getProperties().forEach(field => {

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
                    cmp.stOnUpdate();

                    if (cmp[`$still${field}Subscribers`].length > 0) {
                        setTimeout(() => cmp[`$still${field}Subscribers`].forEach(
                            subscriber => subscriber(cmp['$still_' + field])
                        ));
                    }

                    if (cmp.$stillClassLvlSubscribers.length > 0)
                        setTimeout(() => cmp.notifySubscribers(cmp.getStateValues()));

                    if (cmp[field]?.defined || cmp.dynLoopObject) this.propageteChanges(cmp, field);
                });

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

        const cpName = cmp.dynLoopObject
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
            await this.parseAndAssigneValue(elm, field, cmp, container);
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

            if (childCmp.stElement) {

                const childInstance = await (await Components.produceComponent({
                    cmp: childCmp.stElement,
                    parentCmp: cmp, registerCls: true
                }));

                childTmpl = childInstance.template;

                for (const rec of cmp['$still_' + field]) {
                    /** @type { ViewComponent } */
                    const inCmp = new childInstance._class();
                    inCmp.cmpInternalId = 'dynamic-' + inCmp.getUUID();
                    inCmp.template = childTmpl;
                    inCmp.dynLoopObject = true;
                    const fields = Object.entries(childCmp.props);
                    inCmp.stillElement = true;
                    childResult += await this
                        .replaceBoundFieldStElement(inCmp, fields, rec)
                        .getBoundTemplate();
                    //setTimeout(() => inCmp)
                    ComponentRegistror.add(inCmp.cmpInternalId, inCmp);
                    setTimeout(() => {
                        (new Components)
                            .parseGetsAndSets(
                                ComponentRegistror.component(inCmp.cmpInternalId))
                        //.markParsed();
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
        return childCmp.stElement ? childResult : result;
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
    replaceBoundFieldStElement(obj, fields, rec) {
        for (const [f, v] of fields) {
            obj[f] = rec[v.replace('item.', '').trim()];
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

        setTimeout(() => {
            parsing.parseGetsAndSets().markParsed();
        });

        return window[componentName];

    }

    /**  
     * @param {ViewComponent} cmp 
     * @returns {ViewComponent}
     */
    getNewParsedComponent(cmp, cmpName = null) {

        this
            .setComponentAndName(cmp, cmpName || cmp.getName())
            .defineNewInstanceMethod()
            .parseOnChange()
            .parseGetsAndSets()
            .markParsed();

        return cmp;

    }

    static unloadLoadedComponent() {
        return new Promise((resolve) => {

            const { ANY_COMPONT_LOADED } = $stillconst;
            /**
             * @type { Array<HTMLElement|ViewComponent> }
             */
            const cmps = document.querySelectorAll(`.${ANY_COMPONT_LOADED}`);
            for (const cmp of cmps) cmp.style.display = 'none';
            resolve([]);


        })
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

        const cmpName = cmp.constructor.name;

        /** @type { ViewComponent } */
        let newInstance = await (
            await Components.produceComponent({ cmp: cmpName })
        ).newInstance;
        newInstance = (new Components()).getParsedComponent(newInstance);
        newInstance.setUUID(cmp.getUUID());
        newInstance.setRoutableCmp(true);

        let elmRef = cmp.getUUID();
        if (isHome) {
            elmRef = isUnAuthn ? $stillconst.ST_HOME_CMP : $stillconst.ST_HOME_CMP1;
        }

        const container = document.querySelector(`.${elmRef}`);
        container.innerHTML = newInstance.getTemplate();

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
        if (cmp.isPublic) this.registerPublicCmp(newInstance);
        else ComponentRegistror.add(cmpName, newInstance);

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
            Components.handleInPartsImpl(parentCmp?.instance, parentId, cmpParts);
        }

    }

    /**
     * 
     * @param {BaseComponent} parentCmp 
     * @param {*} cmpInternalId 
     * @param {*} cmpParts 
     * @returns 
     */
    static handleInPartsImpl(parentCmp, cmpInternalId, cmpParts) {

        if (!cmpParts) return;

        const placeHolders = cmpInternalId == 'fixed-part'
            ? document.getElementById(`stillUiPlaceholder`).getElementsByTagName('still-placeholder')
            : document.getElementsByClassName(`still-placeholder${parentCmp.getUUID()}`);

        /**
         * Get all <st-element> component to replace with the
         * actual component template
         */
        if (cmpInternalId != 'fixed-part') parentCmp.versionId = UUIDUtil.newId();

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
                instance.onRender();
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
                    for (const [prop, value] of allProps) {

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

                            if (String(value).toLowerCase().indexOf('parent.') == 0) {

                                const parentProp = parentCmp[value.replace('parent.', '')];
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
                    .insertAdjacentHTML('afterbegin', cmp.getBoundTemplate());
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

        //const clsListener = 'stillFlagListener' + Math.random().toString().split('.')[1];
        const clsListener = 'vamo';
        const initialValue = cls[prop];
        //cls[prop] = '';
        console.log(`Class value is: `, cls[prop]);

        /* Object.assign(cls, {
            [`set ${prop}`](value) {
                console.log(`New prop value assigned: `, value, prop);
            },
        }) */

        /* cls.__defineSetter__(prop, (value) => {

            //const elmList = document.getElementsByClassName(clsListener);
            //for (const elm of elmList) {
            //    elm.style.display = value == true ? '' : 'false';
            //}

        }); */

        console.log(cls);

        return clsListener;

    }

    static removeVersionId;
    static setRemovingPartsVersionId(versionId) {
        Components.removeVersionId = versionId;
    }

    static removeOldParts() {

        const versionId = Components.removeVersionId;
        if (versionId) {
            const cmpList = $still.context.componentRegistror.componentList;
            const list = Object
                .entries(cmpList)
                .filter(r => r[1].instance.parentVersionId == versionId)
                .map(r => r[0]);

            list.forEach(
                versionId => delete $still.context.componentRegistror.componentList[versionId]
            );
        }
    }

    static parseProxy(proxy, cmp, parentCmp, annotations) {

        const cmpName = parentCmp.constructor.name;
        if (proxy) {
            parentCmp[proxy] = cmp;
            /* if (!(proxy in parentCmp)) {
                AppTemplate.hideLoading();
                throw new Error(`${cmpName}.${proxy} proxy property is not define`);
            }
            if (annotations?.get(proxy)?.proxy) {

                parentCmp[proxy] = cmp;
            } else {
                AppTemplate.hideLoading();
                throw new Error(`The ${cmpName}.${proxy} proxy is not properly annotated with @Proxy`);
            } */

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
        $still.context.componentRegistror.componentList[cpmName].instance.stAfterInit();
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

    static emitAction(actonName) {
        if (!(actonName in Components.subscriptions)) {
            Components.subscriptions[actonName] = { status: $stillconst.A_STATUS.DONE };
        }

        if (actonName in Components.subscriptions) {
            Components.subscriptions[actonName].actions?.forEach(async action => await action());
            Components.subscriptions[actonName].status = $stillconst.A_STATUS.DONE;
        }
    }

    static clearSubscriptionAction(actonName) {
        delete Components.subscriptions[actonName];
    }

    static parseAnnottationRE() {

        const injectOrProxyRE = /(\@Inject|\@Proxy|\@Prop){0,1}[\n \s \*]{0,}/;
        const commentRE = /(\@type){0,1}[\s \@ \{ \} \: \| \< \> \, A-Za-z0-9]{1,}[\* \s]{1,}\//;
        const newLineRE = /[\n]{0,}/;
        const fieldNameRE = /[\s A-Za-z0-9 \$ \# \(]{1,}/;
        return injectOrProxyRE.source + commentRE.source + newLineRE.source + fieldNameRE.source;

    }

    static processAnnotation(mt, propertyName = null) {

        if (!propertyName) {
            const commentEndPos = mt.indexOf('*/') + 2;
            propertyName = mt.slice(commentEndPos).replace('\n', '').trim();
        }

        let inject, proxy, prop, propParsing, type;
        if (propertyName != '') {

            inject = mt.includes('@Inject');
            proxy = mt.includes('@Proxy');
            prop = mt.includes('@Prop');

            if (mt.includes("@type")) {
                type = mt.split('{')[1].split('}')[0].trim();
                type = type.replace(/\s/g, '');
            }
        }

        propParsing = inject || proxy || prop || $stillconst.PROP_TYPE_IGNORE.includes(type);

        return { type, inject, proxy, prop, propParsing, propertyName };

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
        this.entryComponentPath = stillRoutesMap.viewRoutes.regular[cmp.name];
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
    static getComponentFromRef(name) {
        return ComponentRegistror.getFromRef(name);
    }

    static loadInterceptWorker() {

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(`${Router.baseUrl}@still/component/manager/intercept_worker.js`, { type: 'module' })
                .then(() => console.log('Service Worker Registered'))
                .catch(err => console.log('SW Registration Failed:', err));
        }

    }

}