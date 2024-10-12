class CMenu extends ViewComponent {

  htmlRefId = "leftsidebar";

  template = `
    <ul class="menu">
        <li><a href="#"  (click)="gotoView('Home')"><i class="fas fa-home"></i> Início</a></li>
        <li class="active">
            <a href="#servicos"><i class="fas fa-folder"></i> Processos</a>
            <ul class="submenu">
                <li><a href="#" (click)="gotoView('ProcessoForm')"> Criar </a></li>
                <li><a href="#" (click)="gotoView('ProcessosGrid')"> Listar </a></li>
            </ul>
        </li>
        <li>
            <a href="#servicos"><i class="fas fa-users"></i> Clientes</a>
            <ul class="submenu">
                <li><a href="#" (click)="gotoView('ClientForm')"> Cadastrar </a></li>
                <li><a href="#" (click)="gotoView('ClientsGrid')"> Listar</a></li>
            </ul>
        </li>
        <li>
            <a href="#servicos"><i class="fas fa-user"></i> Colaboradores</a>
            <ul class="submenu">
                  <li><a href="#" (click)="gotoView('ColaboradorForm')"> Cadastrar </a></li>
                  <li><a href="#"  (click)="gotoView('ColaboradoresGrid')"> Listar</a></li>
            </ul>
        </li>
        <li><a href="#"><i class="fas fa-envelope"></i> Contato</a></li>
    </ul>
    `;

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  logout() {
    Router.goto("exit");
  }

  constructor() {
    super();
    this.setup({});
  }
}

const Menu = $still.component.expose(new CMenu());
