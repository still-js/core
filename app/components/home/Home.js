import { BaseComponent } from "../../@still/component/super/BaseComponent.js";

export class Home extends BaseComponent {

  template = `
    <section class="content">
        
            <div class="container-fluid">
                <!-- Dashboard Widgets -->
                <div id="dashBoardCards" class="row"></div>

                <div class="row">
                  <st-element component="BarChart"></st-element>
                  <st-element component="LineChart"></st-element>
                </div>

                <div class="row clearfix">
                  <st-element component="CircularAnimatedChart"></st-element>
                </div>
                
                <div class="row clearfix">
                  <st-element component="ProjectGrid"></st-element>
                  <st-element component="Calendar"></st-element>
                </div>
                
            </div>
        
    </section>
    `;



  constructor() {
    super();
    /*
    if(AppTemplate.get().getStorageValue('logged')){
        console.log(`Used was logged: `, AppTemplate.get().getStorageValue('logged'));
    }else{
        Router.goto('init');
    }
    */
    //AppTemplate.showLoading();
    /* this.setup({
      includs: [
        //LineChart,
        //Calendar,
        CardDisplay,
        //BarChart,
        //CircularAnimatedChart,
        //ProjectGrid,
      ],
      scripts: [
        "assets/js/chart.min.js",
        "assets/js/bundles/amcharts4/core.js",
        "assets/js/bundles/amcharts4/charts.js",
        "assets/js/bundles/amcharts4/animated.js",
        "assets/js/pages/index.js",
      ],
    }); */

    /* CardDisplay.cardDataSource.onChange((value) => {
            console.log(`Home component detected changes: `,value);
        }); */
  }

  importScripts() {

    return {
      scripts: [
        "assets/js/chart.min.js",
        "assets/js/bundles/amcharts4/core.js",
        "assets/js/bundles/amcharts4/charts.js",
        "assets/js/bundles/amcharts4/animated.js",
        "assets/js/pages/index.js",
      ],
    };

  }

  async stAfterInit() {

    AppTemplate.hideLoading();

  }
}
