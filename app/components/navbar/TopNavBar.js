class CTopNavBar extends ViewComponent {

    htmlRefId = 'topNavBar';
    template = `
        <div class="container-fluid" style="margin-top: -7px;
        margin-left: -13px;">
            <div class="navbar-header">
                <a class="navbar-brand" href="index.html">
                    <img src="assets/images/logo.png" alt="" />
                    <span class="logo-name">Atrios</span>
                </a>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse" style="position: fixed; width: 100%; padding-left: 235px">
                <ul class="nav navbar-nav navbar-left">
                    <li>
                        <a href="#" onClick="return false;" class="sidemenu-collapse">
                            <i class="nav-hdr-btn ti-align-left"></i>
                        </a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <!-- Full Screen Button 
                    <li class="fullscreen">
                        <a href="javascript:;" class="fullscreen-btn">
                            <i class="nav-hdr-btn ti-fullscreen"></i>
                        </a>
                    </li>
                    -->
                    <!-- #END# Full Screen Button -->
                    <!-- #START# Notifications-->
                    <li class="dropdown">
                        <a href="#" onClick="return false;" class="dropdown-toggle" data-toggle="dropdown"
                            role="button">
                            <i class="nav-hdr-btn ti-bell"></i>
                            <span class="notify"></span>
                            <!--<span class="heartbeat"></span>-->
                        </a>
                        <ul class="dropdown-menu pullDown">
                            <li class="header">NOTIFICATIONS</li>
                            <li class="body">
                                <div style="display: flex; padding-left: 10px ">
                                    <p>Sem notificações</p>
                                </div>
                                <!--<ul class="menu">
                                </ul>-->
                            </li>
                            <li class="footer">
                                <a href="#" (click)="gotoView('UserNotification')">Ver todas as Notificações</a>
                            </li>
                        </ul>
                    </li>
                    <!-- #END# Notifications-->
                    <li class="dropdown user_profile">
                        <div class="dropdown-toggle" data-toggle="dropdown">
                            <img src="assets/images/user.jpg" alt="user">
                        </div>
                        <ul class="dropdown-menu pullDown">
                            <li class="body">
                                <ul class="user_dw_menu">
                                    <li>
                                        <a href="#" (click)="gotoView('UserProfile')">
                                            <i class="material-icons">person</i>Teu Perfil
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" (click)="gotoView('Home')">
                                            <i class="material-icons">power_settings_new</i>Sair do Julaw
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <!-- #END# Tasks -->
                    <li class="pull-right" style="padding-right: 15px">
                      
                    </li>
                </ul>
            </div>
        </div>    
    `;

    constructor(){
        super();
        console.log(`instantiated top nav bar added plus`);
    }

    gotoView(viewComponent) {
        Router.goto(viewComponent);
    }

}

const TopNavBar = $still.component.expose(new CTopNavBar());