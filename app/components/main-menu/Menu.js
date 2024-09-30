class CMenu extends ViewComponent {

    htmlRefId = 'leftsidebar';
    template = `
        <div class="main-side-menu">

            <ul>
                <li>
                    <a href="#" (click)="gotoView('Home')">
                        <i class="menu-icon ti-home"></i>
                        <span>Início</span>
                    </a>
                </li>

                <li class="active">
                    <a href="#" onClick="return false;" class="menu-toggle">
                        <i class="menu-icon ti-home"></i>
                        <span>Cadastros</span>
                    </a>
                    <ul class="ml-menu" (if)="utilzador.persmisoe['Admin']">
                        <li class="active">
                            <a href="#" (click)="gotoView('ClientsGrid')">Ver Clientes</a>
                        </li>
                        <li class="active">
                            <a href="#" (click)="gotoView('ClientForm')">Cadastrar Cliente</a>
                        </li>
                        <li>
                            <a href="#" (click)="gotoView('Osvaldo')">Colaborador</a>
                        </li>
                        <li>
                            <a href="#" (click)="gotoView('NovoMenuComponent')">Novo Menu</a>
                        </li>
                    </ul>
                </li>

            </ul>

        </div>

    `;

    gotoView(viewComponent){
        Router.goto(viewComponent);
    }

    constructor(){
        super();
        this.setup({});
    }

}

const Menu = $still.component.expose(new CMenu());