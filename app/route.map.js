/**
 * Don't change the constante name as it'll impact on the component routing
 */
const routesMap = {
    viewRoutes: {
        regular:{
            ClientForm: 'components/client',
            Home: 'components/home',
            ClientsGrid: 'components/client',
        },
        lazyInitial: {
            MorCompo: 'components/client',
        }
    },
}







































let routeMapInverse = [];
function $stillGetRouteMap(){

    if(!routeMapInverse.length){
        
        routeMapInverse = Object
            .entries(routesMap.viewRoutes)
            .reduce((accum, [cmp, path]) => {
                accum[path] = cmp;
                return accum;
            }, {});
    }

    return {
        route: {
            ...routesMap.viewRoutes.regular, 
            ...routesMap.viewRoutes.lazyInitial 
        },
        inverse: routeMapInverse
    }
}