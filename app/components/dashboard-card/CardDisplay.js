const cardDataSource = [
    { 
        state: {
            mainLabel: `First Card`,
            statusValue: `18% Higher Then Last Month`,
            score: `358`
        },
        props: { className: 'l-bg-green' } 
    },
    { 
        state: {
            mainLabel: `Completed Orders`,
            statusValue: `21% Higher Then Last Month`,
            score: `856`
        },
        props: { className: 'l-bg-purple' } 
    },
    { 
        state: {
            mainLabel: `New Orders`,
            statusValue: `37% Higher Then Last Month`,
            score: `128`
        },
        props: { className: 'l-bg-orange' } 
    },
    { 
        state: {
            mainLabel: `Total Earnings`,
            statusValue: `10% Higher Then Last Month`,
            score: `25698`
        },
        props: { className: 'l-bg-cyan' } 
    },
]


class CardDisplay extends ViewComponent {

    beforeInit(){
        this.template = cardDataSource.map(
            rec => {
                return new DashboardCard(rec.state)
                .props(rec.props).return()
            }
        );
    }
    
    constructor(){
        super();
        this.renderOnViewFor('dashBoardCards');
    }

}