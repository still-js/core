import { ViewComponent } from "../../@still/component/super/ViewComponent.js";
import { loadWizard } from "../utils/wizard.js";

export class ClientForm extends ViewComponent {

    tipoClienteId;
    nome;
    sobrenome;
    denominacao;
    nif;
    endereco;
    pessoaContacto;
    contactoCobranca;
    e_mail;
    clientNota;
    tipoClienteSelecionado;
    createdAt

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
                                    <div class="col-md-8">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">person</i> Nome / Denominação
                                            </span>
                                            <div class="form-line">
                                                <input 
                                                    (required)="true"
                                                    (validator)="text"
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="denominacao" 
                                                    placeholder="Denominação do cliente">
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
                                                    (required)="true"
                                                    (validator)="text"
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="pessoaContacto" 
                                                    placeholder="Pessoa de Contacto"
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
                                                    (required)="true"
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="contactoCobranca" 
                                                    placeholder="ex.: 900 000 000">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">mail</i> E-mail
                                            </span>
                                            <div class="form-line">
                                                <input 
                                                    (required)="true"
                                                    (validator)="email"
                                                    type="text" 
                                                    class="form-control date" 
                                                    (value)="e_mail" 
                                                    placeholder="cliente@exemplo.com"
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
                                                <textarea id="clientNotaID" (value)="clientNota" style="height: 150px; padding: 4px" cols="100" rows="50"></textarea>
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
            "denominacao": this.denominacao.value ?? routingData.denominacao,
            "tipo_id": tipoClientId,
            "nif": this.nif.value ?? routingData.nif,
            "endereco": this.endereco.value ?? routingData.endereco,
            "pessoa_contacto": this.pessoaContacto.value ?? routingData.pessoa_contacto,
            "contacto_cobranca": this.contactoCobranca.value ?? routingData.contacto_cobranca,
            "e_mail": this.e_mail.value ?? routingData.e_mail,
            "nota": document.getElementById('clientNotaID').value,
            "status": "pending"
        }

        console.log("payload ", payload)


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
            '/api/v1/cliente',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {

            AppTemplate.hideLoading();
            if (r.status === 201) {
                Router.goto('ClientsGrid');
            } else {
                alert(r.errors)
            }

        }).catch((err) => {
            AppTemplate.hideLoading();
        });

    }

    updateClient(payload) {

        const tipoCliente = this.routingData.value.tipo;
        delete tipoCliente.created_at;
        payload.id = this.routingData.value.id;
        //payload.tipo = tipoCliente;

        $still.HTTPClient.put(
            '/api/v1/cliente',
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
        });

    }

    stAfterInit() {

        this.clientType = [
            { value: 'Empresa', id: 1 },
            { value: 'Particular', id: 2 },
            { value: 'Ministério', id: 3 },
            { value: 'Instituto Público', id: 4 },
            { value: 'Associação', id: 5 },
            { value: 'Outro', id: 6 }
        ];

        const routeData = Router.data('ClientForm');
        if (routeData) {

            console.log("tipoId ", routeData)

            const {
                id, denominacao, tipo_id, nif, endereco, pessoa_contacto,
                contacto_cobranca, nota, status, e_mail
            } = routeData;

            this.nif = nif;
            this.denominacao = denominacao || '';
            this.endereco = endereco;
            this.pessoaContacto = pessoa_contacto;
            this.contactoCobranca = contacto_cobranca;
            this.e_mail = e_mail;
            document.getElementById('clientNotaID').value = nota

            setTimeout(() => {
                this.tipoClienteSelecionado = tipo_id;
            }, 500)


        }
        AppTemplate.hideLoading();

    }

}
