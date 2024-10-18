class ClientsGrid extends ViewComponent {

    htmlRefId = 'clientDataTable';
    dataSource;
    /** @type { TabulatorComponent } */
    dataTable = Proxy;
    dataTableLabels = Prop(JSON.stringify(            [
        { title: "Tipo Cliente", field: "tipo_id", sorter: "string", width: 200 },
        { title: "Nome", field: "denominacao", sorter: "string"  },
        { title: "NIF", field: "nif", sorter: "string" },
        { title: "Endereco", field: "endereco", sorter: "string" },
        { title: "Telefone", field: "pessoa_contacto", sorter: "string" },
        { title: "Telefone Cobrança", field: "contacto_cobranca", sorter: "string" }
    ]));

    template = `
    <section class="content">

        <st-element
            component="TabulatorComponent"
            proxy="dataTable"
            tableHeader="parent.dataTableLabels"
            (onCellClick)="getClientDetails(fieldName, data)"
            >
        </st-element>
        
    </section>
    `;

    constructor(){
        super();
        this.setup({});
        this.showLoading();
    }

    async onRender(){

        /**
         * Isso quer dizer que o import do JQuery foi feito no index principal
         * ou no ficheiro de rotas em eagerImport
         */
        this.stRunOnFirstLoad(() => {
            $('.js-basic-example').DataTable({
                responsive: true
            });
        });

        /** For Test purpose only */
        await this.stLazyExecution(async () => {
            
            /** @type { ClientForm } */
            const clientFormView = $still.view.get('ClientForm');

            clientFormView.onChange((newState) => {
                console.log(`Client grid detectou mudança no client form: `,newState);
            });

        });

    }

    stAfterInit(val){

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
    runLocalFunc(){
        this.dataTable.dataSource = [
            { denominacao: 'Novo valor', tipo_id: 190 }
        ];
    }

    getClientDetails(_, row){

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
            
        Router.goto('ClientForm', {
            data
        });

    }
    

}