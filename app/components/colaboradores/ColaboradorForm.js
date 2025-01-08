class ColaboradorForm extends ViewComponent {

    id;
    username;
    nome_completo;
    nome_profissional;
    data_nascimento;
    funcao;
    tipo_colaborador_id;

    contactos_telefone_pessoal;
    contactos_telefone_emergencia;
    contactos_email_pessoal;
    contactos_email_corporativo;
    contactos_telefone_endereco;

    identificacoes_bi;
    identificacoes_cedula;
    taxa_horaria;

    status = "Activo";
    

    /** @Prop */
    isEditForm = false;

    /** @type { STForm } */
    colaboradorForm;

    template = `
    <section class="content">
    <div class="container-fluid">"
       
        <div 
            class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style="margin-top: -55px;"
            >
            <div class="card">
                <div class="header">
                    <h2><strong>Cadastro</strong> de colaborador</h2>
                </div>
                <div class="body">
                    <form id="col_wizard_with_validation" (formRef)="colaboradorForm" onsubmit="javascript: return false;">
                        <h3>Dados Pessoais</h3>
                        <fieldset>

                            <h2 class="card-inside-title">Detalhes do colaborador</h2>
                            <div class="row clearfix">
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Nome Completo
                                        </span>
                                        <div class="form-line">
                                            <input 
                                            (required)="true"
                                            (validator)="text"
                                            type="text" 
                                            class="form-control date" 
                                            (value)="nome_completo" 
                                            placeholder="Nome completo">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">group</i> Nome Profissional
                                        </span>
                                        <div class="form-line">
                                            <input   
                                                (required)="true"
                                                (validator)="text" 
                                                type="text" 
                                                class="form-control date" 
                                                (value)="nome_profissional" 
                                                placeholder="Nome">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                <div class="input-group">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Tipo de colaborador
                                        </span>
                                        <select 
                                            (required)="true" 
                                            id="select-tipo-colaborador" 
                                            (change)="updateTipoColaborador($event)"
                                            (value)="tipo_colaborador_id"
                                        >
                                            <option 
                                                value="" 
                                                disabled 
                                                selected>Selecione o tipo de colaborador
                                            </option>
                                            <option value="1">Administrativo</option>
                                            <option value="2">Advogado - Júnior</option>
                                            <option value="3">Advogado - Sénior</option>
                                            <option value="4">Advogado - Estagiário</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                                <div class="col-md-4">
                                <div class="input-field col s12">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i> Categoria
                                </span>
                                <select  
                                        (required)="true" 
                                        (change)="updateTipoCategoria($event)" 
                                        (value)="funcao"
                                >
                                    <option  value="" disabled selected>Selecione uma categoria</option>
                                    <option value="administrativo">Administrativo</option>
                                    <option value="adv_junior">Júnior</option>
                                    <option value="adv_senior">Sénior</option>
                                    <option value="adv_estagiario">Estagiário</option>
                                </select>
                            </div>
                            </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">today</i> Data de Nascimento
                                        </span>
                                        <div class="form-line">
                                            <input type="date" id="dataNascimento" class="form-control date" (value)="data_nascimento">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                <div class="input-field col s12">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i> Status
                                </span>
                                <select (change)="updateStatus($event)" (value)="status">
                                    <option value="" disabled >Selecione um status</option>
                                    <option  value="pending">Pendente</option>
                                    <option  selected value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                </select>
                            </div>
                            
                            </div>

                            <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Usuário
                                        </span>
                                        <div class="form-line">
                                            <input 
                                                id="userName"
                                                type="text" 
                                                class="form-control date" 
                                                (value)="username" 
                                                placeholder="Nome de Usuário"
                                            >
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
                                        <i class="material-icons">mail</i> E-mail Pessoal
                                    </span>
                                <div class="form-line">
                                    <input 
                                        type="text" 
                                        class="form-control date" 
                                        (value)="contactos_email_pessoal" 
                                        placeholder="e-mail pessoal">
                                </div>
                        </div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">mail</i> E-mail Corporativo
                                    </span>
                                <div class="form-line">
                                    <input 
                                        type="text" 
                                        class="form-control date" 
                                        (value)="contactos_email_corporativo" 
                                        placeholder="e-mail corporativo"
                                    >
                                </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                            <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">phone</i> Contacto Pessoal
                            </span>
                        <div class="form-line">
                            <input  
                                (required)="true"
                                type="text" 
                                class="form-control date" 
                                (value)="contactos_telefone_pessoal" 
                                placeholder="contacto pessoal"
                            >
                        </div>
                        </div>
                            </div>
                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">phone</i>Contacto de Emergência
                                    </span>
                                <div class="form-line">
                                    <input 
                                        type="text" 
                                        class="form-control date" 
                                        (value)="contactos_telefone_emergencia" 
                                        placeholder="contacto de emergenciaio"
                                    >
                            </div>
                                </div>
                            </div>
                           
                            <div class="col-md-12">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">room</i> Endereço :   </span>
                                        <div class="form-line">
                                            <input 
                                                type="text" 
                                                class="form-control date" 
                                                (value)="contactos_telefone_endereco" 
                                                placeholder="Cidade, Bairro - casa n.º"
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </fieldset>

                        <h3>Custo Financeiro</h3>
                        <fieldset>
                            <h2 class="card-inside-title">Dados de custo financeiro</h2>
                                <div class="row clearfix">
                                    <div class="col-md-2">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="material-icons">payment</i> Taxa Horária
                                            </span>
                                            <div class="form-line">
                                                <input                                                    
                                                   id="input-taxa-horaria" 
                                                   type="numeric" 
                                                   class="form-control date" 
                                                   (value)="taxa_horaria" 
                                                   placeholder="0,00kz/h"
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </fieldset>

                        <h3>Identificação</h3>
                        <fieldset>
                        <h2 class="card-inside-title">Dados de identificação</h2>
                        <div class="row clearfix">
                        <div class="col-md-6">
                                <span class="input-group-addon">
                                    <i class="far fa-id-card"></i> Tipo de Identificação :
                                </span>
                            <select>
                                <option selected >Billhete de Identidade</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="far fa-id-card"></i> N.º de Identificação :   </span>
                                    <div class="form-line">
                                    <input  
                                            (required)="true"
                                            type="text" 
                                            class="form-control" 
                                            (value)="identificacoes_bi" 
                                            placeholder="n.º identificação"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                        <div class="col-md-6">
                                <span class="input-group-addon">
                                <i class="far fa-id-card"></i> Tipo de Identificação :
                                </span>
                            <select>
                                <option selected >Cédula OAA</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                    <i class="far fa-id-card"></i>  N.º de Identificação :   </span>
                                    <div class="form-line">
                                    <input 
                                        id="identificacao_cedula" 
                                        type="text" 
                                        class="form-control" 
                                        (value)="identificacoes_cedula" 
                                        placeholder="n.º identificação"
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>    

                        <div style="display: flex;
                        justify-content: end;
                        align-items: center;"

            >
                        
                            <button class="btn btn-primary julaw-submit-button" (click)="registerColaborador()">Salvar</button>

                        </div>


                        
                        </div>
                                                
               

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
            scripts: ["assets/js/form.min.js"],
        });
    }

    onRender() {
        const routingData = Router.data("ColaboradorForm");
        console.log("here....")
        loadWizardColaborador({ enableAllSteps: routingData ? true : false });
        document.getElementById("input-taxa-horaria").disabled = routingData ? false : true;
    }

    updateTipoCategoria(evt) {
        console.log("Value is: ", evt);
        this.funcao = evt.target.value;
        console.log("after setted ... ", this.funcao);
    }

    updateContactoEndereco(evt) {
        console.log("Value is: updateContactoEndereco ", evt);
        //this.funcao = evt.target.value;
        //console.log("after setted ... ", this.funcao)
    }
    updateStatus(evt) {
        console.log("Value is: ", evt);
        this.status = evt.target.value;
        console.log("after setted ... ", this.status);
    }

    registerColaborador() {


        const payload = {
            "username": this.username.value,
            "nome_completo": this.nome_completo.value,
            "nome_profissional": this.nome_profissional.value,
            "data_nascimento": document.getElementById('dataNascimento').value,
            "funcao": this.funcao.value,
            "tipo_colaborador_id": this.tipo_colaborador_id.value,
            "taxa_horaria": this.taxa_horaria.value,
            "contactos": [
                {
                    "tipo": 2,
                    "valor": this.contactos_email_pessoal.value,
                },
                {
                    "tipo": 2,
                    "valor": this.contactos_email_corporativo.value,
                },
                {
                    "tipo": 1,
                    "valor": this.contactos_telefone_pessoal.value,
                },
                {
                    "tipo": 1,
                    "valor": this.contactos_telefone_emergencia.value,
                },
                {
                    "tipo": 3,
                    "valor": this.contactos_telefone_endereco.value,
                }
            ],
            "identificacoes": [
                {
                    "tipo": 4,
                    "valor": this.identificacoes_cedula.value,
                },
                {
                    "tipo": 1,
                    "valor": this.identificacoes_bi.value,
                }
            ],

            "status": this.status.value,
            "custoFinanceiro":
            {
                "taxa_horaria": this.taxa_horaria.value
            },
        };

        const isValidForm = this.colaboradorForm.validate();

        if (isValidForm) {

            if(!this.isNotEmptyCedula()) {
                AppTemplate.toast({ status: 'Error', message: "N.º da Cédula é obrigatória."})
                return false
            }

            if(this.isEditForm) {
                this.updateColaborador(payload)
            }else{
                if(this.username.value == "") {
                    AppTemplate.toast({ status: 'Error', message: "O nome de Usuário é obrigatório."})
                    return false
                }
                this.saveColaborador(payload)
            }
         
        } else {
            AppTemplate.toast({ status: 'warning', message: 'Por favor, preencha os campos obrigatórios' })
        }
    }

    saveColaborador(payload) {

        AppTemplate.showLoading();

        $still.HTTPClient.post(
            "/api/v1/colaborador",
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (response.status !== 201) {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'Erro', message: JSON.stringify(response.errors) })
                } else {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'Sucesso!', message: 'Colaborador salvo com Sucesso!' })
                    Router.goto('ColaboradoresGrid');
                }
            })
            .catch((err) => {
                AppTemplate.hideLoading();
                AppTemplate.toast({ status: 'Aviso', message: err.message })
            });
    }

    updateColaborador(payload){

        AppTemplate.showLoading();

        $still.HTTPClient.put(
            `/api/v1/colaborador/${this.id.value}`,
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (response.status !== 200) {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'Erro', message: JSON.stringify(response.errors) })
                } else {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'Sucesso!', message: 'Colaborador salvo com Sucesso!' })
                    Router.goto('ColaboradoresGrid');
                }
            })
            .catch((err) => {
                AppTemplate.hideLoading();
                AppTemplate.toast({ status: 'Aviso', message: err.message })
            });
    }

    updateTipoColaborador(evt) {
        this.tipo_colaborador_id = evt.target.value;
        disabledTaxaHoraria();
    }

    updateTipoCategoria(evt) {
        this.funcao = evt.target.value;
    }

    updateContactoEndereco(evt) {
        console.log("Value is: updateContactoEndereco ", evt);
        //this.funcao = evt.target.value;
        //console.log("after setted ... ", this.funcao)
    }
    updateStatus(evt) {
        this.status = evt.target.value;
    }

    stAfterInit() {

        const routeData = Router.data("ColaboradorForm");

        if (routeData) {

            let contactos;
            let emailPessoal;
            let emailEmpresa;
            let contactoPessoal;
            let contactoEmergencia;
            let endereco;

            let documentos;
            let bi;
            let cedula;

            if(routeData.contact_value){
                contactos = routeData.contact_value.split(',');
                emailPessoal = contactos[0].split('|')[1];
                emailEmpresa = contactos[1].split('|')[1];
                contactoPessoal = contactos[2].split('|')[1];
                contactoEmergencia = contactos[3].split('|')[1];
                endereco = contactos[4].split('|')[1];
            }

            if(routeData.tipo_documentos_code) {
                documentos = routeData.tipo_documentos_code.split(',');
                bi = documentos[1].split('|')[1];
                cedula = documentos[0].split('|')[1];
            }


            this.id = routeData.id
            this.nome_completo = routeData.nome_completo;
            this.nome_profissional = routeData.nome_profissional;
            this.tipo_colaborador_id = routeData.tipo_colaborador_id;
            this.status = routeData.status;
            this.data_nascimento = routeData.data_nascimento.toString().substring(0,10);
            this.funcao = routeData.funcao;
            this.status = routeData.status;
            this.contactos_email_pessoal = emailPessoal;
            this.contactos_email_corporativo = emailEmpresa;
            this.contactos_telefone_pessoal = contactoPessoal;
            this.contactos_telefone_emergencia = contactoEmergencia;
            this.contactos_telefone_endereco = endereco;

            this.identificacoes_bi = bi;
            this.identificacoes_cedula = cedula;
            this.taxa_horaria = routeData.taxa_horaria;

            this.isEditForm = true;

        }

    }

    isNotEmptyCedula() {
        var e = document.getElementById("select-tipo-colaborador");
        var typeCollaborator = e.options[e.selectedIndex].text;    
    
        console.log("here ",  (typeCollaborator.toString().includes("Advogado")) 
        && document.getElementById('identificacao_cedula').value == "")
    
        if (
            (typeCollaborator.toString().includes("Advogado")) 
                && 
            (document.getElementById('identificacao_cedula').value == ""))
            return false
        else
            return true;
    }

}

function loadWizardColaborador({ enableAllSteps = false } = {}) {

    var form = $('#col_wizard_with_validation').show();
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
    $(event.currentTarget).find('[role="menu"] li a').removeClass("waves-effect");
    $(event.currentTarget)
        .find('[role="menu"] li:not(.disabled) a')
        .addClass("waves-effect");
}

function disabledTaxaHoraria() {
    var e = document.getElementById("select-tipo-colaborador");
    var typeCollaborator = e.options[e.selectedIndex].text;
    console.log('o valor do select é', typeCollaborator);

    if (typeCollaborator == "Administrativo") {
        document.getElementById("input-taxa-horaria").disabled = true;
    }
    else {
        document.getElementById("input-taxa-horaria").disabled = false;
    }

}

