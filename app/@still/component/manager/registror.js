class ComponentRegistror {

    componentList = {};
    static registror = null;

    static get(){

        if(ComponentRegistror.registror == null){
            ComponentRegistror.registror = new ComponentRegistror();
        }
        return ComponentRegistror.registror;

    }

    /**
     * 
     * @param {SettingType} component 
     */
    export({ componentName: name, path, instance }){
        if(!(name in this.componentList))
            this.componentList[instance.componentName] = { path, instance };

    }

    /**
     * 
     * @param {ViewComponent} cmp 
     */
    expose(cmp){
        
        const componentName = cmp.getName().replace('C','');
        window[componentName] = cmp;
        Object.assign(window[componentName], {
            new: (params) => {

                const cmpName = cmp.getName();
                if(params instanceof Object)
                    return eval(`new ${cmpName}({...${JSON.stringify(params)}})`);

                if(params instanceof Array)
                    return eval(`new ${cmpName}([...${JSON.stringify(params)}])`);
                
                return eval(`new ${cmpName}('${params}')`);
            }
        });
        return window[componentName];

    }

    getComponent(name){
        return this.componentList[name].instance;
    }
}

const $still = {
    context: {
        componentRegistror: ComponentRegistror.get(),
        componentMap: routesMap.viewRoutes,
        currentView: null,
    },
    component: {
        /** @param { ViewComponent } cmp */
        expose: (cmp) => {
            return ComponentRegistror.get().expose(cmp)
        }
    },
    HTTPClient: new StillHTTPClient()
}
