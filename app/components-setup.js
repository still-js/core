class ComponentSetup extends Components {
    
    entryComponentPath = routesMap.viewRoutes.regular.Home;
    entryComponentName = 'Home';
    logged = localStorage.getItem('logged');

    constructor(){
        super();
    }

    init(){
        return this.logged ? new AppTemplate() : new Login();
    }
}

ComponentSetup.get().loadComponent()