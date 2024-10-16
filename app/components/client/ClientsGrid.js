class ClientsGrid extends ViewComponent {

    htmlRefId = 'clientDataTable';
    dataSource;
    /** @type { TabulatorComponent } */
    dataTable = Proxy;
    /* fields = JSON.stringify([
        { "title": "Tipo Cliente", "field": "tipoCliente", "sorter": "string", "width": 200 },
        { "title": "Nome", "field": "nome", "sorter": "string", "width": 200 },
        { "title": "NIF", "field": "name", "sorter": "string", "width": 200 },
        { "title": "Endereco", "field": "name", "sorter": "string", "width": 200 },
        { "title": "Telefone", "field": "name", "sorter": "string", "width": 200 },
        { "title": "Telefone Cobrança", "field": "name", "sorter": "string", "width": 200 },
    ]); */

    template = `
    <section class="content">

        <st-extern
            component="tabulator-datatable"
            proxy="dataTable"
            fields='
            [
                { "title": "Tipo Cliente", "field": "tipo_id", "sorter": "string", "width": 200 },
                { "title": "Nome", "field": "denominacao", "sorter": "string"  },
                { "title": "NIF", "field": "nif", "sorter": "string" },
                { "title": "Endereco", "field": "endereco", "sorter": "string" },
                { "title": "Telefone", "field": "pessoa_contacto", "sorter": "string" },
                { "title": "Telefone Cobrança", "field": "contacto_cobranca", "sorter": "string" }
            ]
            '
            >
        </st-extern>
        
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button (click)="runLocalFunc()">Click here Button</button>
                <div class="card">
                    <div class="header">
                        <h2>
                            <strong>Clientes</strong> registados</h2>
                        <ul class="header-dropdown m-r--5">
                            <li class="dropdown">
                                <a href="#" onClick="return false;" class="dropdown-toggle" data-toggle="dropdown"
                                    role="button" aria-haspopup="true" aria-expanded="false">
                                    <i class="material-icons">more_vert</i>
                                </a>
                                <ul class="dropdown-menu pull-right">
                                    <li>
                                        <a href="#" onClick="return false;">Action</a>
                                    </li>
                                    <li>
                                        <a href="#" onClick="return false;">Another action</a>
                                    </li>
                                    <li>
                                        <a href="#" onClick="return false;">Something else here</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                <thead>
                                    <tr>
                                        <th>Tipo cliente</th>
                                        <th>Nome</th>
                                        <th>NIF</th>
                                        <th>Endereço</th>
                                        <th>Telefone</th>
                                        <th>Telefone Cobrança</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <!-- <output of="dataSource"> -->
                                <tbody (forEach)="dataSource">
                                    <tr each="item">
                                        <td>{item.tipo_id}</td>
                                        <td>{item.denominacao}</td>
                                        <td>{item.nif}</td>
                                        <td>{item.endereco}</td>
                                        <td>{item.pessoa_contacto}</td>
                                        <td>{item.contacto_cobranca}</td>
                                        <td>
                                           <a (click)="editClient('{item.nif}')">Editar</a>
                                        </td>
                                    </tr>
                                </tbody>

                                <tfoot>
                                <tr>
                                    <th>Tipo cliente</th>
                                    <th>Nome</th>
                                    <th>NIF</th>
                                    <th>Endereço</th>
                                    <th>Telefone</th>
                                    <th>Telefone Cobrança</th>
                                    <th>&nbsp;</th>
                                </tr>
                        </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

    editClient(nif){
        console.log(`Clicked client is: `,nif);
        
        const result = this.dataSource.value.filter((r) => r.nif == nif)
        Router.goto('ClientForm', {
            data: result[0]
        });
        
    }

    /** For Test purpose only */
    /** @type { StEvent } */
    anyState = 'This is the state value';
    runLocalFunc(){

        this.dataTable.clearTable();

        this.dataTable.dataSource = [
            { id: 2, name: "Mary May", gender: "female", rating: 2, col: "blue" }
        ];

        //console.log(this.dataTable);

        alert('Alert from the components itself'+this.anyState);
    }
    

}