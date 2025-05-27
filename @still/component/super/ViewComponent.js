import { $stillconst } from "../../setup/constants.js";
import { BaseComponent } from "./BaseComponent.js";

export class ViewComponent extends BaseComponent {

    htmlRefId;

    constructor({ parent } = { parent: null }) {
        super();
    }

    getTemplate() {
        this.beforeInit();
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
}

window.ViewComponent = ViewComponent;