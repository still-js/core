/**
 * Don't change the constante name as it'll impact on the component routing
 */
const routesMap = {
    viewRoutes: {
        regular: {
            Login: 'components/auth',
            Home: 'components/home',
            ClientsGrid: 'components/client',
        },
        lazyInitial: {
            ClientForm: 'components/client',
            ClienteDetalhes: 'components/client',
            ColaboradorForm: 'components/colaboradores',
            ColaboradoresGrid: 'components/colaboradores',
            ColaboradorDashboard: 'components/colaboradores',
            ColaboradorDetalhes: 'components/colaboradores',
            UserProfile: 'components/colaboradores',
            UserNotification: 'components/colaboradores',
            ProcessoForm: 'components/processos',
            ProcessosGrid: 'components/processos',
            ProcessoDetalhes: 'components/processos',
            Factura: 'components/factura',
            ModalPagamento: 'components/modal',
            ModalListPagamentos: 'components/modal',
            ModalDetalhesFactura: 'components/modal',
            Despesas: 'components/despesas',
            POC: 'components/uipoc',
            CreateButton: 'generics/button',
        }
    },
}




let routeMapInverse = [];
function $stillGetRouteMap() {

    /* if (!routeMapInverse.length) {

        routeMapInverse = Object
            .entries(routesMap.viewRoutes)
            .reduce((accum, [cmp, path]) => {
                accum[path] = cmp;
                return accum;
            }, {});
    } */

    return {
        route: {
            ...routesMap.viewRoutes.regular,
            ...routesMap.viewRoutes.lazyInitial
        },
        //inverse: routeMapInverse
    }
}