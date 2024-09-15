class HTMLRefId {

}

class ViewComponent extends BaseComponent {

    /**
     * @type {HTMLRefId}
     */
    htmlRefId

    constructor(){
        super();
    }

    beforeInit(){}

    renderViewOn(placeHolder){

        this.prepareRender();
        if(this.template instanceof Array)
            this.template = this.template.join('');

        document
            .getElementById(placeHolder)
            .innerHTML = this.template;
    }

    renderOnViewFor(placeHolder){
        this.beforeInit();
        
        //$still.context.componentRegistror.componentList[this.getName()] = { instance: this };
        /*.compo.export({
            componentName: this.getName(), instance: this
        });*/

        document
            .getElementById(placeHolder)
            .innerHTML = this.getBoundTemplate();
    }

    getTemplate(){
        this.beforeInit();
        //this.prepareRender();
        console.log(`${this.constructor.name}`);
        if(this.template instanceof Array)
            this.template = this.template.join('');

        return this.template;
    }

    render(){
        this.renderOnViewFor(this.htmlRefId);
    }

}
