class SettingType {
    componentName = undefined;
    path = undefined;
    imports = [];
    use = [];
    dependsOf = [];
    includs = [];
    scripts = [];
}

class BaseComponent {


    /**
     * @type {SettingType}
     */
    settings = null;
    componentName;
    template;
    cmpProps = [];

    props(props = {}){
        this.cmpProps = props;
        return this;
    }

    render(){
        
        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentName', 'template', 'cmpProps'];
        const currentClass = this;

        fields.forEach(field => {
            if(!excludingFields.includes(field)){
                this.template = this.template.replace(`@${field}`,currentClass[field]);
            }
        });
        
        Object.entries(this.cmpProps).forEach(([key, value]) => {
            this.template = this.template.replace(`{{${key}}}`,value);
        });
        document.write(this.template);
    }

    getTemplate(){
        
        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentName', 'template', 'cmpProps'];
        const currentClass = this;

        fields.forEach(field => {
            if(!excludingFields.includes(field)){
                this.template = this.template.replace(`@${field}`,currentClass[field]);
            }
        });
        
        Object.entries(this.cmpProps).forEach(([key, value]) => {
            this.template = this.template.replace(`{{${key}}}`,value);
        });
        return this.template;
    }

    prepareRender(){
        
        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentName', 'template', 'cmpProps'];
        const currentClass = this;

        fields.forEach(field => {
            if(!excludingFields.includes(field)){
                this.template = this.template.replace(`@${field}`,currentClass[field]);
            }
        });
        
        Object.entries(this.cmpProps).forEach(([key, value]) => {
            this.template = this.template.replace(`{{${key}}}`,value);
        });

    }

    /**
     * 
     * @param {SettingType} settings 
     */
    setup(settings){
       this.componentName = this.constructor.name;
       this.settings = settings;

       new Promise((resolve) => {

        setTimeout(() => {
            if(settings.includs){
                settings.includs.forEach(cmp => new cmp().render());
                resolve(null);
            }else{
                resolve(null);
            }
        });
        
       }).then(() => {

        //setTimeout(() => {
            if(settings.scripts){
                settings.scripts.forEach(this.importScript);
            }
        //});

       });

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

    importScript(scriptPath){
        const script = document.createElement('script');
        script.src = scriptPath;
        document.head.appendChild(script);
    }

}
