class TabulatorComponent extends ViewComponent {

    template = `
        <div id="@dynCmpGeneratedId"></div>
    `;

    async load(){
        
        var tabledata = [
            { id: 1, name: "Oli Bob", gender: "male", rating: 1, col: "red" },
            { id: 2, name: "Mary May", gender: "female", rating: 2, col: "blue" },
            { id: 3, name: "Christine Lobowski", gender: "female", rating: 0, col: "green" },
            { id: 4, name: "Brendon Philips", gender: "male", rating: 1, col: "orange" },
            { id: 5, name: "Margret Marmajuke", gender: "female", rating: 5, col: "yellow" },
        ];

        //Build Tabulator
        var table = new Tabulator(`#${this.dynCmpGeneratedId.value}`, {
            height: "311px",
            layout: "fitColumns",
            reactiveData: true, //turn on data reactivity
            data: tabledata, //load data into table,
            movableColumns: true,
            columns: [
                { title: "Name", field: "name", sorter: "string", width: 200 },
                { title: "Gender", field: "gender", sorter: "string" },
                { title: "Rating", field: "rating", formatter: "star", hozAlign: "center", width: 100 },
                { title: "Favourite Color", field: "col", sorter: "string" },
            ],
        });
       
    }

}