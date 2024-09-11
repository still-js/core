class ComponentRegistror {

    componentList = {};

    /**
     * 
     * @param {SettingType} component 
     */
    export({ componentName: name, path, instance }){
        if(!(name in this.componentList))
            this.componentList[instance.componentClass] = { path, instance };

    }

    getComponent(name){
        return this.componentList[name].instance;
    }
}

const context = {
    componentRegistror: new ComponentRegistror(),
    componentMap: UIComponents.map,
}
