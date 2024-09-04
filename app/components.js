const loadComponentFromPath = (path, componentName, callback = () => {}) => {

    const script = document.createElement('script');
    const className = String(componentName).charAt(0).toUpperCase()+''+String(componentName).slice(1);
    script.src = `${path}/${className}.js`;
    document.body.appendChild(script);
    
    const lazyLoadCompTimer = setInterval(() => {
        try{
            eval(`new ${className}({ componentName: '${className}', path: '${path}' })`);
            clearInterval(lazyLoadCompTimer);
        }catch(err){
            console.error(`Error on lazy loading: `, className);
        }
    }, 500);

}

const loadBaseComponent = () => {
    const script = document.createElement('script');
    script.src = `components/BaseComponent.js`;
    document.body.appendChild(script);
}

const loadTemplate = async (path, placeHolder) => {
    try{
        return (await fetch(`${path}/template.html`)).text();
    }catch(err){
        console.error(`Error loading visual component part for ${placeHolder}`);
        return false;
    }
}

class Components {

    async loadComponent(path, placeHolder){
        try {
            
            const componentName = placeHolder; 
            const component = document.getElementById(`${placeHolder}-component`);
            const content = await loadTemplate(path, placeHolder);
            if(component){
                if(!content){
                    throw new Error(`Error loading visual component part for ${placeHolder}`);
                }
                component.innerHTML = content;
            }
            loadComponentFromPath(path,componentName);
    
        } catch (error) {
            console.error(`Error on tgemplate load: `,error);            
        }
    }

    loadComponents(){

        const components = Object.entries(context.componentMap);
        components.forEach(async ([htmlElm, path]) => {
            console.log(`Componente Loaing: `, {htmlElm, path});
            await this.loadComponent(path, htmlElm);
        });

    }

}

(new Components).loadComponents();