class ComponentSetup extends Components {

    entryComponentPath = routesMap.viewRoutes.regular.Home;
    entryComponentName = 'Home';
    servicePath = '/services'

    constructor() {
        super();
    }

    init() {
        const logged = localStorage.getItem('logged');
        return logged ? new AppTemplate() : new Login();
    }
}

ComponentSetup.get().loadComponent()