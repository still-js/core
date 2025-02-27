import { StillAppSetup } from "../app-setup.js";
import { stillRoutesMap } from "../route.map.js";
import { ComponentNotFoundException } from "./component/manager/registror.js";
import { BaseComponent } from "./component/super/BaseComponent.js";
import { BehaviorComponent } from "./component/super/BehaviorComponent.js";
import { Components } from "./setup/components.js";
import { UUIDUtil } from "./util/UUIDUtil.js";


StillAppSetup.register(stillRoutesMap);
StillAppSetup.register(UUIDUtil);
StillAppSetup.register(Components);
StillAppSetup.register(StillAppSetup);
StillAppSetup.register(BaseComponent);
StillAppSetup.register(BehaviorComponent);

/**
 * Run Application UI component Loading
 */
StillAppSetup.get().loadComponent();

StillAppSetup.register(ComponentNotFoundException);