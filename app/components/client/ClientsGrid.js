class ClientsGrid extends ViewComponent {

    htmlRefId = 'clientDataTable';
    dataSource;

    template = `
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
                                </tr>
                        </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    constructor(){
        super();
        this.setup({});
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

        await this.stLazyExecution(async () => {
            
            /** @type { ClientForm } */
            const clientFormView = $still.view.get('ClientForm');
            const moreView = $still.view.get('MorCompo');

            clientFormView.onChange((newState) => {
                console.log(`Client grid detectou mudança no client form: `,newState);
            });

            moreView.onChange((newState) => {
                console.log(`Client grid detectou mudança no client form: `,newState);
            });
        });

        /* $still.context.componentRegistror.getComponent('ClientForm').sobrenome.onChange((newState) => {
            console.log(`Client grid detectou mudança no client form: `,newState);
        }); */
    }

    stAfterInit(){

        $still
        .HTTPClient
        .get('http://localhost:3000/api/v1/cliente/')
        .then((r) => this.dataSource = r.data);

    }

    /** @type { StEvent } */
    anyState = 'This is the state value';
    runLocalFunc(){
        alert('Alert from the components itself'+this.anyState);
    }
    

}