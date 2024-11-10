class TBDragableGrid extends ViewComponent {

    senederID = Prop(`sender_${Math.random().toString().slice(2)}`);
    receiverID = Prop(`receiver_${Math.random().toString().slice(2)}`);
    tableData = Prop;
    tableRecords = Prop([]);
    tableFields = Prop([]);
    destFields = Prop(null);
    sourceTable = Prop;
    destTable = Prop;
    sourcePlaceholder = Prop('Itens por pagar');
    destPlaceholder = Prop('Drag Rows Here');

    template = `
        <div class="dragableContainer">
            <div id="@senederID" class="sender-grid-tb"></div>
            <div id="@receiverID" class="receiver-grid-tb"></div>
        </div>

        <style>
            .dragableContainer {
                margin-top:20px;
                display: flex;
                justify-content: space-between;
            }

            .sender-grid-tb, .receiver-grid-tb{ 
                width: 49%;
                height: 200px;
                font-size: 12px;
            }
        </style>

    `;

    async load() {

        this.tableRecords = this.tableData;
        const fields = JSON.parse(this.tableFields);
        const destFields = this.destFields && JSON.parse(this.destFields);

        this.#handleFieldFieldsEdition(fields);
        this.#handleFieldFieldsEdition(destFields);

        this.sourceTable = new Tabulator(`#${this.senederID}`, {
            height: 311,
            layout: "fitColumns",
            movableRows: true,
            movableRowsConnectedTables: `#${this.receiverID}`,
            movableRowsReceiver: "add",
            movableRowsSender: "delete",
            placeholder: this.sourcePlaceholder,
            data: this.tableData,
            columns: fields,
        });

        this.destTable = new Tabulator(`#${this.receiverID}`, {
            height: 311,
            layout: "fitColumns",
            placeholder: this.destPlaceholder,
            data: [],
            columns: destFields ? destFields : fields
        });

    }

    #editigPrevValue = null;
    #handleFieldFieldsEdition(fields) {

        for (const idx in Object.keys(fields)) {
            /**
             * Retrieve the parent method which 
             * will handle cell value edition
             */
            const likelyMethod = fields[idx].editor;
            if (likelyMethod) {
                /**
                 * This arrow function implementatin comes from the tabulatot API/SDK 
                 * documentation that can be found on <https://tabulator.info/docs/6.3/edit>
                 */
                fields[idx].editor = (cell, onRendered, success, cancel, editorParams) => {

                    const thisInstance = this;
                    const rowNumber = cell.getRow()._row.position;
                    const rowData = cell.getData();

                    const enteredValue = cell.getValue().toString();
                    /**
                     * Call parent method and pass the parameters 
                     * from the second position (onFocus) onward so 
                     * the parent can implement its own logic on what 
                     * to return (display) on the input text when 
                     * placing the cursor inside it
                     */
                    const value = thisInstance.parentRun(likelyMethod, 'onFocus', enteredValue, rowData, rowNumber);
                    this.#editigPrevValue = String(value).replace(',', '').replace('.', '');

                    var editor = document.createElement("input");
                    editor.value = value;

                    editor.style.padding = "3px";
                    editor.style.width = "100%";
                    editor.style.boxSizing = "border-box";
                    editor.style.paddingBottom = "3px !important";
                    editor.style.paddingTop = "1px !important";

                    onRendered(function () {
                        editor.focus();
                        editor.style.css = "100%";
                    });

                    const successFunc = () => {
                        /**
                         * Call parent method and pass the parameters 
                         * from the second position (onLoseFocus) onward so 
                         * the parent can implement its own logic on what 
                         * to return (display) on the input text when 
                         * the edition is terminated and cursor moved out
                         */
                        const value = thisInstance.parentRun(likelyMethod, 'onLoseFocus', editor.value, rowData, rowNumber);
                        const likeliValue = String(value).replace(',', '').replace('.', '');

                        /** Bellow if statement is specific for the currency change verification */
                        //if (this.#editigPrevValue != parseInt(likeliValue.slice(4)))
                        //    cell.getRow().getElement().style.backgroundColor = "#b0e2a2";
                        success(value);
                    }

                    editor.addEventListener("change", successFunc);
                    editor.addEventListener("blur", successFunc);
                    return editor;

                };
            }
        }
    }

    setSourceData(data) {
        this.sourceTable.setData(data);
    }

    getSourceData() {
        return this.sourceTable.getData();
    }

    getDestData() {
        return this.destTable.getData();
    }

    updateDestRow(rowNum, obj) {
        const data = this.destTable.getData();
        Object.entries(obj).forEach(([key, val]) => {
            data[rowNum - 1][key] = val;
        });
        this.destTable.setData(data);
    }



}