const loadComponentFromPath = (path, componentName, callback = () => {}) => {
    const script = document.createElement('script');
    script.src = `${path}/${componentName}.js`;
    document.body.appendChild(script);
    setTimeout(() => {
        callback();
    }, 500);
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

    componentImport = {
        'menu': 'components/main-menu',
    };

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

        const components = Object.entries(this.componentImport);
        components.forEach(async ([htmlElm, path]) => {

            await this.loadComponent(path, htmlElm);
        });

    }

}

(new Components).loadComponents();