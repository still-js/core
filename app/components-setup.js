class ComponentSetup extends Components {
    
    static instance = null;
    isAuthenticated = false;

    /**
     * @returns { ComponentSetup }
     */
    static get(){
        if(ComponentSetup.instance == null)
            ComponentSetup.instance = new ComponentSetup();
        return ComponentSetup.instance;
    }

    //entryComponentPath = routesMap.viewRoutes.regular.Home;
    // entryComponentName = 'Home';
    entryComponentPath = this.isAuthenticated ? routesMap.viewRoutes.regular.LayoutBase : routesMap.viewRoutes.regular.Login;
    entryComponentName = this.isAuthenticated ? 'LayoutBase' : 'Login';
    
    constructor(){
        super();
    }

    init(){
        return this.isAuthenticated ? new LayoutBase() : new Login()
    }

}

ComponentSetup.get().loadComponent()

//(new ComponentSetup).loadComponent();