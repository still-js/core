const $stillLoadScript = (path, className) => {

    const prevScript = document.getElementById(`${path}/${className}.js`);
    if (prevScript) return false;

    const script = document.createElement('script');
    script.src = `${path}/${className}.js`;
    script.id = `${path}/${className}.js`;
    //document.head.insertAdjacentElement('beforeend', script);
    return script;

}

const loadComponentFromPath = (path, className, callback = () => { }) => {

    return new Promise((resolve, reject) => {

        if (
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
                const script = $stillLoadScript(path, className);
                document.head.insertAdjacentElement('beforeend', script);

                script.addEventListener('load', () => {
                    if (document.getElementById(script.id)) {
                        setTimeout(() => {
                            callback();
                            resolve([]);
                        });
                    }
                });
            }

        }

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

class Components {

    /**
     * @returns {{template, }}
     */
    init() { }
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

    /**
     * @returns { ComponentSetup }
     */
    static get() {
        if (ComponentSetup.instance == null)
            ComponentSetup.instance = new ComponentSetup();
        return ComponentSetup.instance;
    }

    getTopLevelCmpId() {
        const { TOP_LEVEL_CMP, ANY_COMPONT_LOADED } = $stillconst;
        return `${TOP_LEVEL_CMP}`;
    }

    renderOnViewFor(placeHolder) {
        if (this.template instanceof Array)
            this.template = this.template.join('');

        document
            .getElementById(placeHolder)
            .innerHTML = this.template;
    }

    renderOUtsideOnViewFor(placeHolder, template) {
        if (this.template instanceof Array)
            this.template = this.template.join('');

        document
            .getElementById(placeHolder)
            .innerHTML = `<div>${template}<div>`;
    }

    static newSetup() {
        return new ComponentSetup();
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

    async loadComponent() {
        loadComponentFromPath(
            this.entryComponentPath,
            this.entryComponentName
        ).then(async () => {
            $still.context.currentView = this.init();

            /**  @type { ViewComponent } */
            const currentView = $still.context.currentView;

            if (currentView.template.indexOf(this.stillCmpConst) >= 0) {

                $still.context.currentView = eval(`new ${this.entryComponentName}()`);
                this.template = this.getCurrentCmpTemplate($still.context.currentView);
                this.template = currentView.template.replace(
                    this.stillCmpConst, `<div id="${this.stillAppConst}">${this.template}</div>`
                );

                this.template = (new BaseComponent).parseStSideComponent(
                    this.template, 'fixed-part', $still.context.currentView.getUUID()
                );

                this.renderOnViewFor('stillUiPlaceholder');
                setTimeout(() => Components.handleInPlaceParts($still.context.currentView, 'fixed-part'));
                setTimeout(() => Components.handleInPlaceParts($still.context.currentView));
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
            window['Public_' + cmp.constructor.name] = cmp;
            this.template = this.getNewParsedComponent(cmp).getTemplate();
            this.renderOnViewFor('stillUiPlaceholder');
        } else {
            // here...
            //document.write($stillconst.MSG.PRIVATE_CMP);
            //cmp.hideLoading();
        }

    }

    getInitialPrivateTemplate(cmpName) {

        $still.context.currentView = eval(`new ${cmpName}()`);
        let template = this.getCurrentCmpTemplate($still.context.currentView);
        template = currentView.template.replace(
            this.stillCmpConst, `<div id="${this.stillAppConst}">${template}</div>`
        );

        return template;

    }

    getCurrentCmpTemplate(cmp) {
        const init = cmp;
        init.setUUID(this.getTopLevelCmpId());
        const loadCmpClass = $stillconst.ANY_COMPONT_LOADED;
        return (init.template)
            .replace('class="', `class="${init.getUUID()} ${loadCmpClass} `);
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
     * @param {ViewComponent} cmp 
     */
    parseGetsAndSets() {
        /** @type { ViewComponent } */
        const cmp = this.component;
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

                Object.assign(cmp, { ['$still_' + field]: cmp[field] || '' });
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

                    if (cmp.$stillClassLvlSubscribers.length > 0) {
                        setTimeout(() => cmp.notifySubscribers(cmp.getStateValues()));
                    }

                    if (cmp[field]?.defined) this.propageteChanges(cmp, field);
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

    propageteChanges(cmp, field) {

        const cpName = cmp.getProperInstanceName();
        const cssRef = `.listenChangeOn-${cpName}-${field}`;
        const subscribers = document.querySelectorAll(cssRef);
        const cssRefCombo = `.listenChangeOn-${cpName}-${field}-combobox`;
        const subscribersCombo = document.querySelectorAll(cssRefCombo);

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

        if (elm.tagName == 'TBODY')
            return this.propagetToTable(elm, field, cmp);

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

        const container = document.createElement('optgroup');
        this.parseAndAssigneValue(elm, field, cmp, container);
        elm.insertAdjacentElement('beforeend', container);

    }

    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    propagetToTable(elm, field, cmp) {

        let container = document.createElement(elm.tagName);
        container = this.parseAndAssigneValue(elm, field, cmp, container);
        elm.parentNode.insertAdjacentElement('beforeend', container);

    }
    /**
     * @param { HTMLElement } elm
     * @param { ViewComponent } cmp
     */
    parseAndAssigneValue(elm, field, cmp, container) {

        let tmpltContent;
        container.className = $stillconst.SUBSCRIBE_LOADED;

        if (elm.tagName == 'SELECT') {
            const childs = elm.querySelectorAll('option');

            if (childs[0].outerHTML.toString().indexOf('value="{item.') > 0) {
                tmpltContent = childs[0].outerHTML.toString();
            } else if (childs[1].outerHTML.toString().indexOf('value="{item.') > 0) {
                tmpltContent = childs[1].outerHTML.toString();
            }

        } else {
            tmpltContent = elm.firstElementChild.outerHTML.toString();
        }

        let template = tmpltContent.replace('display:none;', '');
        let result = '';

        if (cmp['$still_' + field] instanceof Array) {
            cmp['$still_' + field].forEach((rec) => {
                let parsingTemplate = template;
                let fields = Object.entries(rec);
                result += this.replaceBoundField(parsingTemplate, fields);
            });
        }


        /** Get the previous table body */

        const oldContainer = elm.parentNode.querySelector(`.${$stillconst.SUBSCRIBE_LOADED}`);
        /** Check if it exists previous table body and remove it */
        if (oldContainer) elm.parentNode.removeChild(oldContainer);

        container.innerHTML = result;
        return container;

    }

    replaceBoundField(parsingTemplate, fields) {
        for (const [f, v] of fields) {
            parsingTemplate = parsingTemplate.replaceAll(`{item.${f}}`, v);
        }
        return parsingTemplate;
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
                ComponentRegistror.register(
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

        const componentName = cmp.getName().replace('C', '');
        window[componentName] = cmp;
        const parsing = this
            .setComponentAndName(window[componentName], cmp.getName())
            .defineNewInstanceMethod();

        setTimeout(() => {
            parsing.parseOnChange().parseGetsAndSets().markParsed();
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

        /** @type { ViewComponent } */
        let newInstance = eval(`new ${cmp.constructor.name}()`);
        newInstance = (new Components()).getParsedComponent(newInstance);
        newInstance.setUUID(cmp.getUUID());
        newInstance.setRoutableCmp(true);

        const elmRef = isHome ? $stillconst.TOP_LEVEL_CMP : cmp.getUUID();
        const container = document.querySelector(`.${elmRef}`);
        container.innerHTML = newInstance.getTemplate();

        container.style.display = 'contents';

        setTimeout(async () => {
            newInstance.parseOnChange();
            await newInstance.onRender();
            await newInstance.stAfterInit();
        }, 200);

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
        const cmpParts = Components.componentPartsMap[cmpInternalId || parentCmp.cmpInternalId];

        if (!cmpParts) return;

        const placeHolders = cmpInternalId == 'fixed-part'
            ? document.getElementById(`stillUiPlaceholder`).getElementsByTagName('still-placeholder')
            : document.getElementsByClassName(`still-placeholder${parentCmp.getUUID()}`);

        /**
         * Get all <st-element> component to replace with the
         * actual component template
         */
        parentCmp.versionId = UUIDUtil.newId();
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

            const { proxy, component: instance, props, annotations } = cmpParts[idx];
            let cmpName;
            if (instance) {
                cmpName = 'constructor' in instance ? instance.constructor.name : null;
            }

            /**
             * TOUCH TO REINSTANTIATE
             */
            const cmp = (new Components).getNewParsedComponent(instance, cmpName);
            cmp.parentVersionId = cmpVersionId;
            Components.parseProxy(proxy, cmp, parentCmp, annotations);

            cmp.setParentComponent(parentCmp);
            const allProps = Object.entries(props);
            for (const [prop, value] of allProps) {

                //Proxy gets ignored becuase it was assigned above and it should be the child class
                if (prop != 'proxy') {
                    if (prop.charAt(0) == '(' && prop.at(-1) == ")") {
                        const method = prop.replace('(', '').replace(')', '');
                        cmp[method] = function (...param) {
                            return parentCmp[value.split('(')[0]](...param);
                        }
                        continue;
                    }

                    if (String(value).toLowerCase().indexOf('parent.') == 0) {
                        const parentProp = parentCmp[value.replace('parent.', '')];
                        if (parentProp?.onlyPropSignature) {
                            cmp[prop] = parentProp.value;
                        } else {
                            cmp[prop] = parentProp?.value || parentProp;
                        }
                    } else
                        cmp[prop] = value;
                }
                /**
                 * Replace the parent component on the registror
                 * So that it get's updated with the new and fresh
                 * data, properties and proxies
                 */
                ComponentRegistror.register(
                    parentCmp.constructor.name,
                    parentCmp
                );
            }
            /**
             * replaces the actual template in the 
             * <st-element> component placeholder
             */
            placeHolders[idx]
                .insertAdjacentHTML('afterbegin', cmp.getBoundTemplate());
            setTimeout(async () => {
                /**
                 * Runs the load method which is supposed
                 * to implement what should be run for the
                 * component to be displayed accordingly in
                 * the User interface
                 */
                await cmp.load();
                setTimeout(async () => await cmp.stAfterInit(), 100);
                Components.handleMarkedToRemoveParts();
            });
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
            if (!(proxy in parentCmp)) {
                AppTemplate.hideLoading();
                throw new Error(`${cmpName}.${proxy} proxy property is not define`);
            }
            if (annotations?.get(proxy)?.proxy) {

                parentCmp[proxy] = cmp;
            } else {
                AppTemplate.hideLoading();
                throw new Error(`The ${cmpName}.${proxy} proxy is not properly annotated with @Proxy`);
            }

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

        Components.subscriptions[actonName].actions.forEach(action => action());
        Components.subscriptions[actonName].status = $stillconst.A_STATUS.DONE;
    }

    static clearSubscriptionAction(actonName) {
        delete Components.subscriptions[actonName];
    }

}
