import { StillAppSetup } from "../../../config/app-setup.js";
import { stillRoutesMap } from "../../../config/route.map.js";
import { StillHTTPClient } from '../../helper/http.js';
import { Components } from "../../setup/components.js";
import { ViewComponent } from "../super/ViewComponent.js";

export class ComponentNotFoundException extends Error {
    name = 'ComponentNotFoundException';
    constructor(cmpName) {
        super();
        this.message = JSON.stringify({
            message: `Component with name ${cmpName} no found`,
            component: cmpName
        });
    }
}



export class ComponentRegistror {

    componentList = {};
    static registror = null;
    static forEachByCmpCount = {};
    static _classeList = {};

    /** @returns { ComponentRegistror } */
    static get() {
        if (ComponentRegistror.registror == null) 
            ComponentRegistror.registror = new ComponentRegistror();
        return ComponentRegistror.registror;
    }

    getComponent(name) {
        if (!(name in this.componentList)) {
            throw new ComponentNotFoundException(name);
        }
        return this.componentList[name].instance;
    }

    /** @returns { ViewComponent } */
    static component(name) {
        return ComponentRegistror.get().getComponent(name);
    }

    /**
     * @param { ViewComponent } cmp
     */
    static previousLoaded(cmp) {
        let cmpName;
        if (cmp.getRoutableCmp())
            cmpName = cmp.getName();
        else
            cmpName = cmp.getInstanceName();
        return cmpName in $still.context.componentRegistror.componentList;
    }

    static add = (name, instance, isRef = false) =>{
        $still.context.componentRegistror.componentList[name] = { instance };
    }
    
    static getFromRef(name) {
        const source = $still.context.componentRegistror.componentList;
        if (name in source) return source[name].instance;
        else return null
    }

    static controller = (type) =>  StillAppSetup.get().services.get(type);

    static desrtroyCmpInstance = (cmpId) => {
        ComponentRegistror.get().componentList[cmpId].instance.stOnUnload();
        if(StillAppSetup.get().entryComponentId == cmpId){
            delete ComponentRegistror.get().componentList[StillAppSetup.get().entryComponentName];
            return delete ComponentRegistror.get().componentList[cmpId];
        }     
        delete ComponentRegistror.get().componentList[cmpId];
    }
}

export const $still = {
    context: {
        componentRegistror: ComponentRegistror.get(),
        componentMap: stillRoutesMap.viewRoutes,
        currentView: null,
    },
    component: {
        /** @param { ViewComponent } cmp */
        ref: (ref) => ComponentRegistror.component(ref),
        list: window,
        get: (cmpName) => window[cmpName],
    },
    c: { ref: (ref) => ComponentRegistror.get().componentList[ref].instance },
    controller: (type) => ComponentRegistror.controller(type),
    HTTPClient: new StillHTTPClient(),
    multplWaitSec: 200,
}

//window.$still = $still;
window.ComponentRegistror = ComponentRegistror;
