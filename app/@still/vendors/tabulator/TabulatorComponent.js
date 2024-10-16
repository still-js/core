class TabulatorComponent extends ViewComponent {

    template = `
        <div id="@dynCmpGeneratedId"></div>
    `;
    table = Prop;
    fields = Prop;
    dataSource;
    firstLoad = false;

    async load(){
        
        let dataSource = [{}];

        this.table = new Tabulator(`#${this.dynCmpGeneratedId}`, {
            height: "311px",
            layout: "fitColumns",
            reactiveData: true, //turn on data reactivity
            data: dataSource, //load data into table,
            movableColumns: true,
            columns: JSON.parse(this.fields),
        });

        const table = this.table;

        this.dataSource.onChange((value) => {
            //console.log(`Tabulator Data source updated: `, value);
            //dataSource.push(...value);
            table.setData(value);
        });
    }

    clearTable(){
        console.log(this.fields);
        //this.table.setData([{ id: 5, name: "Margret Marmajuke", gender: "female", rating: 5, col: "yellow" }]);
    }

}