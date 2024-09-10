
const cardColors = {
    1:'l-bg-green',
    2:'l-bg-purple',
    3:'l-bg-orange',
    4:'l-bg-cyan',
}

const cardData = [
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

class DashboardCard extends BaseComponent {

    mainLabel;
    statusValue;
    score;

    template = `
        <div class="col-lg-3 col-sm-6">
            <div class="info-box7 {{className}} order-info-box7">
                <div class="info-box7-block">
                    <h4 class="m-b-20">@mainLabel</h4>
                    <h2 class="text-right"><i class="fas fa-cart-plus pull-left"></i><span>@score</span></h2>
                    <p class="m-b-0">@statusValue</p>
                </div>
            </div>
        </div>
    `;


    constructor({ mainLabel, statusValue, score } = {}){
        super();
        this.mainLabel = mainLabel;
        this.statusValue = statusValue;
        this.score = score;
        /* this.setup({
            componentName, 
            path,
            imports: []
        }); */
    }

}