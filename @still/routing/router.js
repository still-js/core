import { StillAppSetup } from "../../config/app-setup.js";
import { AppTemplate } from "../../config/app-template.js";
import { stillRoutesMap as DefaultstillRoutesMap } from "../../config/route.map.js";
import { $still, ComponentRegistror } from "../component/manager/registror.js";
import { BaseComponent } from "../component/super/BaseComponent.js";
import { Components } from "../setup/components.js";
import { $stillconst, authErrorMessage, ST_UNAUTHOR_ID } from "../setup/constants.js";
import { UUIDUtil } from "../util/UUIDUtil.js";
import { getRoutesFile } from "../util/route.js";

const stillRoutesMap = await getRoutesFile(DefaultstillRoutesMap);

const GotoParams = {
    data: {},
    url: true,
    evt: { containerId: null  }
}

export class Router {

    static routeMap;
    static baseUrl = window.location.href.replace('#', '');

    #data = {};
    static instance = null;
    static appPlaceholder = $stillconst.APP_PLACEHOLDER;
    static initRouting = false;
    static importedMap = {};
    static navigatingView = null;
    static navigatingUrl = null;
    static urlParams = {};
    /** clickEvetCntrId only takes place when it comes to lone component so that
     *  it can identify the context which an event (e.g. Navigation) occurred  */
    static clickEvetCntrId = null;
    static preView = null;
    static navCounter = 0;
    static serviceId = null;

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
    }

    static data = (cmp) => Router.getInstance().#data[cmp.getName()];

    /** @param {String} data  */
    static aliasGoto(cmp, data, url = false, containerId = null) {
        if (!url) Router.clearUrlPath();
        if (data.startsWith($stillconst.RT_DT_PREFIX)) {
            data = Router.getInstance().#data[data];
            delete Router.getInstance().#data[data];
        }
        Router.goto(cmp, { data, url, evt: { containerId } });
    }

    /**
     * 

     * @param {String} data 
     */
    static aliasGoto1(cmp, url = false, containerId = null) {
        if (!url) Router.clearUrlPath();
        Router.goto(cmp, { data: {}, url, evt: { containerId } });
    }

    static initNavigation(cmp) {
        Router.clickEvetCntrId = null;
        Router.initRouting = false;
        Router.preView = $still.context.currentView;
        Components.setRemovingPartsVersionId($still.context.currentView?.versionId);
        Router.navCounter = Router.navCounter + 1;
        return Router.handleViewType(cmp);
    }

    /**
     *
     * @param {*} cmp 
     * @param {{data, path}} param1
     */
    static goto(cmp, params = GotoParams) {

        const { data, evt, url } = params;
        cmp = Router.initNavigation(cmp);
        Components.prevLoadLoopContainer.clear();
        if (evt?.containerId) Router.clickEvetCntrId = evt.containerId;
        /**
         * The or (||) conditions serves to mount the application so the user can 
         * be redirected straight to a specific page/page-component instead of being 
         * forced to go to the main/home UI after the login,  as the page is not rendered 
         * in case the app was not loaded through StillAppSetup.get().loadComponent() 
         */
        if (
            cmp === 'init'
            ||
            (AppTemplate.get().isAuthN() && !StillAppSetup.get().isAppLoaded())
        ) {
            StillAppSetup.get().loadComponent();
            AppTemplate.get().storageSet('stAppInitStatus', true);
            Router.initRouting = true;
        }

        if (cmp === 'exit') return AppTemplate.get().unloadApp();

        Router.getInstance().#data = null;
        if (data != '') {
            Router.getInstance().#data = {};
            if (data instanceof Object) {
                if (Object.keys(data).length) Router.getInstance().#data[cmp] = data;
            } else 
                Router.getInstance().#data[cmp] = data;
        }


        const routeInstance = {
            route: {
                ...stillRoutesMap.viewRoutes.lazyInitial,
                ...stillRoutesMap.viewRoutes.regular
            }
        }
        const route = routeInstance.route[cmp]?.path;

        const cmpRegistror = $still.context.componentRegistror.componentList;
        const cmpInstance = cmpRegistror[cmp]?.instance
        const isHomeCmp = StillAppSetup.get().entryComponentName == cmp;
        const isLoneCmp = Router.clickEvetCntrId != null && Router.clickEvetCntrId != 'null';
        if (isHomeCmp && isLoneCmp) {

            if (cmp in cmpRegistror) {

                $still.context.currentView = cmpInstance;
                if (
                    (!AppTemplate.get().isAuthN() && !cmpInstance.isPublic)
                    || !Components.obj().isInWhiteList(cmpInstance)
                ) document.write(authErrorMessage());

                Router.getAndDisplayPage($still.context.currentView, true, isHomeCmp);


            } else {

                (async () => {

                    const appTemplate = AppTemplate.get().template;
                    const { newInstance } = await (
                        await Components.produceComponent({ cmp, loneCntrId: Router.clickEvetCntrId })
                    );
                    $still.context.currentView = newInstance;

                    if ((!AppTemplate.get().isAuthN()
                        && !$still.context.currentView.isPublic)
                        || !Components.obj().isInWhiteList(newInstance)
                    ) document.write(authErrorMessage());

                    if ($still.context.currentView.template == undefined)
                        return Router.cmpTemplateNotDefinedCheck(cmp);

                    let template = (new Components()).getHomeCmpTemplate($still.context.currentView);
                    template = appTemplate.replace(
                        $stillconst.STILL_COMPONENT, `
                            <div id="${Router.appPlaceholder}" class="${$stillconst.TOP_LEVEL_CMP}">${template}</div>
                        `
                    );
                    const ctnrId = isLoneCmp ? Router.clickEvetCntrId : 'stillUiPlaceholder';
                    document.getElementById(ctnrId).innerHTML = template;
                    setTimeout(() => Router.callCmpAfterInit(null, isHomeCmp, Router.appPlaceholder));

                })();

            }

        } else {

            (async () => {
                if (!Router.importedMap[cmp]) {
                    if (cmp == 'init') return;

                    if (cmp instanceof Object)
                        if ('address' in cmp) cmp = cmp.address;

                    const wasPrevLoaded = Components.prevLoadingTracking.has(cmp);
                    /** the bellow line clears previous component from memory
                     * @type { ViewComponent } */
                    const { newInstance } = await (
                        await Components.produceComponent({ cmp, loneCntrId: Router.clickEvetCntrId })
                    );

                    AppTemplate.get().storageSet('stAppInitStatus', true);
                    if (newInstance.template == undefined)
                        return Router.cmpTemplateNotDefinedCheck(cmp);

                    if (newInstance.isPublic) {
                        if (!AppTemplate.get().isAuthN()) {
                            if (!Components.obj().isInWhiteList(newInstance))
                                return document.write(authErrorMessage());

                            if (url) Router.updateUrlPath(cmp);
                            return (new Components()).renderPublicComponent(newInstance);
                        }
                    }

                    ComponentRegistror.add(cmp, newInstance);
                    const isWhiteListed = Components.obj().isInWhiteList(newInstance);
                    if (!document.getElementById($stillconst.APP_PLACEHOLDER)
                        && !newInstance.isPublic && isWhiteListed
                    ) return document.write(authErrorMessage());

                    newInstance.isRoutable = true;
                    if (!wasPrevLoaded && !newInstance.lone)
                        if (!Router.importedMap[cmp]) Router.parseComponent(newInstance);
                    newInstance.setRoutableCmp(true);
                    if (isHomeCmp)
                        newInstance.setUUID($stillconst.TOP_LEVEL_CMP);

                    $still.context.currentView = newInstance;

                } else {
                    const oldInstance = cmpRegistror[cmp]?.instance;
                    $still.context.currentView = await (
                        await Components.produceComponent({ cmp })
                    ).newInstance;

                    if (oldInstance?.cmpInternalId)
                        $still.context.currentView.cmpInternalId = oldInstance.cmpInternalId;
                    $still.context.currentView.isRoutable = true;
                }
                Router.getAndDisplayPage($still.context.currentView, Router.importedMap[cmp]);
            })()
        }
        if (url) Router.updateUrlPath(cmp);

    }

    static updateUrlPath(cmp) {
        let routeName = cmp;
        if (cmp instanceof Object) routeName = cmp.address;

        const newPath = Router.routeMap[routeName].url;
        window.history.pushState(null, null, '#/');
        window.history.pushState(null, null, '#' + newPath);
    }

    static clearUrlPath() {
        window.history.pushState(null, null, '#/');
    }

    static replaceUrlPath(path) {
        window.history.pushState(null, null, '#/');
        window.history.pushState(null, null, '#' + path);
        Router.navigatingUrl = path;
    }
    /**
     * 1. Add new method for dynamic instantiation
     * 2. Add getter and setters for the components fields
     * @param { ViewComponent } cmp
     */
    static parseComponent(cmp) {
        if (!cmp.setAndGetsParsed) {
            cmp.setAndGetsParsed = true;
            setTimeout(() => {
                (new Components).getNewParsedComponent(cmp);
            });
        }
    }

    /**
     * the bellow line clears previous component from memory
     * @param { ViewComponent } cmp
     */
    static getAndDisplayPage(cmp, isReRender = false, isHome = false) {

        const appCntrId = Router.appPlaceholder, isPrivate = !cmp.isPublic;
        let appPlaceholder = document.getElementById(appCntrId), soleRouting;
        const isLoneCmp = Router.clickEvetCntrId != null && Router.clickEvetCntrId != 'null';

        if (isLoneCmp) {
            appPlaceholder = document.getElementById(Router.clickEvetCntrId);
            soleRouting = true;
        }
        const cmpId = cmp.getUUID(), cmpName = cmp.constructor.name;
        if (isReRender || isLoneCmp) {
            Components
                .unloadLoadedComponent(soleRouting && appPlaceholder)
                .then(async () => {
                    Router.handleUnauthorizeIfPresent();
                    if (Router.noPermAccessProcess(isPrivate, appPlaceholder, cmp)) return;
                    if (cmp.subImported) {
                        const pageContent = `
                        <output id="${cmpId}-check" class="cmp-name-page-view-${cmpName}" style="display:contents;">
                            ${cmp.getTemplate()}
                        </output>`;
                        appPlaceholder.insertAdjacentHTML('afterbegin', pageContent);
                        cmp.subImported = false;
                        setTimeout(() => {
                            cmp.parseOnChange();
                        }, 500);
                        await cmp.onRender();
                    } else {
                        await Components.reloadedComponent(cmp, isHome);
                    }
                    setTimeout(() => Router.callCmpAfterInit(`${cmpId}-check`, isHome));
                });

        } else {
            Components
                .unloadLoadedComponent(soleRouting && appPlaceholder)
                .then(async () => {
                    Router.handleUnauthorizeIfPresent();
                    if (Router.noPermAccessProcess(isPrivate, appPlaceholder, cmp)) return;
                    if (!appPlaceholder && cmp?.isPublic) {
                        appPlaceholder = document.getElementById($stillconst.UI_PLACEHOLDER);
                    }

                    const pageContent = `
                        <output id="${cmpId}-check" class="cmp-name-page-view-${cmpName}" style="display:contents;">
                            ${cmp.getTemplate()}
                        </output>`;

                    appPlaceholder.insertAdjacentHTML('afterbegin', pageContent);

                    setTimeout(() => cmp.parseOnChange(), 500);
                    setTimeout(() => {
                        if (!cmp.setAndGetsParsed) {
                            cmp.setAndGetsParsed = true;
                            (new Components)
                                .parseGetsAndSets(
                                    ComponentRegistror.component(cmp.cmpInternalId)
                                )
                        }
                    }, 10);
                    await cmp.onRender();
                    setTimeout(() => cmp.$stillLoadCounter = cmp.$stillLoadCounter + 1, 100);
                    setTimeout(() => Router.callCmpAfterInit(`${cmpId}-check`));
                    Router.importedMap[cmpName] = true;

                    ComponentRegistror.add(cmp.getUUID(), cmp);
                });
        }

    }


    static callCmpAfterInit(cmpId, isHome, appPlaceholder = null) {

        /**
         * Timer for keep calling the function wrapped code until it finds that the main 
         * component was loaded and proceeding compute (e.g. load subcomponent) can happen
         */
        let cmpRef = appPlaceholder;
        if (cmpRef == null) cmpRef = isHome ? $stillconst.TOP_LEVEL_CMP : cmpId;
        const loadTImer = setTimeout(async () => {
            /**
             * Check if the main component was loaded/rendered
             */
            if (document.getElementById(cmpRef)) {
                clearTimeout(loadTImer);
                /** @type { ViewComponent } */
                const cmp = $still.context.currentView;

                /**
                 * Runs stAfterInit special method in case it exists
                 */
                if (!Components.checkStInit(cmp.constructor.name))
                    setTimeout(() => Components.runAfterInit(cmp), 200);

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

            }

        }, 200);
        Components.removeOldParts();

    }

    static cmpTemplateNotDefinedCheck(cmpName) {
        document.write($stillconst.NO_TEMPLATE.replace('{{}}', cmpName));
    }

    static handleViewType(cmp) {

        if ((cmp.prototype instanceof ViewComponent)
            || (cmp.prototype instanceof BaseComponent)) cmp = cmp.stName;

        Router.navigatingView = cmp;
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

    static handleUnauthorizeIfPresent() {
        const unauthorizeContent = document.getElementById(ST_UNAUTHOR_ID);
        if (unauthorizeContent) {
            const parent = unauthorizeContent.parentElement;
            parent.removeChild(unauthorizeContent);
        }
    }

    static noPermAccessProcess(isPrivate, appPlaceholder, cmp) {

        const isUnauthorized = isPrivate && !AppTemplate.get().isAuthN();
        Router.handleUnauthorizeIfPresent();
        if (isUnauthorized && !Components.obj().isInWhiteList(cmp)) {
            appPlaceholder.insertAdjacentHTML('afterbegin', authErrorMessage());
            return true;
        }
        return false;

    }

    static getUrlPath() {

        let path = window.location.hash.replace('#', ''), address;
        let urlAndParams = path.split('?');
        const isThereParams = urlAndParams.length > 1;
        if (isThereParams) path = urlAndParams[0];

        let route = Router.routeMap[path];
        if (path.split('/').length > 2 || route?.isUrl) {

            route = route.path.split('/');
            address = `${route.pop()}`;
            path = `#/${address}`;
            route = route.join('/');

        } else {

            address = path.split('/')[1]?.trim();
            route = Router.routeMap[address]?.path;

        }

        if (isThereParams) {
            Router.navigatingView = address;
            Router.urlParams[address] = urlAndParams[1];
        }
        return route ? { address, route, path } : { state: false, path };
    }

    static getUrlParams() {

        let routeName = Router.navigatingView;
        if (Router.navigatingView instanceof Object)
            routeName = Router.navigatingView.address;

        const params = Router.urlParams[routeName];
        const result = params?.split('&')?.reduce((accum, param) => {
            const [key, value] = param.split('=');
            accum[key] = value;
            return accum;
        }, {});

        setTimeout(() => {
            Object.entries(Router.urlParams).forEach(([key, _]) => {
                if (Router.navigatingView != key) delete Router.urlParams[key];
            });
        }, 1000);

        return result;

    }

    static listenUrlChange() {

        const { address, path } = Router.getUrlPath();
        if (!address)
            window.location.assign('#');

        window.addEventListener('popstate', () => {

            let url = location.href.toString();
            if (
                url.slice(0, -3) == Router.baseUrl
                || url.slice(0, -2) == Router.baseUrl) {
                const homeComponent = (new StillAppSetup()).entryComponentName;
                return Router.goto(homeComponent);
            }

            url = url.toString().split("#");
            if (url == Router.navigatingUrl) return false;
            if (url[0]?.endsWith('?')) return Router.replaceUrlPath(url[1]);

            const route = Router.getUrlPath();

            if (route.path != '' && route.path != '#/') {
                if (route.address) Router.goto(route);
                else {
                    const pathValue = route.path.replace('#/', '/');
                    const err = $stillconst.MSG.UNKNOWN_ROUTE.replace('{{}}', pathValue)
                    document.write(err);
                }
            }
        });
    }

    static unknownRouteError() {
        const pathValue = route.path.replace('#/', '/');
        const err = $stillconst.MSG.UNKNOWN_ROUTE.replace('{{}}', pathValue)
        document.write(err);
    }

    static async getComponentFromPath() {
        const route = Router.getUrlPath();
        let cmpCls;
        if (route.address) {
            cmpCls = await (
                await Components.produceComponent(
                    { cmp: route.address, urlRequest: true, loneCntrId: Router.clickEvetCntrId }
                ));
        }
        return cmpCls?._class;
    }

    static getCleanUrl(url, clsName) {

        let baseUrl = Router.baseUrl;

        const currentUrl = baseUrl.split('//');
        if (currentUrl.length > 2)
            baseUrl = currentUrl.slice(0, 2).join('//') + '/';

        /** Edge case where the path is valid and component exists */
        if (baseUrl.indexOf(`//${clsName}`) > 0)
            baseUrl = Router.baseUrl.replace(`//${clsName}`, '/');

        if (url) baseUrl = baseUrl.replace(`/${clsName}`, '');

        /** Case where # or #/ was entered as the path */
        baseUrl = baseUrl.slice(-2) == '//' ? baseUrl.slice(0, -1) : baseUrl;

        return baseUrl;
    }

    static parsedRouteMap = {};
    static async parseRouteMap() {

        return new Promise((resolve) => {

            if (Object.keys(Router.parsedRouteMap).length == 0) {
                Object.entries(stillRoutesMap.viewRoutes.regular).map(([name, address]) => {

                    const path = address.url;

                    Router.parsedRouteMap[path] = {
                        path: address.path + '/' + name,
                        isUrl: true
                    };
                });
                const { regular } = stillRoutesMap.viewRoutes;
                stillRoutesMap.viewRoutes.regular = { ...regular, ...Router.parsedRouteMap };
                Router.routeMap = {
                    ...stillRoutesMap.viewRoutes.lazyInitial,
                    ...stillRoutesMap.viewRoutes.regular
                };
            };
            resolve('');
        })
    }

    static setStillHomeUrl = () =>
        Router.baseUrl = `${location.origin}/${STILL_HOME}`;

    static escape() {
        window.location.href = location.origin + '/#/' + Router.preView.getName();
        window.location.reload();
    }

}
