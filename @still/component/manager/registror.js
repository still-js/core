import { StillAppSetup } from "../../../app-setup.js";
import { stillRoutesMap } from "../../../route.map.js";
import { StillHTTPClient } from '../../helper/http.js';
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

        if (ComponentRegistror.registror == null) {
            ComponentRegistror.registror = new ComponentRegistror();
        }
        return ComponentRegistror.registror;

    }

    /**
     * 
     * @param {SettingType} component 
     */
    export({ componentName: name, path, instance }) {
        if (!(name in this.componentList))
            this.componentList[instance.componentName] = { path, instance };

    }

    /**
     * 
     * @param {ViewComponent} cmp 
     */
    expose(cmp) {
        return new Components().getParsedComponent(cmp);
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

    static clearRegistror(cmp) {
        $still.context.componentRegistror.componentList = {};
    }

    static add(name, instance) {
        $still.context.componentRegistror.componentList[name] = { instance }
    }

    static getFromRef(name) {
        const source = $still.context.componentRegistror.componentList;
        if (name in source) return source[name].instance;
        else return null
    }

    /** @param { ViewComponent } cls */
    static addClass(cls) {
        let clsName = cls;
        if (cls instanceof ViewComponent) clsName = cls.name;
        ComponentRegistror._classeList[clsName] = cls;
    }

    static getClass(clsName) {
        return ComponentRegistror._classeList[clsName];
    }

    static controller(type) {
        return StillAppSetup.get().services.get(type);
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
        expose: (cmp) => ComponentRegistror.get().expose(cmp),
        ref: (ref) => ComponentRegistror.component(ref),
        list: window,
        get: (cmpName) => window[cmpName]
    },
    view: {
        /** @type { ViewComponent } */
        get: (viewComponentName) => {
            return ComponentRegistror.get().getComponent(viewComponentName);
        }
    },
    controller: (type) => ComponentRegistror.controller(type),
    HTTPClient: new StillHTTPClient(),

}

//window.$still = $still;
window.ComponentRegistror = ComponentRegistror;
