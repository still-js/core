class SettingType {
    componentName = undefined;
    path = undefined;
    imports = [];
    use = [];
    dependsOf = [];
    includs = [];
    scripts = [];
}

class StEvent {
    value;
    onChange(callback){}
    subscribers

    constructor(value){
        this.value = value;
    }
}

class BaseComponent {


    /**
     * @type {SettingType}
     */
    settings = null;
    componentName;
    template;
    cmpProps = [];
    cmpInternalId;


    /**
     * signature method only
     * @param {object|any} 
     * @returns { ViewComponent | BaseComponent } 
     */
    new(params){}

    onRender(){}

    stOnUpdate(){}

    props(props = {}){
        this.cmpProps = props;
        return this;
    }

    getName(){
        return this.constructor.name;
    }

    getInstanceName(){
        return this.constructor.name.replace('C','');
    }

    getProperties(){

        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = ['settings', 'componentName', 'template', 'cmpProps','htmlRefId','new','cmpInternalId'];
        return fields.filter(field => !excludingFields.includes(field));

    }
    
    getBoundState(){
        
        const fields = this.getProperties();
        const currentClass = this;

        if(this.template instanceof Array)
            this.template = this.template.join('');


        let tamplateWithState = this.template;

        /**
         * Inject/Bind the component state/properties to the
         * referenced place
         */
        fields.forEach(field => {
            tamplateWithState = tamplateWithState.replace(`@${field}`,currentClass[field].value);
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
        let cmd;
        if(this.cmpInternalId){
            if(this.cmpInternalId.indexOf('dynamic-') == 0)
                cmd = `$still.context.componentRegistror.getComponent('${this.cmpInternalId}')`;
        }else{
            cmd = `$still.component.get('${this.getInstanceName()}')`;
        }

        //const classInstance = `$still.context.componentRegistror.getComponent('${cmpRef}')`;
        template = template.replaceAll(
            /\(click\)\=\"/gi,
            `onclick="${cmd}.`
        );

        return template;
    }

    /**
     * Parse the template, inject the components 'props' and 'state' if defined in the component
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
        
        const fields = this.getProperties();
        const currentClass = this;

        fields.forEach(field => {
            this.template = this.template.replace(`@${field}`,currentClass[field].value);
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
                settings.includs.forEach((/** @type {ViewComponent} */cmp) => cmp.render());
                resolve(null);
            }else{
                resolve(null);
            }
        });
        
        }).then(() => {

            if(settings.scripts) settings.scripts.forEach(this.importScript);

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

    updateState(object = {}){
        this.getProperties().forEach(field => {
            if(this['_'+field] = undefined){
                this['_'+field] = {
                    value: object[field]
                };
            }
        })
    }

    constructor(){
        console.log(`COnstructor called for: `,this.getInstanceName());
    }

    getUUID(){
        this.cmpInternalId = crypto.randomUUID();
        return this.cmpInternalId;
    }

}
