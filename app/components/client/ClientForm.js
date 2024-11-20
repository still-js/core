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

    /** @type { STForm } */
    clientForm;


    /**
     * Fields not bound to the form fields but for internal
     */
    clientType; //Holds list of tipo de cliente
    routingData; //Used to assign data if sent from Router

    template = `
    <section class="content">
        <div class="row clearfix">
            <div class="title-grid-component" style="display: flex">
                <span class="fas fa-user title-grid-component-icon"></span>    
                <h3>Novo Cliente</h3>
            </div>

            <div 
                style="margin-top: -55px;"
                class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                        <form id="client_wizard_with_validation" (formRef)="clientForm" onsubmit="javascript: return false;">
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
                                                    (required)="true"
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
                                                <input 
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="nome" 
                                                    placeholder="Sobre nome">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">group</i> Sobrenome
                                            </span>
                                            <div class="form-line">
                                                <input 
                                                    type="text"
                                                    class="form-control date"
                                                    (value)="sobrenome"
                                                    (required)="true"
                                                    placeholder="Sobrenome">
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
                                                <input 
                                                    (validator)="text"
                                                    type="text"
                                                    class="form-control date" 
                                                    (value)="endereco" 
                                                    placeholder="Endereço">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">receipt</i> Número de Identificação Fiscal
                                            </span>
                                            <div class="form-line">
                                                <input 
                                                    (validator)="alhpanumeric"
                                                    (validator-warn)="Digite um NIF válido, ex: 000300931LA009"
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="nif" 
                                                    placeholder="NIF">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">person_outline</i> Pessoa de contacto
                                            </span>
                                            <div class="form-line">
                                                <input 
                                                    (validator)="phone"
                                                    (required)="true"
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="pessoaContacto" 
                                                    (validation-trigger)="losefocus"
                                                    placeholder="Pessoa de Contacto"
                                                    (validator-warn)="O formato da data é (+244 123 456)"
                                                    >
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
                                                <input 
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="telefone" 
                                                    placeholder="Telefone">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">contact_phone</i> Contacto para Cobrança
                                            </span>
                                            <div class="form-line">
                                                <input 
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="contactoCobranca" 
                                                    placeholder="Contacto para cobrança"
                                                    >
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
                                                <textarea cols="100" rows="30"></textarea>
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
        AppTemplate.showLoading();

    }

    updateTipoCliente(evt) {
        console.log('Value is: ', evt);
        this.tipoClienteId = evt.target.value;
    }

    onRender() {
        this.routingData = Router.data('ClientForm');
        loadWizard({ enableAllSteps: this.routingData ? true : false });
    }


    registerClient() {

        const routingData = Router.data('ClientForm');
        let tipoClientId = this.tipoClienteId.value;
        if ((!tipoClientId || tipoClientId == '') && routingData)
            tipoClientId = routingData?.tipo_id;

        const payload = {
            "denominacao": this.nome.value,
            "tipo_id": tipoClientId,
            "nif": this.nif.value,
            "endereco": this.endereco.value,
            "pessoa_contacto": this.pessoaContacto.value,
            "contacto_cobranca": this.contactoCobranca.value,
            "nota": this.clientNota.value,
            "status": "pending"
        }

        const isValidForm = this.clientForm.validate();

        if (isValidForm) {
            if (!routingData) {
                this.saveClient(payload);
            } else {
                this.updateClient(payload);
            }
        }

    }

    saveClient(payload) {

        AppTemplate.showLoading();
        $still.HTTPClient.post(
            'http://localhost:3000/api/v1/cliente',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {
            AppTemplate.hideLoading();
            Router.goto('ClientsGrid');
        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao cadastrar cliente: `, err);
        });

    }

    updateClient(payload) {


        const tipoCliente = this.routingData.value.tipo;
        delete tipoCliente.created_at;
        payload.id = this.routingData.value.id;
        payload.tipo = tipoCliente;

        $still.HTTPClient.put(
            'http://localhost:3000/api/v1/cliente',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {
            AppTemplate.hideLoading();
            Router.goto('ClientsGrid');
        }).catch((err) => {
            AppTemplate.hideLoading();
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
        AppTemplate.hideLoading();

    }

}

/**
 * 
 * Function to load JQuery Step/Wizard which is 
 * called in the calss component 
 */
function loadWizard({ enableAllSteps = false } = {}) {

    var form = $('#client_wizard_with_validation').show();
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