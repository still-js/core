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
    /** @type { Array<{ pos, icon }> } */
    deleteFowMetadata = Prop;

    async load(){
        
        const fields = JSON.parse(this.tableHeader);
        this.deleteFowMetadata = [];
        const deleteCol = fields.filter((r, idx) => {
            if(r.deleteRow){
                this.deleteFowMetadata.push({
                    pos: idx,
                    icon: fields[idx].icon
                })
                return r.deleteRow;
            }
        });
        
        if(deleteCol.length == 1){
            const deleteRowOptions = this.deleteFowMetadata[0];
            const deletFormatter = () => deleteRowOptions.icon;
            fields[deleteRowOptions.pos] = deletFormatter;
        }

        let dataSource = [{}];
        this.table = new Tabulator(`#${this.dynCmpGeneratedId}`, {
            height: "311px",
            layout: "fitColumns",
            reactiveData: true, //turn on data reactivity
            data: dataSource, //load data into table,
            movableColumns: true,
            columns: fields,
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