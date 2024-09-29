class CBarChart extends ViewComponent {

    htmlRefId = 'barCharPlaceholder';
    novoField = '';
    template = `
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6" (click)="parsingForBar()">
        <div class="card">
            <div class="header">
                <h2>
                    <strong>Chart</strong> Sample
                </h2>
                <ul class="header-dropdown m-r--5">
                    <li class="dropdown">
                        <a href="#" onClick="return false;" class="dropdown-toggle" data-toggle="dropdown"
                            role="button" aria-haspopup="true" aria-expanded="false">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <ul class="dropdown-menu pull-right">
                            <li>
                                <a href="#" onClick="return false;">Action</a>
                            </li>
                            <li>
                                <a href="#" onClick="return false;">Another action</a>
                            </li>
                            <li>
                                <a href="#" onClick="return false;">Something else here</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="body">
                <div id="amChartCylinderHome"></div>
                <div class="row">
                    <div class="col-4">
                        <p class="text-muted font-15 text-truncate">Target</p>
                        <h5>
                            <i class="fas fa-arrow-circle-down col-red m-r-5"></i>$15.3k
                        </h5>
                    </div>
                    <div class="col-4">
                        <p class="text-muted font-15 text-truncate">Last
                            week</p>
                        <h5>
                            <i class="fas fa-arrow-circle-up col-green m-r-5"></i>$2.8k
                        </h5>
                    </div>
                    <div class="col-4">
                        <p class="text-muted text-truncate">Last
                            Month</p>
                        <h5>
                            <i class="fas fa-arrow-circle-down col-red m-r-5"></i>$12.5k
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    parsingForBar(){
        alert('First content');
        this.novoField = 'Novo valor';
    }

}

/** @type {CBarChart} */
const BarChart = $still.component.expose(new CBarChart());