class ComponentSetup extends Components {

    entryComponentPath = routesMap.viewRoutes.regular.Home;
    entryComponentName = 'Home';
    servicePath = '/services';
    //

    constructor() {
        super();
        StillHTTPClient.setBaseUrl('http://5.252.53.178:3000');
    }

    init() {
        const logged = localStorage.getItem('logged');
        return logged ? new AppTemplate() : new Login();
    }
}

ComponentSetup.get().loadComponent()