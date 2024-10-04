class CMenu extends ViewComponent {

    htmlRefId = "leftsidebar";

    template = `
        <div class="menu">
       
        <nav class="navbar-default navbar-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav" id="main-menu">
                <li class="text-center user-image-back">
                    <img src="assets/img/find_user.png" class="img-responsive" />
                 
                </li>


                <li>
                    <a href="index.html"><i class="fa fa-desktop "></i>Dashboard</a>
                </li>
                <li>
                    <a href="#"><i class="fa fa-edit "></i>UI Elements<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="#">Notifications</a>
                        </li>
                        <li>
                            <a href="#">Elements</a>
                        </li>
                        <li>
                            <a href="#">Free Link</a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#"><i class="fa fa-table "></i>Table Examples</a>
                </li>
                <li>
                    <a href="#"><i class="fa fa-edit "></i>Forms </a>
                </li>


                <li>
                    <a href="#"><i class="fa fa-sitemap "></i>Multi-Level Dropdown<span class="fa arrow"></span></a>
                    <ul class="nav nav-second-level">
                        <li>
                            <a href="#">Second Level Link</a>
                        </li>
                        <li>
                            <a href="#">Second Level Link</a>
                        </li>
                        <li>
                            <a href="#">Second Level Link<span class="fa arrow"></span></a>
                            <ul class="nav nav-third-level">
                                <li>
                                    <a href="#">Third Level Link</a>
                                </li>
                                <li>
                                    <a href="#">Third Level Link</a>
                                </li>
                                <li>
                                    <a href="#">Third Level Link</a>
                                </li>

                            </ul>

                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#"><i class="fa fa-qrcode "></i>Tabs & Panels</a>
                </li>
                <li>
                    <a href="#"><i class="fa fa-bar-chart-o"></i>Mettis Charts</a>
                </li>

                <li>
                    <a href="#"><i class="fa fa-edit "></i>Last Link </a>
                </li>
                <li>
                    <a href="blank.html"><i class="fa fa-table "></i>Blank Page</a>
                </li>
            </ul>

        </div>

    </nav> 



        </div>
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
