const loadComponentFromPath = (path, className, callback = () => {}) => {
    
    return new Promise((resolve, reject) => {

        console.log(`Loaded component: `,context.componentRegistror.componentList);
        console.log(`Loading component: `,className);
        console.log(`Does it exists: `,(className in context.componentRegistror.componentList));

        if(className in context.componentRegistror.componentList){
            resolve({ imported: true });
            return false;
        }

        const script = document.createElement('script');
        script.src = `${path}/${className}.js`;
        console.log(`COMPONENT NAME IS: ${className} -> ${document.head}`);
        document.head.appendChild(script);

        const lazyLoadCompTimer = setInterval(() => {
            try{
                /* const componentInstance = eval(`new ${className}({ 
                    componentName: '${className}', path: '${path}' 
                })`); */
                /* if(componentInstance.settings){
                    resolve(componentInstance.settings.imports);
                }else{
                    resolve([]);
                } */
                resolve([]);
                clearInterval(lazyLoadCompTimer);
            }catch(err){
                console.error(`Error on lazy loading component: ${className} `, err);
            }
        }, 500);
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
            console.log(`TAG NAME IS: `,cmpName);
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

    loadComponent(){
        loadComponentFromPath(
            this.entryComponentPath,
            this.entryComponentName
        ).then(() => {
            const init = this.init();
            this.template = init.template;
            this.renderOnViewFor('appPlaceholder');
        });
        //console.log(`DDDD: `,init.constructor);
    }

    /* loadComponents(){
        const pjsComponents = getPjsComponents();

        pjsComponents.forEach(async cmp => {
            const { cpmImports, cmp: cmp1 } = await this.loadComponent(cmp);

            if(cpmImports.length > 0){

                getPjsComponentsFrom(cmp1).forEach(async cmp1 => {
                    console.log(`FOUND LEVEL 2 Childrens `,cmp1.tagName);
                    const { 
                        cpmImports: cpmImports2, cmp: cmp2 
                    } = await this.loadComponent(cmp1);
                });

            }
        });

    } */

}

//(new Components).loadComponents();