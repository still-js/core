class Menu extends ViewComponent {
  htmlRefId = "leftsidebar";

  userName;
  userRole = "Admin";

  roles;
  devProfile = Prop(false);
  canCreateProcess = Prop(false);

  template = `
  <aside id="leftsidebar" class="sidebar">
    <ul class="menu-julaw">
      <li>
        <div class="sidebar-profile clearfix">
            <div class="profile-info">
              <h3 id="userNameMenuPlaceholder"></h3>
              Logado como:
              <p>@userName</p>
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
      <li (renderIf)="self.devProfile" class="menu-item-julaw">
            <a href="#" class="item-menu"><i class="fas fa-user"></i> POC</a>
            <ul class="submenu">
                  <li><a href="#" (click)="gotoView('POC')"> Generico </a></li>
            </ul>
      </li>
      <li class="menu-item-julaw">
          <a href="#" class="item-menu"  (click)="gotoView('Despesas')"><i class="fas fa-file-invoice"></i> Despesas</a>
      </li>
    </ul>
  </aside>
    `;

  getRolesByLoggedUser() {
    try {
      const userLogged = JSON.parse(localStorage.getItem("_user"));
      this.userName = userLogged.nome_completo;
      this.roles = userLogged.auth.roles;
    } catch (e) {
      console.log(e)
    }
  }

  stAfterInit(val) {
    setTimeout(() => Menu.propagateEventsIntoAllItemMenu(), 2000);
  }

  constructor() {
    super();
    this.setup({});
    this.getRolesByLoggedUser();
  }

  async onRender() {
    this.canCreateProcess = this.roles.includes('CAN_CREATE_PROCESS');
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  static propagateEventsIntoAllItemMenu() {
    const elms = document.querySelectorAll(".item-menu");

    elms.forEach(function (elm) {
      elm.addEventListener("click", (e) => {
        console.log(e);
        e.preventDefault();
        Menu.removeAllActiveClassIntoMenuLi();
        Menu.removeAllActiveClassIntoMenuLiA();

        console.log(elm.parentNode);
        console.log(elm.parentElement);
        elm.classList.add("active");

        try {
          elm.parentNode.classList.add("active");
        } catch (e) {
          console.log(e);
        }
      });
    });
  }

  static removeAllActiveClassIntoMenuLi() {
    const elms = document.querySelectorAll(".menu-item-julaw");
    elms.forEach(function (elm) {
      elm.classList.remove("active");
    });
  }

  static removeAllActiveClassIntoMenuLiA() {
    const elms = document.querySelectorAll(".item-menu");
    elms.forEach(function (elm) {
      elm.classList.remove("active");
    });
  }

}