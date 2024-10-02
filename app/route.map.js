/**
 * Don't change the constante name as it'll impact on the component routing
 */
const routesMap = {
    viewRoutes: {
        regular: {
            LayoutBase: 'components/layout',
            Login: 'components/auth',
            ClientForm: 'components/client',
            Home: 'components/home',
            ClientsGrid: 'components/client',
            AuthBase: 'components/auth',
        },
        lazyInitial: {
            MorCompo: 'components/client',
            ColaboradorForm: 'components/colaboradores',
            ColaboradorGrid: 'components/colaboradores',
        }
    },
}







































let routeMapInverse = [];
function $stillGetRouteMap() {

    if (!routeMapInverse.length) {

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