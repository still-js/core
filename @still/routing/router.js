import { StillAppSetup } from "../../app-setup.js";
import { AppTemplate } from "../../app-template.js";
import { $stillGetRouteMap, stillRoutesMap } from "../../route.map.js";
import { ComponentRegistror } from "../component/manager/registror.js";
import { BaseComponent } from "../component/super/BaseComponent.js";
import { Components, loadComponentFromPath } from "../setup/components.js";
import { $stillconst } from "../setup/constants.js";
import { UUIDUtil } from "../util/UUIDUtil.js";

export class Router {

    static routeMap = {
        ...stillRoutesMap.viewRoutes.lazyInitial,
        ...stillRoutesMap.viewRoutes.regular
    };

    static baseUrl = window.location.href.replace('#', '');

    #data = {};
    static instance = null;
    static appPlaceholder = $stillconst.APP_PLACEHOLDER;
    static initRouting = false;
    static importedMap = {};

    /** @returns { Router } */
    static getInstance() {

        if (!Router.instance)
            Router.instance = new Router();
        return Router.instance;

    }

    static init() {
        StillAppSetup.get().loadComponent();
        AppTemplate.get().storageSet('stAppInitStatus', true);
        Router.initRouting = true;
        //localStorage.setItem('stAppInitStatus', true);
    }

    static data(cmpName) {

        const data = Router.getInstance().#data[cmpName];
        //delete Router.getInstance().#data[cmpName];
        return data;
    }

    /**
     * 

     * @param {String} data 
     */
    static aliasGoto(cmp, data) {

        if (data.startsWith($stillconst.RT_DT_PREFIX)) {
            data = Router.getInstance().#data[data];
            delete Router.getInstance().#data[data];
        }

        Router.goto(cmp, { data });
    }

    /**
     *
     * @param {*} cmp 
     * @param {{data, path}} param1 
     */
    static goto(cmp, { data = {} } = { data: {} }) {

        cmp = Router.handleViewType(cmp);

        Router.initRouting = false;
        Components.setRemovingPartsVersionId($still.context.currentView?.versionId);
        /**
         * The or (||) conditions serves to mount the application 
         * so the user can be redirected straight to a specific 
         * page/page-component instead of being forced to go to 
         * the main/home UI after the login,  as the page is not 
         * rendered in case the app was not  
         * loaded through StillAppSetup.get().loadComponent() 
         */
        if (
            cmp === 'init'
            ||
            (AppTemplate.get().isAuthN() && !StillAppSetup.get().isAppLoaded())
        ) {
            StillAppSetup.get().loadComponent();
            AppTemplate.get().storageSet('stAppInitStatus', true);
            Router.initRouting = true;
            //localStorage.setItem('stAppInitStatus', true);
        }

        if (cmp === 'exit') {
            AppTemplate.get().unloadApp();
            return;
        }

        Router.getInstance().#data = null;
        if (data != '') {
            Router.getInstance().#data = {};
            if (data instanceof Object) {
                if (Object.keys(data).length)
                    Router.getInstance().#data[cmp] = data;
            } else {
                Router.getInstance().#data[cmp] = data;
            }
        }


        const routeInstance = $stillGetRouteMap()
        const route = routeInstance.route[cmp];

        const cmpRegistror = $still.context.componentRegistror.componentList;
        const isHomeCmp = StillAppSetup.get().entryComponentName == cmp;
        if (isHomeCmp) {

            if (cmp in cmpRegistror) {

                $still.context.currentView = cmpRegistror[cmp].instance;
                if (!AppTemplate.get().isAuthN() && !cmpRegistror[cmp].instance.isPublic)
                    document.write($stillconst.MSG.PRIVATE_CMP);

                Router.getAndDisplayPage($still.context.currentView, true, isHomeCmp);


            } else {

                (async () => {

                    const appTemplate = AppTemplate.get().template;
                    const cmpRoute = Router.routeMap[cmp];
                    const cmpCls = await import(`${Router.baseUrl}${cmpRoute}/${cmp}.js`);

                    $still.context.currentView = eval(`new ${cmpCls[cmp]}()`);

                    if (!AppTemplate.get().isAuthN() && !$still.context.currentView.isPublic)
                        document.write($stillconst.MSG.PRIVATE_CMP);

                    if ($still.context.currentView.template == undefined)
                        return Router.cmpTemplateNotDefinedCheck(cmp);

                    let template = (new Components()).getHomeCmpTemplate($still.context.currentView);
                    template = appTemplate.replace(
                        $stillconst.STILL_COMPONENT, `<div id="${Router.appPlaceholder}">${template}</div>`
                    );
                    document.getElementById('stillUiPlaceholder').innerHTML = template;
                    setTimeout(() => Router.callCmpAfterInit(null, isHomeCmp, Router.appPlaceholder));

                })();

            }

        } else {

            loadComponentFromPath(route, cmp)
                .then(async ({ imported, isRoutable }) => {
                    if (!Router.importedMap[cmp]) {
                        if (cmp == 'init') return;

                        const cmpRoute = Router.routeMap[cmp];
                        const cmpCls = await import(`${Router.baseUrl}${cmpRoute}/${cmp}.js`);
                        AppTemplate.get().storageSet('stAppInitStatus', true);

                        /** the bellow line clears previous component from memory
                         * @type { ViewComponent } */
                        const newInstance = eval(`new ${cmpCls[cmp]}()`);

                        if (newInstance.template == undefined)
                            return Router.cmpTemplateNotDefinedCheck(cmp);

                        if (newInstance.isPublic) {
                            Components.registerPublicCmp(newInstance);
                            if (!AppTemplate.get().isAuthN()) {
                                (new Components()).renderPublicComponent(newInstance);
                                return;
                            }
                        }

                        ComponentRegistror.register(cmp, newInstance);
                        if (!document.getElementById($stillconst.APP_PLACEHOLDER) && !newInstance.isPublic) {
                            document.write($stillconst.MSG.PRIVATE_CMP);
                            return;
                        }

                        newInstance.isRoutable = true;
                        Router.parseComponent(newInstance);
                        newInstance.setRoutableCmp(true);
                        if (isHomeCmp)
                            newInstance.setUUID($stillconst.TOP_LEVEL_CMP);

                        $still.context.currentView = newInstance;

                    } else {
                        //if (!isRoutable) {
                        //    $still.context.currentView = $still.component.list[cmp];
                        //} else {
                        $still.context.currentView = cmpRegistror[cmp].instance;
                        //}

                        $still.context.currentView.isRoutable = true;
                        if (!$still.context.currentView.stillParsedState) {
                            $still.context.currentView = (new Components).getNewParsedComponent(
                                $still.context.currentView
                            );
                        }
                    }
                    Router.getAndDisplayPage($still.context.currentView, Router.importedMap[cmp]);
                });
        }

    }

    /**
     * 1. Add new method for dynamic instantiation
     * 2. Add getter and setters for the components fields
     * @param { ViewComponent } cmp
     */
    static parseComponent(cmp) {
        setTimeout(() => {
            (new Components).getNewParsedComponent(cmp);
        });
    }

    /**
     * the bellow line clears previous component from memory
     * @param { ViewComponent } componentInstance
     */
    static getAndDisplayPage(componentInstance, isReRender = false, isHome = false) {
        const ACTION = 'componentRoutedRender';
        const appCntrId = Router.appPlaceholder;
        let appPlaceholder = document.getElementById(appCntrId);
        const cmpId = componentInstance.getUUID();
        const cmpName = componentInstance.constructor.name;

        if (isReRender) {
            Components
                .unloadLoadedComponent()
                .then(async () => {

                    if (componentInstance.subImported) {

                        const pageContent = `
                        <output id="${cmpId}-check" style="display:contents;">
                            ${componentInstance.getTemplate()}
                        </output>`;
                        appPlaceholder.insertAdjacentHTML('afterbegin', pageContent);
                        componentInstance.subImported = false;
                        setTimeout(() => {
                            componentInstance.parseOnChange();
                        }, 500);
                        await componentInstance.onRender();
                        //await componentInstance.stAfterInit();

                    } else {
                        await Components.reloadedComponent(componentInstance, isHome);
                    }
                    setTimeout(() => Router.callCmpAfterInit(`${cmpId}-check`, isHome));
                });

        } else {
            Components
                .unloadLoadedComponent()
                .then(async () => {

                    if (!appPlaceholder && componentInstance?.isPublic) {
                        appPlaceholder = document.getElementById($stillconst.UI_PLACEHOLDER);
                    }

                    const pageContent = `
                    <output id="${cmpId}-check" style="display:contents;">
                        ${componentInstance.getTemplate()}
                    </output>`;
                    appPlaceholder.insertAdjacentHTML('afterbegin', pageContent);
                    setTimeout(() => {
                        componentInstance.parseOnChange();
                    }, 500);
                    await componentInstance.onRender();
                    setTimeout(() => {
                        componentInstance.$stillLoadCounter = componentInstance.$stillLoadCounter + 1;
                    }, 100);
                    setTimeout(() => Router.callCmpAfterInit(`${cmpId}-check`));
                    Router.importedMap[cmpName] = true;

                });
        }

    }

    static callCmpAfterInit(cmpId, isHome, appPlaceholder = null) {

        /**
         * Timer for keep calling the function wrapped code
         * until it finds that the main component was loaded
         * and proceeding computations (e.g. load subcomponent) 
         * can happen
         */
        let cmpRef = appPlaceholder;
        if (cmpRef == null) cmpRef = isHome ? $stillconst.TOP_LEVEL_CMP : cmpId;
        const loadTImer = setTimeout(async () => {
            /**
             * Check if the main component was 
             * loaded/rendered
             */
            if (document.getElementById(cmpRef)) {
                clearTimeout(loadTImer);
                /** @type { ViewComponent } */
                const cmp = $still.context.currentView;

                /**
                 * Runs stAfterInit special method 
                 * in case it exists
                 */
                if (!Components.checkStInit(cmp.constructor.name))
                    setTimeout(async () => await cmp.stAfterInit(), 200);

                /**
                 * Load component parts or sub-components inside the main loaded component
                 * if(!Components.stAppInitStatus) is to prevent compoenent parts Parsing
                 * When this is called in the App mounting phase, as this (handleInPlaceParts) 
                 * has been handled previously on the Components Funamentals (components.js)
                 * by already calling Components.handleInPlaceParts($still.context.currentView))
                 */
                if (
                    (!Components.stAppInitStatus
                        || AppTemplate.get().storageGet('stAppInitStatus'))
                    && !Router.initRouting
                ) {
                    Components.handleInPlaceParts(cmp);
                } else if (
                    (
                        (Components.stAppInitStatus)
                        && StillAppSetup.get().entryComponentName != cmp?.getName()
                    ) || appPlaceholder != null
                ) {
                    Components.handleInPlaceParts(cmp);
                } else {
                    Components.stAppInitStatus = false;
                }
                //clearTimeout(loadTImer);
            }

        }, 200);
        Components.removeOldParts();

    }

    static cmpTemplateNotDefinedCheck(cmpName) {
        document.write($stillconst.NO_TEMPLATE.replace('{{}}', cmpName));
    }

    static handleViewType(cmp) {


        if (
            (cmp.prototype instanceof ViewComponent)
            || (cmp.prototype instanceof BaseComponent)
        ) cmp = cmp.name;

        return cmp;

    }

    static routingDataParse(data) {
        if (data instanceof Array || data instanceof Object) {
            const hash = `${$stillconst.RT_DT_PREFIX}${UUIDUtil.newId()}`;
            Router.getInstance().#data[hash] = data;
            return hash;
        }
        return data;
    }


}
window.Router = Router;