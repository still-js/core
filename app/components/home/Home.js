class Home extends ViewComponent {

    template = `
    <div class="row">
        <script>
            cardData.forEach(rec => {
                new DashboardCard(rec.state)
                    .props(rec.props)
                    .render()
            });
        </script>
    </div>

    <div class="row">
        <script> new LineChart().render() </script>
        <script> new BarChart().render() </script>
    </div>
    <div class="row clearfix">
        <script> new CircularAnimatedChart().render() </script>
    </div>
    <div class="row clearfix">
        <script> new ProjectGrid().render() </script>
        <script> new Calendar().render() </script>
    </div>
    `;

    constructor(){
        super();
        new CardDisplay();
        console.log(`HOME COMPONENT CREATED`);
        //this.renderViewOn('mainUiPlaceHolder');
    }

}