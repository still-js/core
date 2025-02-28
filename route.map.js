
/**
 * Don't change the constante name as it'll impact on the component routing
 */
export const stillRoutesMap = {

    viewRoutes: {
        regular: {
            HomeComponent: 'app/home',
        },
        lazyInitial: {}
    },
}




let routeMapInverse = [];
export function $stillGetRouteMap() {

    /* if (!routeMapInverse.length) {

        routeMapInverse = Object
            .entries(stillRoutesMap.viewRoutes)
            .reduce((accum, [cmp, path]) => {
                accum[path] = cmp;
                return accum;
            }, {});
    } */

    return {
        route: {
            ...stillRoutesMap.viewRoutes.regular,
            ...stillRoutesMap.viewRoutes.lazyInitial
        },
        //inverse: routeMapInverse
    }
}