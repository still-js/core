class ComponentSetup extends Components {
    
    entryComponentPath = UIComponents.map.home;
    entryComponentName = 'Home';
    
    constructor(){
        super();
    }

    init(){
        return new Home();
    }

}

(new ComponentSetup).loadComponent();