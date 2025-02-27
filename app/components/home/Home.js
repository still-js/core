import { BaseComponent } from "../../@still/component/super/BaseComponent.js";

export class Home extends BaseComponent {

  template = `
    <section class="content">
        
            <div class="container-fluid">
                <!-- Dashboard Widgets -->
                <div id="dashBoardCards" class="row"></div>

                <div class="row">
                  <st-element component="BarChart"></st-element>
                  <st-element 
                    component="LineChart"
                    ref="HomeLineChart"
                  ></st-element>
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
    //AppTemplate.showLoading();
    /* 
      CardDisplay.cardDataSource.onChange((value) => {
              console.log(`Home component detected changes: `,value);
      }); 
    */
  }

  importAssets() {

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
