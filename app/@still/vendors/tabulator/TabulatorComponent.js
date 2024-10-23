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
    deleteColMetadata = Prop;
    /** @type { Array<{ pos, icon }> } */
    editColMetadata = Prop;

    async load() {

        const fields = JSON.parse(this.tableHeader);
        this.parseDeleteRowColumn(fields);
        this.parseEditRowColumn(fields);

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

            const clickedCol = cell.getField();
            const rowData = cell.getData();

            if (clickedCol == 'tabulatorEditColumn') {
                return this.onEditColumn(clickedCol, rowData);
            }

            if (clickedCol == 'tabulatorDelColumn') {
                return this.onDeleteRow(clickedCol, rowData);
            }

            const clickedRow = cell.getRow()._row.position;
            this.onCellClick(clickedRow, clickedCol, rowData);

        });
    }

    clearTable() {
        alert(`Clearing table data`);
    }

    parseDeleteRowColumn(fieldList) {

        this.deleteColMetadata = [];
        const deleteCol = fieldList.filter((r, pos) => {
            if (r.deleteRow) {
                this.deleteColMetadata.push({
                    pos, icon: fieldList[pos].icon
                })
                return r.deleteRow;
            }
        });

        if (deleteCol.length == 1) {
            const colOptions = this.deleteColMetadata[0];
            const formatter = () => colOptions.icon;
            fieldList[colOptions.pos] = {
                ...fieldList[colOptions.pos], formatter,
                field: "tabulatorDelColumn"
            };
        }

        return this;

    }

    parseEditRowColumn(fieldList) {

        this.editColMetadata = [];
        const editCol = fieldList.filter((r, pos) => {
            if (r.editRow) {
                this.editColMetadata.push({
                    pos, icon: fieldList[pos].icon
                })
                return r.editRow;
            }
        });

        if (editCol.length == 1) {
            const colOptions = this.editColMetadata[0];
            const formatter = () => colOptions.icon;
            fieldList[colOptions.pos] = {
                ...fieldList[colOptions.pos], formatter,
                field: "tabulatorEditColumn"
            };
        }

        return this;

    }

    /**
     * Method signature for parent to call as event
     * @type {{componentEvent: true}} 
     * @returns { boolean } 
     * */
    onEditColumn(fieldName, data) { }

    /**
     * Method signature for parent to call as event
     * @type {{componentEvent: true}} 
     * @returns { boolean } 
     * */
    onDeleteRow(fieldName, data) { }

    /**
     * Method signature for parent to call as event
     * @type {{componentEvent: true}} 
     * @returns { boolean } 
     * */
    onCellClick(col, row, data) { }

}