class CCalendar extends ViewComponent {

    htmlRefId = 'dashboardCalendar';
    template = `
    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
        <div class="card">
            <div class="header">
                <h2>
                    <strong>Calendar</strong>
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
                <div class="deskCal">
                    <div id='desktopCal'></div>
                </div>
            </div>
        </div>
    </div>
    `;

}

/** @type { CCalendar } */
const Calendar = $still.component.expose(new CCalendar());