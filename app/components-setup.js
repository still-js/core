class ComponentSetup extends Components {

    entryComponentPath = routesMap.viewRoutes.regular.Home;
    entryComponentName = 'Home';
    servicePath = '/services';
    //

    constructor() {
        super();
        StillHTTPClient.setBaseUrl('http://localhost:3000');
    }

    init() {
        const logged = localStorage.getItem('logged');
        return logged ? new AppTemplate() : new Login();
    }
}

ComponentSetup.get().loadComponent()