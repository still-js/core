import { StillAppMixin } from "./@still/component/super/AppMixin.js";
import { Components } from "./@still/setup/components.js";
import { HomeComponent } from "./app/home/HomeComponent.js";

export class StillAppSetup extends StillAppMixin(Components) {


    constructor() {
        super();
    }

    init() {
        return new HomeComponent();
    }

}
