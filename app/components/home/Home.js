class Home extends BaseComponent {

    template = `
        <div class="container-fluid">
            <!-- Dashboard Widgets -->
            <div id="dashBoardCards" class="row"></div>

            <div class="row">
                <div id="barCharPlaceholder" style="display: contents;"></div>
                <div id="lineCharPlaceholder" style="display: contents;"></div>
            </div>

            <div class="row clearfix">
                <div id="animateCharts" style="display: contents;"></div>
            </div>
            
            <div class="row clearfix">
                <div id="projectGrid" style="display: contents;"></div>
                <div id="dashboardCalendar" style="display: contents;"></div>
            </div>
            
        </div>
    `;

    cardDisplayDS;

    constructor(){
        super();
        this.setup({
            includs: [
                LineChart,
                Calendar,
                CardDisplay,
                BarChart,
                CircularAnimatedChart,
                ProjectGrid,
             ],
             scripts: [
                'assets/js/chart.min.js',
                'assets/js/bundles/amcharts4/core.js',
                'assets/js/bundles/amcharts4/charts.js',
                'assets/js/bundles/amcharts4/animated.js',
                'assets/js/pages/index.js',
             ]
        });

        /* CardDisplay.cardDataSource.onChange((value) => {
            console.log(`Home component detected changes: `,value);
        }); */
    }

}