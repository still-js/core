

class ViewComponent extends BaseComponent {

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
        this.prepareRender();
        if(this.template instanceof Array)
            this.template = this.template.join('');

        document
            .getElementById(placeHolder)
            .innerHTML = this.template;
    }

}
