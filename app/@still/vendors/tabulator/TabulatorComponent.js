class TabulatorComponent extends ViewComponent {

    template = `
    <div>
            <section class="tabulator-table-menu-container">
                <div (click)="myEvent()">Menu 1</div>
            </section>
            <div>
                <div class="this-is-me" id="@dynCmpGeneratedId"></div>
            </div>
        </div>
    `;
    table = Prop;
    tableHeader = Prop;
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
            columns: JSON.parse(this.tableHeader),
        });

        const table = this.table;

        this.dataSource.onChange((value) => {
            //dataSource.push(...value); //Insert new line in the table
            table.setData(value);
        });

        this.table.on('cellClick', (e, cell) => {
            this.onCellClick(cell.getField(),cell.getData());
        });
    }

    clearTable(){
        alert(`Vamos`);
    }

    onCellClick(fieldName, data){}

}