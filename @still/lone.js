import { StillAppSetup } from "../app-setup.js";
import { stillRoutesMap } from "../route.map.js";
import { ComponentNotFoundException, ComponentRegistror } from "./component/manager/registror.js";
import { BaseComponent } from "./component/super/BaseComponent.js";
import { BehaviorComponent } from "./component/super/BehaviorComponent.js";
import { Router } from "./routing/router.js";
import { Components } from "./setup/components.js";
import { UUIDUtil } from "./util/UUIDUtil.js";


(() => {

    Router.parseRouteMap()
        .then(async () => {

            Router.setStillHomeUrl();
            Components.loadCssAssets();
            StillAppSetup.loadInterceptWorker();

            StillAppSetup.register(Router);
            StillAppSetup.register(stillRoutesMap);
            StillAppSetup.register(UUIDUtil);
            StillAppSetup.register(BehaviorComponent);
            StillAppSetup.register(Components)

            StillAppSetup.register(ComponentNotFoundException);
            /** Only for dev mode */ StillAppSetup.setDevErrorTracing();

            if (document.readyState != 'loading') {

                const stillDeclarations = document.getElementsByTagName('st-element');

                [...stillDeclarations].forEach(async elm => {

                    elm.id = `stillLone_${UUIDUtil.newId()}`
                    const cmpName = elm.getAttribute('component');
                    const { newInstance: cmp } = await Components.produceComponent({ cmp: cmpName, lone: true });
                    new BaseComponent().parseStTag(elm.outerHTML, '', cmp);
                    const template = cmp.getBoundTemplate(elm.id);

                    ComponentRegistror.add(cmp.cmpInternalId, cmp);
                    setTimeout(() => cmp.parseOnChange(), 500);
                    setTimeout(() => (new Components).parseGetsAndSets(cmp), 10);
                    document.getElementById(elm.id).innerHTML = template;

                    const cmpParts = Components.componentPartsMap[cmp.cmpInternalId];
                    setTimeout(() =>
                        Components.handleInPartsImpl(cmp, cmp.cmpInternalId, cmpParts)
                    );

                });

            };

        });

})()