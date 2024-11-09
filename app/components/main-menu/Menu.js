class CMenu extends ViewComponent {
  htmlRefId = "leftsidebar";

  userName = "Sarah Deo";
  userRole = "Admin";

  template = `
    <ul class="menu-julaw">
      <li>
        <div class="sidebar-profile clearfix">
            <div class="profile-img">
              <img src="../../assets/images/usrbig.jpg" alt="profile">
            </div>
            <div class="profile-info">
              <h3>@userName</h3>
              <p>Welcome @userRole</p>
            </div>
        </div>
      </li>
        
      <li class="menu-item-julaw">
          <a href="#" class="item-menu"  (click)="gotoView('Home')"><i class="fas fa-home"></i> Início</a>
      </li>
      <li class="menu-item-julaw">
            <a class="item-menu" href="#"><i class="fas fa-folder"></i> Processos</a>
            <ul class="submenu">
                <li><a href="#" (click)="gotoView('ProcessoForm')"> Criar </a></li>
                <li><a href="#" (click)="gotoView('ProcessosGrid')"> Listar </a></li>
                <li><a href="#" (click)="gotoView('ColaboradorDashboard')"> Meus Processos </a></li>
            </ul>
      </li>
      <li class="menu-item-julaw active">
            <a href="#" class="item-menu active"><i class="fas fa-users"></i> Clientes</a>
            <ul class="submenu">
                <li><a href="#" (click)="gotoView('ClientForm')"> Cadastrar </a></li>
                <li><a href="#" (click)="gotoView('ClientsGrid')"> Listar</a></li>
            </ul>
      </li>
      <li class="menu-item-julaw">
            <a href="#" class="item-menu"><i class="fas fa-user"></i> Colaboradores</a>
            <ul class="submenu">
                  <li><a href="#" (click)="gotoView('ColaboradorForm')"> Cadastrar </a></li>
                  <li><a href="#"  (click)="gotoView('ColaboradoresGrid')"> Listar</a></li>
            </ul>
        </li>
    </ul> 
    `;

  stAfterInit(val) {}

  async onRender() {
    /**
     * Isso quer dizer que o import do JQuery foi feito no index principal
     * ou no ficheiro de rotas em eagerImport
     */
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  constructor() {
    super();
    this.setup({});
  }

}

const Menu = $still.component.expose(new CMenu());
