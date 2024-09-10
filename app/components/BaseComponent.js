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
    componentClass;
    template;
    cmpProps = [];

    props(props = {}){
        this.cmpProps = props;
        return this;
    }

    render(){
        
        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentClass', 'template', 'cmpProps'];
        const currentClass = this;

        fields.forEach(field => {
            if(!excludingFields.includes(field)){
                this.template = this.template.replace(`@${field}`,currentClass[field]);
            }

            Object.entries(this.cmpProps).forEach(([key, value]) => {
                this.template = this.template.replace(`{{${key}}}`,value);
            });
        });
        document.write(this.template);
    }

    return(){
        
        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentClass', 'template', 'cmpProps'];
        const currentClass = this;

        fields.forEach(field => {
            if(!excludingFields.includes(field)){
                this.template = this.template.replace(`@${field}`,currentClass[field]);
            }

            Object.entries(this.cmpProps).forEach(([key, value]) => {
                this.template = this.template.replace(`{{${key}}}`,value);
            });
        });
        return this.template;
    }

    prepareRender(){
        
        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentClass', 'template', 'cmpProps'];
        const currentClass = this;

        fields.forEach(field => {
            if(!excludingFields.includes(field)){
                this.template = this.template.replace(`@${field}`,currentClass[field]);
            }

            Object.entries(this.cmpProps).forEach(([key, value]) => {
                this.template = this.template.replace(`{{${key}}}`,value);
            });
        });

    }

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
