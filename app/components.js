const loadComponentFromPath = (path, className, callback = () => {}) => {

    const script = document.createElement('script');
    //const className = String(componentName).charAt(0).toUpperCase()+''+String(componentName).slice(1).toLowerCase();
    console.log(`COMPONENT NAME IS: ${className}`);
    script.src = `${path}/${className}.js`;
    document.body.appendChild(script);
    
    return new Promise((resolve) => {
        const lazyLoadCompTimer = setInterval(() => {
            try{
                /**
                 * @type { BaseComponent }
                 */
                const componentInstance = eval(`new ${className}({ 
                    componentName: '${className}', path: '${path}' 
                })`);
                if(componentInstance.settings){
                    resolve(componentInstance.settings.imports);
                }else{
                    resolve([]);
                }
                clearInterval(lazyLoadCompTimer);
            }catch(err){
                console.error(`Error on lazy loading: `, className, err);
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
     * 
     * @param {HTMLElement} cmp 
     * @returns { LoadedComponent }
     */
    async loadComponent(cmp){
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

    loadComponents(){
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

    }

}

//(new Components).loadComponents();