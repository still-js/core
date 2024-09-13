/**
 * Don't change the constante name as it'll impact on the component routing
 */
const routesMap = {
    viewRoutes: {
        ClientForm: 'components/client',
        Home: 'components/home',
        ClientsGrid: 'components/client'
    }
}







































let routeMapInverse = [];
function getRouteMap(){

    if(!routeMapInverse.length){
        routeMapInverse = Object
            .entries(routesMap.viewRoutes)
            .reduce((accum, [cmp, path]) => {
                accum[path] = cmp;
                return accum;
            }, {});
    }

    return {
        route: routesMap.viewRoutes,
        inverse: routeMapInverse
    }
}