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
    HTTPClient: new StillHTTPClient()
}
