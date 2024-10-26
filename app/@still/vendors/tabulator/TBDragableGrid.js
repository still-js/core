class TBDragableGrid extends ViewComponent {

    senederID = Prop(`sender_${Math.random().toString().slice(2)}`);
    receiverID = Prop(`receiver_${Math.random().toString().slice(2)}`);
    tableData = Prop;
    tableRecords = Prop([]);

    template = `
        <div class="dragableCOntainer">
            <div id="@senederID" class="sender-grid-tb"></div>
            <div id="@receiverID" class="receiver-grid-tb"></div>
        </div>

        <style>
            .dragableCOntainer {
                margin-top:20px;
                display: flex;
            }

            .sender-grid-tb, .receiver-grid-tb{ 
                width: 49%;
                height: 200px;
                border: 1px solid red;
            }
        </style>

    `;

    load() {

        this.tableRecords = this.tableData;

        var table = new Tabulator(`#${this.senederID}`, {
            height: 311,
            layout: "fitColumns",
            movableRows: true,
            movableRowsConnectedTables: `#${this.receiverID}`,
            movableRowsReceiver: "add",
            movableRowsSender: "delete",
            placeholder: "All Rows Moved",
            data: this.tableData,
            columns: [
                { title: "Name", field: "name" },
                { title: "Custo", field: "custo" },
            ],
        });

        //Table to move rows to
        var table = new Tabulator(`#${this.receiverID}`, {
            height: 311,
            layout: "fitColumns",
            placeholder: "Drag Rows Here",
            data: [],
            columns: [
                { title: "Name", field: "name", editor: "input" },
            ],
        });

    }



}