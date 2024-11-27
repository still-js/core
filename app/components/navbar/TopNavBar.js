class TopNavBar extends ViewComponent {

    htmlRefId = "topNavBar";
    totalNotifications = 0;

    /**
     * @Inject
     * @type { ProcessoService } }
     */
    processoService;

    template = `
    <nav class="navbar" id="topNavBar" style="position: fixed;">
        <div class="container-fluid" style="margin-top: -7px;
        margin-left: -13px;">
            <div class="navbar-header">
                <a class="navbar-brand" href="index.html">
                    <img 
                        src="assets/images/julaw-logo.png" 
                        style="width: 42px;"
                        alt="" 
                    />
                    <span class="logo-name">SOFTLAW</span>
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
                        <a href="#" 
                            onClick="return false;" 
                            class="dropdown-toggle ring-ball-top-nav-bar" 
                            data-toggle="dropdown"
                            counter="@totalNotifications"
                            data-display="none"
                            id="toMenuBarTotalNotification"
                            role="button">
                            <i class="nav-hdr-btn ti-bell"></i>
                            <span class="notify"></span>
                            <span class="heartbeat"></span>
                        </a>
                        <ul class="dropdown-menu pullDown">
                            <li class="header">NOTIFICAÇÕES</li>
                            <li class="body" style="width: 100%;" id="toMenuBarListaNotification">
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
                                        <a href="#" (click)="logout()">
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
    </nav>
    
    <style id="thisIsMenuStyle">

        :root{
            --display: none;
        }

        .notify, .heartbeat {
            display: var(--display);
        }

        .ring-ball-top-nav-bar::before {
            content: attr(counter);
            display: var(--display);
            position: absolute;
            margin-left: 17px;
            margin-top: 5px;
            background: #c859599c;
            color: white;
            width: 20px;
            text-align: center;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }

        
        #toMenuBarListaNotification .notification-late-task {
                background: #d011112e !important;
                color: red !important;
                font-weight: 600;
        }

        #toMenuBarListaNotification .task-item {
            border-top: 1px solid #8080803d;
            display: flex; 
            justify-content: space-between; 
            padding: 0 10px 0 10px; 
        }
        
        #toMenuBarListaNotification .task-item:nth-child(odd) {
            background: #8080801c;
        }

    </style>
    
    `;


    async stAfterInit() {

        this.processoService.on('load', async () => {
            const notifications = await this.processoService.getTarefaByColaboradorId();
            this.parseAndDisplayNotifications(notifications);
        });
    }

    parseAndDisplayNotifications(notifications) {

        let listaNotificacoes = `
            <div style="display: flex; padding-left: 10px ">
                <p>Sem notificações</p>
            </div>`;

        const totalNotif = notifications.length;
        if (totalNotif) {

            document.getElementById('toMenuBarTotalNotification').setAttribute('counter', totalNotif);
            document.documentElement.style.setProperty('--display', 'block');
            listaNotificacoes = notifications.map(r => {

                let textComplement = '1 Dia';
                let lateTaskClass = '';
                if (r.dias_em_falta < 0) {
                    textComplement = `${r.dias_em_falta.toString().slice(1)} Atrás`;
                    lateTaskClass = `notification-late-task`;
                }

                if (r.dias_em_falta > 0) {
                    textComplement = `Em ${r.dias_em_falta} Dias`;
                }

                return `
                <div class="task-item ${lateTaskClass}">
                    <div>
                        ${r.descricao.slice(0, 30)}
                    </div>
                    <div>
                        ${textComplement}
                    </div>
                </div>
            `;

            })?.join('');

        }

        document
            .getElementById('toMenuBarListaNotification')
            .insertAdjacentHTML('afterbegin', listaNotificacoes);

    }

    gotoView(viewComponent) {
        Router.goto(viewComponent);
    }

    logout() {

        localStorage.clear();
        Router.goto("exit");

    }
}