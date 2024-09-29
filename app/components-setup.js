class ComponentSetup extends Components {
    
    entryComponentPath = routesMap.viewRoutes.regular.Home;
    entryComponentName = 'Home';
    
    constructor(){
        super();
    }

    init(){
        return new Home();
    }
}

ComponentSetup.get().loadComponent()