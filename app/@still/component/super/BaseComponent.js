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


    /**
     * signature method only
     * @param {object|any} 
     * @returns { ViewComponent | BaseComponent } 
     */
    new(params){}

    props(props = {}){
        this.cmpProps = props;
        return this;
    }

    getName(){
        return this.constructor.name;
    }

    getBoundState(){
        
        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentName', 'template', 'cmpProps'];
        const currentClass = this;
        let tamplateWithState = this.template;

        /**
         * Inject/Bind the component state/properties to the
         * referenced place
         */
        fields.forEach(field => {
            if(!excludingFields.includes(field)){
                tamplateWithState = tamplateWithState.replace(`@${field}`,currentClass[field]);
            }
        });
        return tamplateWithState;
    }

    getBoundProps(template){
        /**
         * Inject/Bind the component props/params to the
         * referenced place
         */
        Object.entries(this.cmpProps).forEach(([key, value]) => {
            template = template.replace(`{{${key}}}`,value);
        });

        return template;
    }

    getBoundClick(template){
        /**
         * Bind (click) event to the UI
         */
        const classInstance = `$still.context.componentRegistror.getComponent('${this.constructor.name}')`;
        template = template.replaceAll(
            /\(click\)\=\"/gi,
            `onclick="${classInstance}.`
        );

        return template;
    }

    /**
     * Parse the template, inject the components 'props' and 'state' if defined in the component
     * 
     */
    getBoundTemplate(){

        /**
         * Bind the component state and return it (template)
         * NOTE: Needs to be alwas the first to be called
         */
        let template = this.getBoundState();

        /** Bind the props to the template and return */
        template = this.getBoundProps(template);
        /** Bind the click to the template and return */
        template = this.getBoundClick(template);

        return template;
    }

    render(){
        document.write(this.getBoundTemplate());
    }

    getTemplate(){
        return this.getBoundTemplate();
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
                settings.includs.forEach(cmp => cmp.render());
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

       $still.context.componentRegistror.export({...settings, instance: this });
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
        $still.context.componentRegistror.export(settings);
    }

    importScript(scriptPath){
        const script = document.createElement('script');
        script.async = true;
        script.src = scriptPath;
        document.head.appendChild(script);
    }

}
