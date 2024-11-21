class Menu extends ViewComponent {
  htmlRefId = "leftsidebar";

  userName = ``;
  userRole = "Admin";

  roles;
  canCreateProcess = Prop(false);

  template = `
  <aside id="leftsidebar" class="sidebar">
    <ul class="menu-julaw">
      <li>
        <div class="sidebar-profile clearfix">
            <div class="profile-info">
              <h3 id="userNameMenuPlaceholder"></h3>
              <p>Menu Principal</p>
            </div>
        </div>
      </li>
        
      <li class="menu-item-julaw">
          <a href="#" class="item-menu"  (click)="gotoView('Home')"><i class="fas fa-home"></i> Início</a>
      </li>
      <li class="menu-item-julaw active">
            <a class="item-menu active" href="#"><i class="fas fa-folder"></i> Processos</a>
            <ul class="submenu">
                <li
                  (renderIf)="self.canCreateProcess"
                  ><a href="#" (click)="gotoView('ProcessoForm')"> Criar </a></li>
                <li><a href="#" (click)="gotoView('ProcessosGrid')"> Listar </a></li>
                <li><a href="#" (click)="gotoView('ColaboradorDashboard')">Meus Processos </a></li>
            </ul>
      </li>
      <li class="menu-item-julaw">
            <a href="#" class="item-menu "><i class="fas fa-users"></i> Clientes</a>
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
  </aside>
    `;

  getRolesByLoggedUser() {
    try {
      const userLogged = JSON.parse(localStorage.getItem("_user"));
      this.roles = userLogged.auth.roles;
    } catch (e) {
      console.log(e)
    }
  }


  stAfterInit(val) {

    //this.roles.includes('CAN_CREATE_PROCESS')

  }

  async onRender() {
    /**
     * Isso quer dizer que o import do JQuery foi feito no index principal
     * ou no ficheiro de rotas em eagerImport
     */
    this.canCreateProcess = this.roles.includes('CAN_CREATE_PROCESS');
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }


  constructor() {
    super();
    //this.userName = AppTemplate.get().storageGet('userName');
    this.setup({});
    this.getRolesByLoggedUser();
  }

}

//const Menu = $still.component.expose(new CMenu());
