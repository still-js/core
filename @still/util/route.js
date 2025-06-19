import { StillAppSetup } from "../../config/app-setup.js";
import { StillError } from "../setup/error.js";

let filePathAltered = false;
export async function getRoutesFile(defaultFile) {
    try {

        if (STILL_HOME) {
            const routesFilePath = `${location.origin}/${STILL_HOME}config/route.map.js`;
            const _module = await import(routesFilePath);
            if (!filePathAltered) {
                filePathAltered = true;
                console.info(`Components will be routed from ${routesFilePath}`);
            }
            return _module['stillRoutesMap'];
        }

    } catch (error) { }

    return defaultFile;
}

export function getRouter(defaultRouter) {
    try {
        if (Router) return Router;
    } catch (error) {
        return defaultRouter;
    }
}

export function getViewComponent(defaultViewComponent) {
    try {
        if (ViewComponent) return ViewComponent;
    } catch (error) {
        return defaultViewComponent;
    }
}

export function getBasePath(type = null, servicePath = null) {
    try {
        if (STILL_HOME) {
            const basePath = `${location.origin}/${STILL_HOME}`;
            return `${basePath}${type == 'service' ? `app/${servicePath ? servicePath + '' : ''}` : ''}`;
        }
    } catch (error) { }

    if (servicePath && servicePath?.length > 0)
        return `${location.origin}/app/${servicePath}`;

    return `${location.origin}/app/`;
}

export function  getServicePath(type, svcPath, injecter) {
    let path = svcPath == '' ? StillAppSetup.get().servicePath : '';
    if(path == undefined) StillError.undefinedPathInjectionError(type, injecter);
    if (path?.startsWith('/')) path = path.slice(1);
    if (path?.endsWith('/')) path = path.slice(0, -1);
    path = getBasePath('service', svcPath) + '' + path;
    return path + '/' + type + '.js';
}