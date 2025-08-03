import { StillAppSetup } from "../config/app-setup.js";
import { AppTemplate } from "../config/app-template.js";
import { stillRoutesMap } from "../config/route.map.js";
import { ComponentNotFoundException } from "./component/manager/registror.js";
import { BehaviorComponent } from "./component/super/BehaviorComponent.js";
import { Router } from "./routing/router.js";
import { Components } from "./setup/components.js";
import { UUIDUtil } from "./util/UUIDUtil.js";


(() => {

    Router.parseRouteMap()
        .then(async () => {

            StillAppSetup.loadInterceptWorker();
            StillAppSetup.loadLoadtWorker();

            StillAppSetup.register(Router);
            StillAppSetup.register(AppTemplate);
            StillAppSetup.register(stillRoutesMap);
            StillAppSetup.register(UUIDUtil);
            StillAppSetup.register(Components);
            //StillAppSetup.register(StillAppSetup);
            //StillAppSetup.register(BaseComponent);
            StillAppSetup.register(BehaviorComponent);

            // Run Application UI component Loading
            await StillAppSetup.get().loadComponent();

            StillAppSetup.register(ComponentNotFoundException);

            /** Only for dev mode */
            StillAppSetup.setDevErrorTracing();

            /** Detect when a path was entered in the URL after 
             *  hash (#) and route it to the respective component */
            Router.listenUrlChange();

        });

})()