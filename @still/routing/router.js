import { StillAppSetup } from "../../app-setup.js";
import { AppTemplate } from "../../app-template.js";
import { $stillGetRouteMap, stillRoutesMap } from "../../route.map.js";
import { BaseComponent } from "../component/super/BaseComponent.js";
import { ViewComponent } from "../component/super/ViewComponent.js";
import { Components, loadComponentFromPath } from "../setup/components.js";
import { $stillconst } from "../setup/constants.js";

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

        console.log("log do data router.js", cmpName);
        const data = Router.getInstance().#data[cmpName];
        //delete Router.getInstance().#data[cmpName];
        return data;
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
                Router.getAndDisplayPage($still.context.currentView, true, isHomeCmp);

            } else {

                /**
                 * TO DO: Repeating code from both Router class and Components Class, 
                 * should be modularized from
                 */
                const appTemplate = AppTemplate.get().template;
                $still.context.currentView = eval(`new ${cmp}()`);

                if ($still.context.currentView.template == undefined)
                    return Router.cmpTemplateNotDefinedCheck(cmp);

                let template = (new Components()).getCurrentCmpTemplate($still.context.currentView);
                template = appTemplate.replace(
                    $stillconst.STILL_COMPONENT, `<div id="${Router.appPlaceholder}">${template}</div>`
                );
                document.getElementById('stillUiPlaceholder').innerHTML = template;

            }

        } else {

            loadComponentFromPath(route, cmp)
                .then(async ({ imported, isRoutable }) => {
                    if (!imported) {
                        if (cmp == 'init') return;

                        const cmpRoute = Router.routeMap[cmp];
                        const cmpCls = await import(`${Router.baseUrl}${cmpRoute}/${cmp}.js`);
                        AppTemplate.get().storageSet('stAppInitStatus', true);

                        /** the bellow line clears previous component from memory
                         * @type { ViewComponent }
                         */
                        const newInstance = eval(`new ${cmpCls[cmp]}()`);

                        if (newInstance.template == undefined)
                            return Router.cmpTemplateNotDefinedCheck(cmp);


                        if (newInstance.isPublic && !AppTemplate.get().isAuthN()) {
                            (new Components()).renderPublicComponent(newInstance);
                            return;
                        }

                        if (!document.getElementById($stillconst.APP_PLACEHOLDER)) {
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
                        if (!isRoutable) {
                            $still.context.currentView = $still.component.list[cmp];
                        } else {
                            $still.context.currentView = cmpRegistror[cmp].instance;
                        }

                        $still.context.currentView.isRoutable = true;
                        if (!$still.context.currentView.stillParsedState) {
                            $still.context.currentView = (new Components).getNewParsedComponent(
                                $still.context.currentView
                            );
                        }
                    }
                    Router.getAndDisplayPage($still.context.currentView, imported);
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
        const appPlaceholder = document.getElementById(appCntrId);
        const cmpId = componentInstance.getUUID();

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
                    setTimeout(() => Router.callCmpAfterInit(`${cmpId}-check`), 500);
                });

        } else {
            Components
                .unloadLoadedComponent()
                .then(async () => {
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
                    setTimeout(() => Router.callCmpAfterInit(`${cmpId}-check`), 500);

                });
        }

    }

    static callCmpAfterInit(cmpId) {

        /**
         * Timer for keep calling the function wrapped code
         * until it finds that the main component was loaded
         * and proceeding computations (e.g. load subcomponent) 
         * can happen
         */
        const loadTImer = setTimeout(async () => {
            /**
             * Check if the main component was 
             * loaded/rendered
             */
            if (document.getElementById(cmpId)) {
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
                    (Components.stAppInitStatus)
                    && StillAppSetup.get().entryComponentName != cmp?.getName()
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

        if ('prototype' in cmp) {
            if (
                (cmp.prototype instanceof ViewComponent)
                || (cmp.prototype instanceof BaseComponent)
            ) cmp = cmp.name;
        }
        return cmp;

    }

}
window.Router = Router;