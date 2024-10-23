const $stillLoadScript = (path, className) => {

    const script = document.createElement('script');
    script.src = `${path}/${className}.js`;
    script.id = script.src;
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
                        setTimeout(() => resolve([]));
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
                this.renderOnViewFor('stillUiPlaceholder');
                return;
            }

            if (document.getElementById(this.stillAppConst))
                this.renderOnViewFor(this.stillAppConst);
            else {
                new Components().renderPublicComponent($still.context.currentView);
            }
        });
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

            return {
                value: cmp['$still_' + field],
                onChange: (callback = function () { }) => {
                    cmp[`$still${field}Subscribers`].push(callback);
                },
                defined: true,
                firstPropag: false
            };
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
                cmp[field] = cmp[field].value;
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
                $still.context.componentRegistror.componentList[instance.cmpInternalId] = { instance };

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

        setTimeout(() => {
            newInstance.parseOnChange();
        }, 500);

        await newInstance.onRender();
        newInstance.stAfterInit();

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
    static handleInPlaceParts(parentCmp) {

        /** @type { Array<ComponentPart> } */
        const cmpParts = parentCmp.$stillExternComponentParts;
        const placeHolders = document.getElementsByTagName('still-placeholder');
        /**
         * Get all <st-element> component to replace with the
         * actual component template
         */
        for (let idx = 0; idx < cmpParts.length; idx++) {

            const { proxy, component: instance, props } = cmpParts[idx];
            let cmpName;
            if (instance) {
                cmpName = 'constructor' in instance ? instance.constructor.name : null;
            }

            const cmp = instance?.stillParsedState
                ? instance
                : (new Components).getNewParsedComponent(instance, cmpName);
            parentCmp[proxy] = cmp;
            const allProps = Object.entries(props);
            for (const [prop, value] of allProps) {

                if (prop.charAt(0) == '(' && prop.at(-1) == ")") {
                    const method = prop.replace('(', '').replace(')', '');
                    const childValue = cmp[method];
                    cmp[method] = function (...param) {
                        return parentCmp[value.split('(')[0]](...param);
                    }
                    continue;
                }

                if (String(value).toLowerCase().indexOf('parent.') == 0) {
                    const parentProp = parentCmp[value.replace('parent.', '')];
                    if (parentProp.onlyPropSignature) {
                        cmp[prop] = parentProp.value;
                    } else {
                        cmp[prop] = parentProp?.value || parentProp;
                    }
                } else
                    cmp[prop] = value;
            }
            /**
             * replaces the actual template in the 
             * <st-element> component placeholder
             */
            placeHolders[idx]
                .insertAdjacentHTML('afterbegin', cmp.getBoundTemplate());
            //cmpList[idx].insertAdjacentHTML('afterbegin', cmp.getBoundTemplate());
            setTimeout(async () => {
                /**
                 * Runs the load method which is supposed
                 * to implement what should be run for the
                 * component to be displayed accordingly in
                 * the User interface
                 */
                await cmp.load();
            });
        }
    }

}
