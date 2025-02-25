import { StillAppSetup } from "../app-setup.js";
import { ComponentNotFoundException } from "./component/manager/registror.js";
import { BaseComponent } from "./component/super/BaseComponent.js";
import { Components } from "./setup/components.js";

StillAppSetup.register(Components);
StillAppSetup.register(StillAppSetup);
StillAppSetup.register(BaseComponent);

/**
 * Run Application UI component Loading
 */
StillAppSetup.get().loadComponent();

StillAppSetup.register(ComponentNotFoundException);