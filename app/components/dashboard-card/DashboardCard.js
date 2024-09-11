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