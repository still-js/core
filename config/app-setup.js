import { StillAppMixin } from "../@still/component/super/AppMixin.js";
import { Components } from "../@still/setup/components.js";
import { HomeComponent } from "../app/home/HomeComponent.js";
import { AppTemplate } from "./app-template.js";

export class StillAppSetup extends StillAppMixin(Components) {

    constructor() {
        super();
        this.setHomeComponent(HomeComponent);
    }

    async init() {
        return await AppTemplate.newApp();
    }

}
