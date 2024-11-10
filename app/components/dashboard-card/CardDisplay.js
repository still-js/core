const cardDataSource = [
    {
        state: {
            mainLabel: `Total de Processos`,
            statusValue: `Total de processos até o momento`,
            score: `358`
        },
        props: {
            className: 'l-bg-green',
            iconClass: 'fas fa-archive'
        }
    },
    {
        state: {
            mainLabel: `Total de Clientes`,
            statusValue: `Clientes registados até ao momento`,
            score: `856`
        },
        props: {
            className: 'l-bg-purple',
            iconClass: 'fas fa-users'
        }
    },
    {
        state: {
            mainLabel: `Horas Lançadas`,
            statusValue: `Lançamentos a nível do Timesheet`,
            score: `128`
        },
        props: {
            className: 'l-bg-orange',
            iconClass: 'far fa-calendar-alt'
        }
    },
    {
        state: {
            mainLabel: `Horas Cobradas`,
            statusValue: `Cobranças com base nos Timesheets`,
            score: `25698`
        },
        props: {
            className: 'l-bg-cyan',
            iconClass: 'fas fa-file-invoice-dollar'
        }
    },
]


class CCardDisplay extends ViewComponent {

    htmlRefId = 'dashBoardCards';
    /** @type { StEvent } */
    cardDataSource = cardDataSource;

    updateComponent() {
        this.template = this.cardDataSource.value.map(
            rec => DashboardCard.new(rec.state)
                .props(rec.props)
                .getTemplate()
        );
    }

    beforeInit() {
        this.template = this.cardDataSource.value.map(
            rec => DashboardCard.new(rec.state)
                .props(rec.props)
                .getTemplate()
        );
    }

    stOnUpdate() {
        console.log(`Called Card Display on Update: `, this.cardDataSource);
    }

    callAlert() {
        alert('Alert called');
    }

    constructor() {
        super();
        //this.renderOnViewFor('dashBoardCards');
    }


}

/** @type {CCardDisplay} */
const CardDisplay = $still.component.expose(new CCardDisplay());