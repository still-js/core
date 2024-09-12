class Menu extends BaseComponent {

    template = `
    <div class="menu">
        <ul class="list">
            <li>
                <div class="sidebar-profile clearfix">
                    <div class="profile-img">
                        <img src="assets/images/usrbig.jpg" alt="profile">
                    </div>
                    <div class="profile-info">
                        <h3 onclick="menu()">Sarah Deo</h3>
                        <p>Welcome Admin !</p>
                    </div>
                </div>
            </li>
            <!-- <li class="header">Menu Inici</li> -->
            <li class="active">
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
                <ul class="ml-menu">
                    <li class="active">
                        <a href="#" (click)="gotoView('ClientForm')">Cliente</a>
                    </li>
                    <li>
                        <a href="#" (click)="gotoView('Osvaldo')">Colaborador</a>
                    </li>
                </ul>
            </li>
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
