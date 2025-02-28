
/**
 * Don't change the constante name as it'll impact on the component routing
 */
export const stillRoutesMap = {

    viewRoutes: {
        regular: {
            Login: 'components/auth',
            Home: 'components/home',
            ClientsGrid: 'components/client',
        },
        lazyInitial: {
            BarChart: 'components/charts',
            LineChart: 'components/charts',
            CircularAnimatedChart: 'components/charts',
            ProjectGrid: 'components/project-list',
            ClientForm: 'components/client',
            Calendar: 'components/calendar',
            CardDisplay: 'components/dashboard-card',
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
            DespesasForm: 'components/despesas',
            POC: 'components/uipoc',
            CreateButton: 'components/generics/button',
            TopNavBar: 'components/navbar',
            Menu: 'components/main-menu',
            ProcessoTimeSheet: 'components/processos'
        }
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