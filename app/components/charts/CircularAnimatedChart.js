import { ViewComponent } from "../../@still/component/super/ViewComponent.js";

export class CircularAnimatedChart extends ViewComponent {

    htmlRefId = 'animateCharts'
    template = `
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div class="card">
            <div class="header">
                <h2>
                    <strong>Chart</strong> Data
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
                <div id="chartdata1" class="p-t-20"></div>
                <div class="text-center m-t-50">
                    <h2 class="font-25 col-green">$150</h2>
                    <small>21% <i class="fas fa-arrow-up col-green"></i>
                        Increase Today</small>
                </div>
            </div>
        </div>
    </div>
    
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div class="card">
            <div class="header">
                <h2>
                    <strong>Chart</strong> Data
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
                <div id="chartdata2" class="p-t-20"></div>
                <div class="text-center m-t-50">
                    <h2 class="font-25 col-green">$150</h2>
                    <small>21% <i class="fas fa-arrow-up col-green"></i>
                        Increase Today</small>
                </div>
            </div>
        </div>
    </div>

    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div class="card">
            <div class="header">
                <h2>
                    <strong>Chart</strong> Data
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
                <div id="chartdata3" class="p-t-20"></div>
                <div class="text-center m-t-50">
                    <h2 class="font-25 col-green">$150</h2>
                    <small>21% <i class="fas fa-arrow-up col-green"></i>
                        Increase Today</small>
                </div>
            </div>
        </div>
    </div>
    
    <style>
        #barCharPlaceholder .row,
        #barCharPlaceholder .header,
        #lineCharPlaceholder .row,
        #lineCharPlaceholder .header{
            display: none;
        }
    </style>
    
    `;

}

///** @type {CCircularAnimatedChart} */
//const CircularAnimatedChart = $still.component.expose(new CCircularAnimatedChart());