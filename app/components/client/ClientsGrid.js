class ClientsGrid extends ViewComponent {

    htmlRefId = 'clientDataTable';
    dataSource;
    /** @type { TabulatorComponent } */
    dataTable = Proxy;
    dataTableLabels = Prop(JSON.stringify([
        { hozAlign: "center", editRow: true, icon: "<i class='fa fa-pen'></i>", width: 20 },
        { hozAlign: "center", deleteRow: true, icon: "<i class='fa fa-trash'></i>", width: 20 },
        { title: "Tipo Cliente", field: "tipo_id", sorter: "string", width: 200 },
        { title: "Nome", field: "denominacao", sorter: "string" },
        { title: "NIF", field: "nif", sorter: "string" },
        { title: "Endereco", field: "endereco", sorter: "string" },
        { title: "Telefone", field: "pessoa_contacto", sorter: "string" },
        { title: "Telefone Cobrança", field: "contacto_cobranca", sorter: "string" }
    ]));
    editEvent = Prop('Edit Parent');

    template = `
    <section class="content">

        <st-element
            component="TabulatorComponent"
            proxy="dataTable"
            tableHeader="parent.dataTableLabels"
            (onEditColumn)="editRow(fieldName, data)"
            (onDeleteRow)="deleteRow(fieldName, data)"
            (onCellClick)="cellClick(row, col, data)"
            >
        </st-element>

        <st-element
            component="TUIComponent"
            proxy="timeSheet"
            (onEventCreate)="saveEvent()"
            editLabel="parent.editEvent"
            >
        </st-element>
        
    </section>
    `;

    constructor() {
        super();
        this.setup({});
        this.showLoading();
    }

    deleteRow(_, record) {
        alert(JSON.stringify(record));
    }

    editRow(_, record) {
        console.log(`ROW WILL BE EDITED: `, record);
    }

    cellClick(row, col, _) {
        console.log(`Cliecked on: `, {
            row, col, _
        })
    }

    saveEvent() {
        alert(`Called event creation`);
        return true;
    }

    async onRender() {

        /**
         * Isso quer dizer que o import do JQuery foi feito no index principal
         * ou no ficheiro de rotas em eagerImport
         */
        /* this.stRunOnFirstLoad(() => {
            $('.js-basic-example').DataTable({
                responsive: true
            });
        }); */

        /** For Test purpose only */
        await this.stLazyExecution(async () => {

            /** @type { ClientForm } */
            const clientFormView = $still.view.get('ClientForm');

            clientFormView.onChange((newState) => {
                console.log(`Client grid detectou mudança no client form: `, newState);
            });

        });

    }

    stAfterInit(val) {

        $still
            .HTTPClient
            .get('http://localhost:3000/api/v1/cliente/')
            .then((r) => {
                this.dataSource = r.data;
                //console.log(`DATA IS: `,this.dataSource);
                this.dataTable.dataSource = r.data;
                this.hideLoading();
            });

    }

    /** For Test purpose only */
    /** @type { StEvent } */
    anyState = 'This is the state value';
    runLocalFunc() {
        this.dataTable.dataSource = [
            { denominacao: 'Novo valor', tipo_id: 190 }
        ];
    }

    getClientDetails(f, row) {

        console.log(`Clicked field is: `, f);

        const {
            contacto_cobranca,
            created_at,
            denominacao,
            endereco,
            id,
            nif,
            nota,
            pessoa_contacto,
            status,
            tipo,
            tipo_id,
            updated_at,
        } = row;

        const data = {
            contacto_cobranca,
            created_at,
            denominacao,
            endereco,
            id,
            nif,
            nota,
            pessoa_contacto,
            status,
            tipo,
            tipo_id,
            updated_at,
        }

        /* Router.goto('ClientForm', {
            data
        }); */

    }


}