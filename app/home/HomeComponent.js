import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class HomeComponent extends ViewComponent {

    isPublic = true;
    template = `
        <h1>Home component content</h1>
    `;

    constructor() {
        super();
    }

}