class Template {

    static instance = {};

    constructor(){
        const clsName = 'AppTemplate';
        if(!(clsName in Template.instance))
            Template.instance[clsName] = this;
    }

    /**
     * 
     * @returns { AppTemplate }
     */
    static get(){
        const clsName = 'AppTemplate';
        if(!(clsName in Template.instance)){
            Template.instance[clsName] = new AppTemplate();
        }
        console.log(clsName);
        return Template.instance[clsName];
    }

    store(name, value){

        const clsName = this.constructor.name;
        if(!('storage' in Template.instance[clsName])){
            Object.assign(Template.instance[clsName], {
                storage: {}
            });
        }

        if(!(name in Template.instance[clsName]['storage'])){
            Template.instance[clsName]['storage'][name] = value;
            return;
        }
        Template.instance[clsName]['storage'][name] = value;
    }

    getStorageValue(name){
        const clsName = this.constructor.name;
        if(!('storage' in Template.instance[clsName])){
            console.log(`No storage with name ${name} was set`);
        }

        if(!(name in Template.instance[clsName]['storage'])){
            console.log(`No storage with name ${name} was set`);
        }

        return Template.instance[clsName]['storage'][name];

    }

    setAuthN(){
        
    }

    isAuthN({}){

    }

    unloadApp(){
        Components.unloadApp();
        Router.goto('init');
    }

}