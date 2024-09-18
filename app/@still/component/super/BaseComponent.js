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
    //_subscribers;
    //get subscribers(){}
    //set subscribers(v){}

    constructor(value){
        this.value = value;
    }
}

class BaseComponent extends BehaviorComponent {


    /**
     * @type {SettingType}
     */
    settings = null;
    componentName;
    template;
    cmpProps = [];
    cmpInternalId = null;
    routableCmp = null;
    $stillLoadCounter = 0;
    $stillIsThereForm = null;
    $stillpfx = $stillconst.STILL_PREFIX;


    /**
     * signature method only
     * @param {object|any} 
     * @returns { ViewComponent | BaseComponent } 
     */
    new(params){}

    async onRender(){}

    stOnUpdate(){}

    reRender(){}

    props(props = {}){
        this.cmpProps = props;
        return this;
    }

    setRoutableCmp(flag){
        this.routableCmp = true;
    }

    getRoutableCmp(){
        return this.routableCmp;
    }

    getName(){
        return this.constructor.name;
    }

    getInstanceName(){
        return this.constructor.name.replace('C','');
    }

    getProperties(){

        const fields = Object.getOwnPropertyNames(this);
        const excludingFields = [
            'settings', 'componentName', 'template', 
            'cmpProps','htmlRefId','new','cmpInternalId',
            'routableCmp', '$stillLoadCounter', 'subscribers',
            '$stillIsThereForm','$stillpfx'
        ];
        return fields.filter(
            field => !excludingFields.includes(field) && !field.startsWith(this.$stillpfx)
        );

    }
    
    getStateValues(){
        const result = {};
        const fields = this.getProperties();
        for(const field of fields){
            result[field] = this[this.$stillpfx+'_'+field];
        }
        return this;
    }

    getClassPath(){
        let path;
        if(this.cmpInternalId){
            /** If component was generated dynamically in a loop */
            const dynamic = $stillconst.DYNAMIC_CMP_PREFIX;
            if(this.cmpInternalId.indexOf(dynamic) == 0)
                path = `$still.context.componentRegistror.getComponent('${this.cmpInternalId}')`;
        }else{

            if(this.getRoutableCmp())
                path = `$still.context.componentRegistror.getComponent('${this.getName()}')`;
            else
                path = `$still.component.get('${this.getInstanceName()}')`;
        }
        return path;
    }

    isThereAForm(){
        if(!this.$stillIsThereForm){
            const form = $stillconst.CMP_FORM_PREFIX
            this.$stillIsThereForm = this.template.indexOf(form) >= 0;
        }
        return this.$stillIsThereForm;
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
            tamplateWithState = tamplateWithState.replace(`@${field}`,currentClass[field]?.value);
            tamplateWithState = this.getBoundInputForm(tamplateWithState, field);
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
        let cmd = this.getClassPath();
        template = template.replaceAll(
            /\(click\)\=\"/gi,
            `onclick="${cmd}.`
        );

        return template;
    }

    getBoundInputForm(template, field, value){
        /**
         * Bind (value) on the input form
         */

        if(this.isThereAForm()){
            const emptyField = '';
            const clsPath = this.getClassPath();

            template = template.replaceAll(
                `(value)="${field}"`,
                `value="${this[field] || emptyField}" onkeyup="${clsPath}.onValueInput('${field}',this.value)"`
            );

        }

        return template;

    }

    incrementLoadCounter(){
        setTimeout(() => {
            this.$stillLoadCounter = this.$stillLoadCounter + 1;
        },1000);
    }

    /**
     * Parse the template, inject the components 'props' and 'state' if defined in the component
     */
    getBoundTemplate(){

        console.time('tamplateBindFor'+this.getName());
        /**
         * Bind the component state and return it (template)
         * NOTE: Needs to be always the first to be called
         */
        let template = this.getBoundState();

        /** Bind the props to the template and return */
        template = this.getBoundProps(template);
        /** Bind the click to the template and return */
        template = this.getBoundClick(template);

        console.timeEnd('tamplateBindFor'+this.getName());

        return template;
    }

    render(){
        this.incrementLoadCounter();
        document.write(this.getBoundTemplate());
    }

    getTemplate(count = true){
        this.incrementLoadCounter();
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
        super();
    }

    setUUID(hash){
        this.cmpInternalId = hash;
    }

    getUUID(){
        if(!this.cmpInternalId)
            this.cmpInternalId = '_cmp'+crypto.randomUUID();
        return this.cmpInternalId;
    }

    reRender(){

        const settings = this.settings;
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
    }

    wasItLoadedBefor(){
        return ComponentRegistror.previousLoaded(this);
    }

    stRunOnFirstLoad(cb = () => {}){
        if(this.wasItLoadedBefor() && this.$stillLoadCounter)
            return false;
        cb();
    }

    async stLazyExecution(cb = () => {}){

        const multiplier = 1000;
        let backoffFactor = 1000;
        let retryCounter = 2;

        const timer = setInterval(async () => {

            try {
                await cb();
                clearInterval(timer);
            } catch (error) {
                if(error instanceof ComponentNotFoundException){
    
                    if(retryCounter < 8) retryCounter++
                    const content = JSON.parse(error.message);
                    const path = $stillGetRouteMap().route[content.component];
                    console.log(`Path is: `, path, 'and compo is: ',content.component);
                    const script = $stillLoadScript(path, content.component);
                    document.head.insertAdjacentElement('beforeend',script);
                    script.onload = function(){
                        const registror = $still.context.componentRegistror.componentList;
                        const instance = eval(`new ${content.component}()`);
                        if(!(instance in registror))
                            registror[content.component] = { instance };
                    }
                    await sleepForSec(multiplier * retryCounter);
    
                }
            }

        }, 500);

    }

    stAfterAppInit(cb = () => {}){
        const timer = setTimeout(() => {

            try {
                cb();
                clearTimeout(timer);
            } catch (error) {}

        },1000);
    }

    sfAfterInit(){}

}
