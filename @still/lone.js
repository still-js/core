import { StillAppSetup } from "../config/app-setup.js";
import { stillRoutesMap } from "../config/route.map.js";
import { ComponentNotFoundException, ComponentRegistror } from "./component/manager/registror.js";
import { BaseComponent } from "./component/super/BaseComponent.js";
import { BehaviorComponent } from "./component/super/BehaviorComponent.js";
import { BaseService, ServiceEvent } from "./component/super/service/BaseService.js";
import { Router } from "./routing/router.js";
import { Components } from "./setup/components.js";
import { UUIDUtil } from "./util/UUIDUtil.js";


(() => {
    const boolMap = { 'false': false, 'true': true, false: false, true: true, 'no': false, 'yes': true };  
    Router.parseRouteMap()
        .then(async () => {

            Router.setStillHomeUrl();
            Components.loadCssAssets();
            StillAppSetup.loadInterceptWorker();
            StillAppSetup.loadLoadtWorker();

            StillAppSetup.register(Router);
            StillAppSetup.register(stillRoutesMap);
            StillAppSetup.register(UUIDUtil);
            StillAppSetup.register(BehaviorComponent);
            StillAppSetup.register(Components);
            StillAppSetup.register(BaseService);
            StillAppSetup.register(ServiceEvent);

            StillAppSetup.register(ComponentNotFoundException);
            /** Only for dev mode */ StillAppSetup.setDevErrorTracing();
            let componentCounter = 0;
            if (document.readyState != 'loading') {

                const stillDeclarations = document.getElementsByTagName('st-element');

                [...stillDeclarations].forEach(async elm => {
                    componentCounter++;
                    elm.id = `stillLone_${UUIDUtil.newId()}`;
                    const cmpName = elm.getAttribute('component'), ref = elm.getAttribute('stRef');
                    
                    const { newInstance: cmp } = await Components.produceComponent({ cmp: cmpName, lone: true });
                    const attrs = [...elm.getAttributeNames()];
                    for(const atr of attrs){
                        const attrVal = elm.getAttribute(atr);
                        const realVal = attrVal in boolMap ? boolMap[attrVal] : attrVal;
                        if(!['component','id','ref'].includes(atr)) cmp[atr] = realVal;
                    }

                    await cmp.onRender();
                    new BaseComponent().parseStTag(elm.outerHTML, '', cmp);
                    const template = cmp.getBoundTemplate(elm.id);

                    ComponentRegistror.add(cmp.cmpInternalId, cmp);
                    setTimeout(() => cmp.parseOnChange(), 500);
                    setTimeout(() => {
                        cmp.setAndGetsParsed = true;
                        (new Components).parseGetsAndSets(cmp)
                    }, 10);
                    document.getElementById(elm.id).innerHTML = template;
                    if(ref && ref != ''){
                        if(window['stillFrontendsList']){
                            const appLoaderId = window['stillFrontendsList'][ref];
                            window['stillFrontendsLoader'][appLoaderId][ref] = cmp;
                        }
                    }

                    const cmpParts = Components.componentPartsMap[cmp.cmpInternalId];
                    setTimeout(async () => {
                        Components.emitAction(cmp.getName());
                        Components.handleInPlacePartsInit(cmp, cmp.cmpInternalId, cmpParts);
                        setTimeout(() => {
                            Components.runAfterInit(cmp);
                            if(--componentCounter === 0) window['#stOnEvt']?.forEach(async (listener) => await listener());
                        },100);
                        Components.handleMarkedToRemoveParts();
                    });

                });
            };

        });
})()