class ComponentSetup extends Components {
    
    static instance = null;

    /**
     * @returns { ComponentSetup }
     */
    static get(){
        if(ComponentSetup.instance == null)
            ComponentSetup.instance = new ComponentSetup();
        return ComponentSetup.instance;
    }

    entryComponentPath = routesMap.viewRoutes.Home;
    entryComponentName = 'Home';
    
    constructor(){
        super();
    }

    init(){
        return new Home();
    }

}

ComponentSetup.get().loadComponent()

//(new ComponentSetup).loadComponent();