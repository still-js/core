class Template {

    static instance = {};

    constructor(){
        const clsName = this.constructor.name;
        if(!(clsName in Template.instance))
            Template.instance[clsName] = this;
    }

    get(){
        const clsName = this.constructor.name;
        return Template.instance[clsName];
    }


}