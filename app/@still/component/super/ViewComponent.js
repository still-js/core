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
        this.incrementLoadCounter();
    }

    getTemplate(){
        this.beforeInit(); 
        //this.prepareRender();
        let template = this.getBoundTemplate();   
        const cmpUnicClass = this.getUUID();
        const loadCmpClass = $stillconst.ANY_COMPONT_LOADED;

        //Add class wrapper
        template = `
            <span class="${cmpUnicClass} ${loadCmpClass}">
                ${template}
            </span>
        `;

        return template;
    }

    render(){
        this.renderOnViewFor(this.htmlRefId);
    }

}
