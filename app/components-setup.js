class ComponentSetup extends Components {
    
    entryComponentPath = routesMap.viewRoutes.Home;
    entryComponentName = 'Home';
    
    constructor(){
        super();
    }

    init(){
        return new Home();
    }

}

(new ComponentSetup).loadComponent();