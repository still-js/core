import { StillAppMixin } from "./@still/component/super/AppMixin.js";
import { Components } from "./@still/setup/components.js";
import { AppTemplate } from "./app-template.js";
import { Login } from "./components/auth/Login.js";
import { Home } from "./components/home/Home.js";

export class StillAppSetup extends StillAppMixin(Components) {


    constructor() {

        super();
        this.setHomeComponent(Home);
        this.setServicePath('/services');
        StillHTTPClient.setBaseUrl('http://5.252.53.178:3000');
        //StillHTTPClient.setBaseUrl('http://localhost:3000');

        this.configurePrefetch();
        this.runPrefetch();

    }

    init() {
        const logged = localStorage.getItem('logged');
        return logged ? new AppTemplate() : new Login();
    }

    configurePrefetch() {

        this
            .addPrefetch({
                component: '@tabulator/TabulatorComponent',
                assets: ["tabulator6.2.25.js", "tabulator.min.css"]
            })
            .addPrefetch({
                component: '@tabulator/TBDragableGrid',
            })
            .addPrefetch({
                component: '@toast-ui/calendar/TUICalendarComponent',
                assets: [
                    'toastui-calendar.min.js',
                    'toastui-calendar.min.css',
                    '../timepicker/time-picker.min.css',
                    '../datepicker/date-picker.min.css',
                    '../timepicker/time-picker.js',
                    '../datepicker/date-picker.js',
                ]
            });

        return this;

    }

}
