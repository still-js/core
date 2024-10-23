class ClientForm extends ViewComponent {

    tipoClienteId;
    nome;
    sobrenome;
    nif;
    endereco;
    pessoaContacto;
    telefone;
    email;
    contactoCobranca;
    clientNota;
    tipoClienteSelecionado = "";

    /**
     * Fields not bound to the form fields but for internal
     */
    clientType; //Holds list of tipo de cliente
    routingData; //Used to assign data if sent from Router

    template = `
    <section class="content">
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="card">
                    <div class="header">
                        <h2><strong>Cadastro</strong> de cliente</h2>
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
                        <form id="wizard_with_validation" onsubmit="javascript: return false;">
                            <h3>Dados Pessoais</h3>
                            <fieldset>

                                <h2 class="card-inside-title">Detalhes do cliente</h2>
                                <div class="row clearfix">
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <div class="input-field col s12">
                                                <span class="input-group-addon">
                                                    <i class="material-icons">person</i> Tipo de cliente
                                                </span>
                                                <select 
                                                    (value)="tipoClienteSelecionado"
                                                    (change)="updateTipoCliente($event)" 
                                                    (forEach)="clientType">
                                                    <option each="item" value="">Selecione uma opção</option>
                                                    <option each="item" value="{item.id}">{item.value}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">person</i> Nome
                                            </span>
                                            <div class="form-line">
                                                <input type="text" class="form-control date" (value)="nome" placeholder="Sobre nome">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">group</i> Sobrenome
                                            </span>
                                            <div class="form-line">
                                                <input type="text" class="form-control date" (value)="sobrenome" placeholder="Sobrenome">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row clearfix">
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">location_city</i> Endereço
                                            </span>
                                            <div class="form-line">
                                                <input type="text" class="form-control date" (value)="endereco" placeholder="Endereço">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">receipt</i> Número de Identificação Fiscal
                                            </span>
                                            <div class="form-line">
                                                <input type="text" class="form-control date" (value)="nif" placeholder="NIF">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">person_outline</i> Pessoa de contacto
                                            </span>
                                            <div class="form-line">
                                                <input type="text" class="form-control date" (value)="pessoaContacto" placeholder="Pessoa de Contacto">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>

                            <h3>Contactos</h3>
                            <fieldset>
                                <h2 class="card-inside-title">Dados de contactos</h2>
                                <div class="row clearfix">
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">phone</i> Telefone
                                            </span>
                                            <div class="form-line">
                                                <input type="text" class="form-control date" (value)="telefone" placeholder="Telefone">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">contact_phone</i> Contacto para Cobrança
                                            </span>
                                            <div class="form-line">
                                                <input type="text" class="form-control date" (value)="contactoCobranca" placeholder="Contacto para cobrança">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>
                            <h3>Nota</h3>
                            <fieldset>
                                <!-- TinyMCE -->
                                <div class="row clearfix">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div class="card">
                                            <div class="header">
                                                <h2>
                                                    <strong>Nota</strong>
                                                </h2>
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
                                                <textarea id="tinymce1">
                                                    <h2>Título</h2>
                                                    <p>Descrição</p>
                                                    <h3>Ponto</h3>
                                                    <ul>
                                                        <li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>
                                                        <li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>
                                                        <li>Praesent non lacinia mi.</li>
                                                        <li>Mauris a ante neque.</li>
                                                        <li>Aenean ut magna lobortis nunc feugiat sagittis.</li>
                                                    </ul>
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <button class="julaw-submit-button" (click)="registerClient()">Submeter</button>
                                    <button class="julaw-cancel-button" (click)="resetState()">Cancelar</button>

                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

    constructor() {
        super();

        this.setup({
            includs: [
                /* ClientsGrid */
            ],
            scripts: [
                'assets/js/form.min.js',
            ],
        });

    }

    updateTipoCliente(evt) {
        console.log('Value is: ', evt);
        this.tipoClienteId = evt.target.value;
    }

    onRender() {
        this.showLoading();
        loadWizard({ enableAllSteps: this.routingData ? true : false });
        /** Initializing Tinemce text editor */
        tinymce.init({
            selector: 'textarea#tinymce1',
            theme: "modern",
            height: 300,
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools'
            ],

        });
    }


    registerClient() {

        this.showLoading();
        const payload = {
            "denominacao": this.nome.value,
            "tipo_id": this.tipoClienteId.value,
            "nif": this.nif.value,
            "endereco": this.endereco.value,
            "pessoa_contacto": this.pessoaContacto.value,
            "contacto_cobranca": this.contactoCobranca.value,
            "nota": this.clientNota.value,
            "status": "pending"
        }

        $still.HTTPClient.post(
            'http://localhost:3000/api/v1/cliente',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {
            this.hideLoading();
            Router.goto('ClientsGrid');
            console.log(`Cliente criado com sucesso: `, r.data);
        }).catch((err) => {
            this.hideLoading();
            console.log(`Erro ao cadastrar cliente: `, err);
        });
    }

    stAfterInit() {

        this.clientType = [
            { value: 'Particular', id: 1 },
            { value: 'Ministério', id: 2 },
            { value: 'Instituto', id: 3 },
            { value: 'Associação', id: 4 },
            { value: 'Outro', id: 5 }
        ];


        const routeData = Router.data('ClientForm');
        if (routeData) {

            //setTimeout(() => {
            const {
                id, denominacao, tipo_id, nif, endereco, pessoa_contacto,
                contacto_cobranca, nota, status,
            } = routeData;

            const nomes = denominacao.split(" ");
            this.nome = nomes[0];
            this.sobrenome = nomes[1] || '';
            this.endereco = endereco;
            this.pessoaContacto = pessoa_contacto;
            this.contactoCobranca = contacto_cobranca;
            this.nif = nif;
            this.telefone = contacto_cobranca;
            this.pessoaContacto = pessoa_contacto;
            this.tipoClienteSelecionado = tipo_id;
            //});

        }
        this.hideLoading();

    }

}

/**
 * 
 * Function to load JQuery Step/Wizard which is 
 * called in the calss component 
 */
function loadWizard({ enableAllSteps = false } = {}) {

    var form = $('#wizard_with_validation').show();
    const [finish, next, previous] = ["Submeter", "Próximo", "Voltar"]
    form.steps({
        showFinishButtonAlways: false,
        enableFinishButton: false,
        enableAllSteps,
        labels: { finish, next, previous },
        headerTag: 'h3',
        bodyTag: 'fieldset',
        transitionEffect: 'slideLeft',
        onInit: function (event, currentIndex) {

            //Set tab width
            var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
            var tabCount = $tab.length;
            $tab.css('width', (100 / tabCount) + '%');

            //set button waves effect
            setButtonWavesEffect(event);
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; }

            if (currentIndex < newIndex) {
                form.find('.body:eq(' + newIndex + ') label.error').remove();
                form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
            }
            return form//.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            setButtonWavesEffect(event);
        },
        onFinishing: function (event, currentIndex) {
            return form//.valid();
        },
        onFinished: function (event, currentIndex) {
            swal("Good job!", "Submitted!", "success");
        }
    });
}

function setButtonWavesEffect(event) {
    $(event.currentTarget).find('[role="menu"] li a').removeClass('waves-effect');
    $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('waves-effect');
}