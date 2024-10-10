/**
 * Don't change the constante name as it'll impact on the component routing
 */
const routesMap = {
    viewRoutes: {
        regular: {
            Login: 'components/auth',
            Home: 'components/home',
            ClientForm: 'components/client',
            ClientsGrid: 'components/client',
        },
        lazyInitial: {
            ColaboradorForm: 'components/colaboradores',
            ColaboradorGrid: 'components/colaboradores',
            ProcessoForm: 'components/processos',
            ProcessosGrid: 'components/processos',
            ProcessoDetalhes: 'components/processos',
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