class SettingType {
    componentName = undefined;
    path = undefined;
    imports = []
}

class BaseComponent {

    /**
     * @type {SettingType}
     */
    settings = null;
    componentClass

    /**
     * 
     * @param {SettingType} settings 
     */
    setup(settings){
       this.componentClass = this.constructor.name;
       this.settings = settings;
       context.componentRegistror.export({...settings, instance: this });
    }

    setPath(path){
        this.settings.path = path;
        return this;
    }

    setComponentName(name){
        this.settings.componentName = name;
        return this;
    }

    register(){
        context.componentRegistror.export(settings);
    }

}
