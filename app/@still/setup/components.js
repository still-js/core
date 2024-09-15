const loadComponentFromPath = (path, className, callback = () => {}) => {
    
    return new Promise((resolve, reject) => {

        if(
            className in $still.component.list
            || className in $still.context.componentRegistror.componentList
        ){
            const isRoutable = className in $still.context.componentRegistror.componentList;
            resolve({ imported: true, isRoutable });
            return false;
        }

        try {
            eval(`${className}`);
            resolve([]);
        } catch (error) {
            
            console.log(`Loading the component for the first time: `,className);

            const script = document.createElement('script');
            script.src = `${path}/${className}.js`;
            script.id = new Date().getTime()+''+Math.random();
            document.head.insertAdjacentElement('beforeend',script);
    
            const lazyLoadCompTimer = setInterval(() => {
                try{
                    script.addEventListener('load', () => {
                        if(document.getElementById(script.id)){
                            setTimeout(() => resolve([]));
                            clearInterval(lazyLoadCompTimer);
                        }
                    });
                }catch(err){
                    console.error(`Error on lazy loading component: ${className} `, err);
                }
            }, 500);

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
    try{
        return (await fetch(`${path}/template.html`)).text();
    }catch(err){
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
    init(){}
    template;
    entryComponentPath;
    entryComponentName;
    /** @type { ViewComponent } */
    component;
    componentName;

    getTopLevelCmpId(){
        const { TOP_LEVEL_CMP, ANY_COMPONT_LOADED } = $stillconst;
        return `${TOP_LEVEL_CMP}`;
    }

    renderOnViewFor(placeHolder){
        if(this.template instanceof Array)
            this.template = this.template.join('');
        
        document
            .getElementById(placeHolder)
            .innerHTML = this.template;
    }

    /**
     * 
     * @param {HTMLElement} cmp 
     * @returns { LoadedComponent }
     */
    async loadComponentDEPRECATE(cmp){
        try {
            
            const { tagName } = cmp;
            const htmlElm = String(tagName).toLowerCase();
            const { path, name: cmpName } = context.componentMap[htmlElm];
            const content = await loadTemplate(path, cmpName);
            if(cmp){
                if(!content){
                    throw new Error(`Error loading visual component part for ${tagName}`);
                }
                cmp.innerHTML = content;
            }
            
            const cpmImports = await loadComponentFromPath(path,cmpName);
            return {cpmImports, cmp};
    
        } catch (error) {
            console.error(`Error on tgemplate load: `,error);
        }
    }

    async loadComponent(){
        loadComponentFromPath(
            this.entryComponentPath,
            this.entryComponentName
        ).then(async () => {
            $still.context.currentView = this.init();
            /**
             * @type { ViewComponent }
             */
            const init = $still.context.currentView;
            init.setUUID(this.getTopLevelCmpId());
            const loadCmpClass = $stillconst.ANY_COMPONT_LOADED;
            this.template = init.template.replace('class="',`class="${init.getUUID()} ${loadCmpClass} `);
            this.renderOnViewFor('appPlaceholder');
        });
    }

    setComponentAndName(cmp, cmpName){
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
                value: cmp['$still_'+field],
                onChange: (callback = function(){}) => {
                    cmp[`$still${field}Subscribers`].push(callback);
                }
            };
        });

    }

    /** 
     * @param {ViewComponent} cmp 
     */
    parseClassObserver(){

        const cmp = this.component;
        const cmpName = this.componentName;

        Object.assign(cmp, {
            subcribers: [],
            onChange: (callback = () => {}) => {
                cmp[`$still${field}Subscribers`].push(callback);
            }
        });

        return this;
    }

    /** 
     * @param {ViewComponent} cmp 
     */
    parseGetsAndSets(){
        /** @type { ViewComponent } */
        const cmp = this.component;
        const cmpName = this.componentName;

        cmp.getProperties().forEach(field => {
            
            Object.assign(cmp, { ['$still_'+field]: cmp[field] });
            Object.assign(cmp, { [`$still${field}Subscribers`]: [] });
            this.defineSetter(cmp, field);

            cmp.__defineSetter__(field, (newValue) => {
                
                cmp.__defineGetter__(field, () => newValue);
                cmp['$still_'+field] = newValue;
                this.defineSetter(cmp, field);
                cmp.stOnUpdate();

                if(cmp[`$still${field}Subscribers`].length > 0){
                    setTimeout(() => cmp[`$still${field}Subscribers`].forEach(
                        subscriber => subscriber(cmp['$still_'+field])
                    ));
                }

                if(cmp.$stillClassLvlSubscribers.length > 0){
                    setTimeout(() => {
                        cmp.notifySubscribers(cmp.getStateValues());
                    });
                }

            });
        });
        return this;
    }

    /** @param {ViewComponent} cmp */
    defineNewInstanceMethod(){

        const cmp = this.component;
        const cmpName = this.componentName;
        Object.assign(cmp, {
            new: (params) => {

                /**  @type {ViewComponent} */
                let instance;
                if(params instanceof Object)
                    instance = this.getNewParsedComponent(eval(`new ${cmpName}({...${JSON.stringify(params)}})`));

                if(params instanceof Array)
                    instance = this.getNewParsedComponent(eval(`new ${cmpName}([...${JSON.stringify(params)}])`));
                
                instance.cmpInternalId = `dynamic-${instance.getUUID()}${cmpName}`;
                /** TODO: Replace the bellow with the export under componentRegistror */
                $still.context.componentRegistror.componentList[instance.cmpInternalId] = { instance };
                
                if(instance) return instance;
                
                return eval(`new ${cmpName}('${params}')`);
            }
        });
        return this;
    }
    
    /**  @param {ViewComponent} cmp */
    getParsedComponent(cmp){

        const componentName = cmp.getName().replace('C','');
        window[componentName] = cmp;
        const parsing = this
        .setComponentAndName(window[componentName], cmp.getName())
        .defineNewInstanceMethod();

        setTimeout(() => {
            parsing.parseGetsAndSets();
        });
        
        return window[componentName];

    }
    
    /**  
     * @param {ViewComponent} cmp 
     * @returns {ViewComponent}
     */
    getNewParsedComponent(cmp){

        this
        .setComponentAndName(cmp, cmp.getName())
        .defineNewInstanceMethod()
        .parseGetsAndSets();
        
        return cmp;

    }

    static unloadLoadedComponent(){
        return new Promise((resolve) => {

            const { ANY_COMPONT_LOADED } = $stillconst;
            /**
             * @type { Array<HTMLElement|ViewComponent> }
             */
            const cmps = document.querySelectorAll(`.${ANY_COMPONT_LOADED}`);
            for(const cmp of cmps) cmp.style.display = 'none';
            resolve([]);

        })
    }

    static reloadedComponent(elmRef){
        document.querySelector(`.${elmRef}`).style.display = 'block';
    }

}
