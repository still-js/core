class CProjectGrid extends ViewComponent {

    htmlRefId = 'projectGrid';
    template = `
    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
        <div class="card">
            <div class="header">
                <h2>
                    <strong>Novos </strong>Processos
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
                <div id="new-orders" class="media-list position-relative">
                    <div class="table-responsive">
                        <table id="new-orders-table" class="table table-hover table-xl mb-0">
                            <thead>
                                <tr>
                                    <th class="border-top-0">Cliente</th>
                                    <th class="border-top-0">Equipa</th>
                                    <th class="border-top-0">Estado</th>
                                </tr>
                                </thead>
                            <tbody>
                                <tr>
                                    <th class="border-top-0">Cliente</th>
                                    <th class="border-top-0">Equipa</th>
                                    <th class="border-top-0">Estado</th>
                                </tr>
                                <tr>
                                    <td class="text-truncate">Manuel Francisco</td>
                                    <td class="text-truncate">
                                        <ul class="list-unstyled order-list">
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user1.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user3.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <span class="badge">+2</span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td class="text-truncate">Em Análise</td>
                                </tr>
                                <tr>
                                    <td class="text-truncate">Amélia Simão</td>
                                    <td class="text-truncate">
                                        <ul class="list-unstyled order-list">
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user4.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user5.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user6.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <span class="badge">+4</span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td class="text-truncate">Por validar</td>
                                </tr>
                                <tr>
                                    <td class="text-truncate">André Dias</td>
                                    <td class="text-truncate">
                                        <ul class="list-unstyled order-list">
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user7.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user8.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <img class="rounded-circle"
                                                    src="assets/images/user/user9.jpg" alt="user">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <span class="badge">+3</span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td class="text-truncate">Em execução</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `

}

/** @type {CProjectGrid} */
const ProjectGrid = $still.component.expose(new CProjectGrid());