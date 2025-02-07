class Menu extends ViewComponent {
  htmlRefId = "leftsidebar";

  userId;
  userName;
  userRole = "Admin";
  userFuncao;

  roles;
  /** @Prop */
  devProfile = false;

  /** @Prop */
  canSeeHomePage = false;
  /** @Prop */
  canCreateProcess = false;
  /** @Prop */
  canListProcess = false;
  /** @Prop */
  canListMineProcess = false;

  /** @Prop */
  canCreateClient = false;
  /** @Prop */
  canListClient = false;

  /** @Prop */
  canCreateColaborador = false;
  /** @Prop */
  canListColaborador = false;

  /** @Prop */
  canCreateDespesasr = true;
  /** @Prop */
  canListDespesas = true;

  template = `
  <aside id="leftsidebar" class="sidebar" style="padding: 0">
    <ul class="menu-julaw">
      <li>
        <div class="sidebar-profile clearfix" 
          style="background: #6a2021; margin: 0; width: 100%; color: #fff;">
            <div class="profile-info">
            <div style="display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 75px;
                  gap: 2px;">
                <div>
                  <i class="material-icons">person</i>
                </div>
                <p style="color: #fff; font-size: 14px; margin-bottom: 0">@userName</p>
              </div>
            </div>
        </div>
      </li>
        
      <li class="menu-item-julaw" (renderIf)="self.canSeeHomePage">
          <a href="#" class="item-menu"  (click)="gotoView('Home')"><i class="fas fa-home"></i> Início</a>
      </li>
      <li class="menu-item-julaw active">
            <a class="item-menu active" href="#"><i class="fas fa-folder"></i> Processos</a>
            <ul class="submenu">
                <li (renderIf)="self.canCreateProcess">
                    <a href="#" (click)="gotoView('ProcessoForm')"> Criar </a>
                </li>
                <li (renderIf)="self.canListProcess">
                  <a href="#" (click)="gotoView('ProcessosGrid')"> Listar </a>
                </li>
                <li (renderIf)="self.canListMineProcess"><a href="#" (click)="gotoView('ColaboradorDashboard')">Meus Processos </a></li>
            </ul>
      </li>
      <li class="menu-item-julaw">
            <a href="#" class="item-menu "><i class="fas fa-users"></i> Clientes</a>
            <ul class="submenu">
                <li (renderIf)="self.canCreateClient">
                  <a href="#" (click)="gotoView('ClientForm')"> Cadastrar </a>
                </li>
                <li (renderIf)="self.canListClient">
                  <a href="#" (click)="gotoView('ClientsGrid')"> Listar</a>
                </li>
                <li (renderIf)="self.isClient"><a href="#" (click)="gotoViewClient('ClienteDetalhes')">Meus Processos </a></li>
            </ul>
      </li>
      <li class="menu-item-julaw">
            <a href="#" class="item-menu"><i class="fas fa-user"></i> Colaboradores</a>
            <ul class="submenu">
                  <li (renderIf)="self.canCreateColaborador"><a href="#" (click)="gotoView('ColaboradorForm')"> Cadastrar </a>
                  </li>
                  <li (renderIf)="self.canListColaborador"><a href="#"  (click)="gotoView('ColaboradoresGrid')"> Listar</a>
                  </li>
            </ul>
      </li>
      <li (renderIf)="self.devProfile" class="menu-item-julaw">
            <a href="#" class="item-menu"><i class="fas fa-user"></i> POC</a>
            <ul class="submenu">
                  <li><a href="#" (click)="gotoView('POC')"> Generico </a></li>
            </ul>
      </li>
      <li class="menu-item-julaw">
            <a href="#" class="item-menu"><i class="fas fa-file-invoice"></i>  Despesas</a>
            <ul class="submenu">
                  <li (renderIf)="self.canCreateDespesasr"><a href="#" (click)="gotoView('DespesasForm')"> Registar </a>
                  </li>
                  <li (renderIf)="self.canListDespesas"><a href="#"  (click)="gotoView('Despesas')"> Listar</a>
                  </li>
            </ul>
      </li>
    </ul>
  </aside>
    `;

  getRolesByLoggedUser() {
    try {
      const userLogged = JSON.parse(localStorage.getItem("_user"));

      console.log(userLogged.id)

      this.userId = userLogged.id
      this.userFuncao = userLogged.funcao
      this.userName = userLogged.nome_completo;
      this.roles = userLogged.auth.roles;

      console.log("roles by user logged ... ", this.roles)

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
    this.canListProcess = this.roles.includes('CAN_SEE_PROCESS_LIST');

    this.canCreateClient = this.roles.includes('CAN_CREATE_CLIENT');
    this.canListClient = this.roles.includes('CAN_SEE_CLIENT_LIST');

    this.canCreateColaborador = this.roles.includes('CAN_CREATE_COLABORADOR');
    this.canListColaborador = this.roles.includes('CAN_SEE_COLABORADOR_LIST');

    if(this.userFuncao !== "cliente") {
      this.canSeeHomePage = true;
      this.canListMineProcess = true;
    }else{
      this.isClient = true
    }

  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  gotoViewClient(viewComponent) {
    Router.goto(viewComponent, {data: this.userId.value});
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