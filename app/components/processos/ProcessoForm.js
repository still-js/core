class ProcessoForm extends ViewComponent {
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

    status = "Activo";

    template = `
    <section class="content">
    <div class="row clearfix">
        <div class="title-grid-component">
            <span class="fas fa-folder title-grid-component-icon"></span>
            <h3>Novo Processo</h3>
            <span class="title-grid-component-description">cria um novo processo</span>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2><strong>Cadastro</strong> de processo</h2>
                </div>
                <div class="body">
                    <form id="wizard_with_validation" onsubmit="javascript: return false;">
                        <h3>Dados Processo</h3>
                        <fieldset>

                            <h2 class="card-inside-title">Detalhes do processo</h2>
                            <div class="row clearfix">
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">note</i> Assunto
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="nome_completo"
                                                placeholder="Nome completo">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">group</i> Área
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="nome_profissional"
                                                placeholder="Nome">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <div class="input-field col s12">
                                            <span class="input-group-addon">
                                                <i class="material-icons">person</i> Fase
                                            </span>
                                            <select (change)="updateTipoColaborador($event)">
                                                <option value="" disabled selected>Selecione o tipo de colaborador
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
                                            <i class="material-icons">person</i> Instituição
                                        </span>
                                        <select (change)="updateTipoCategoria($event)">
                                            <option value="" disabled selected>Selecione uma categoria</option>
                                            <option value="administrativo">Administrativo</option>
                                            <option value="adv_junior">Júnior</option>
                                            <option value="adv_senior">Sénior</option>
                                            <option value="adv_estagiario">Estagiário</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Modo de Facturação
                                        </span>
                                        <select (change)="updateTipoCategoria($event)">
                                            <option value="" disabled selected>Selecione uma categoria</option>
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
                                            <i class="material-icons">today</i> Contra Parte
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="data_nascimento">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Gestor do processo
                                        </span>
                                        <select (change)="updateStatus($event)">
                                            <option value="" disabled>Selecione um status</option>
                                            <option value="pending">Pendente</option>
                                            <option selected value="active">Activo</option>
                                            <option value="inactive">Inactivo</option>
                                        </select>
                                    </div>

                                </div>

                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Data de registo
                                        </span>
                                        <div class="form-line">
                                            <input type="date" class="form-control date" (value)="username"
                                                placeholder="Nome de Usuário">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">today</i> Contra Parte
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="data_nascimento" />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">today</i> Contra Parte
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="data_nascimento" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Estado
                                        </span>
                                        <select (change)="updateTipoCategoria($event)">
                                            <option value="" disabled selected>Selecione uma categoria</option>
                                            <option value="administrativo">Administrativo</option>
                                            <option value="adv_junior">Júnior</option>
                                            <option value="adv_senior">Sénior</option>
                                            <option value="adv_estagiario">Estagiário</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </fieldset>

                        <h3>Precedentes / Modo de Facturação</h3>
                        <fieldset>
                            <h2 class="card-inside-title">Processos associados / Modo de facturação</h2>
                            <div class="row clearfix">    
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <select (change)="updateTipoCategoria($event)">
                                                <option value="" disabled selected>Selecione uma categoria</option>
                                                <option value="administrativo">Administrativo</option>
                                                <option value="adv_junior">Júnior</option>
                                                <option value="adv_senior">Sénior</option>
                                                <option value="adv_estagiario">Estagiário</option>
                                            </select>
                                        </div>
                                        <div class="col-md-4">
                                            <button class="btn btn-default"><i class="fas fa-plus"></i></button>
                                        </div>
                                        <div class="col-md-12">
                                            <div>
                                                <p>Lista dos processos associados</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>                       
                                <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-8">
                                        <select (change)="updateTipoCategoria($event)">
                                            <option value="" disabled selected>Selecione um Modo de Facturação</option>
                                            <option value="administrativo">Administrativo</option>
                                            <option value="adv_junior">Júnior</option>
                                            <option value="adv_senior">Sénior</option>
                                            <option value="adv_estagiario">Estagiário</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <button class="btn btn-sm btn-default"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="col-md-12">
                                        <div>
                                            <p>Inputs de acordo ao modo de facturação</p>
                                        </div>
                                    </div>
                                </div>
                            </div>                  
                            </div>

                        </fieldset>
                        <h3>Equipa / Advogados</h3>
                        <fieldset>
                        <h2 class="card-inside-title">Associar advogados ao Processo</h2>
                        <div class="row clearfix">    
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-8">
                                        <select (change)="updateTipoCategoria($event)">
                                            <option value="" disabled selected>Selecione uma categoria</option>
                                            <option value="administrativo">Administrativo</option>
                                            <option value="adv_junior">Júnior</option>
                                            <option value="adv_senior">Sénior</option>
                                            <option value="adv_estagiario">Estagiário</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <button class="btn btn-default"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="col-md-12">
                                        <div>
                                            <p>Lista dos processos associados</p>
                                        </div>
                                    </div>
                                </div>
                            </div>                       
                            
                        
                        <button class="btn btn-default julaw-submit-button" (click)="registerColaborador()">Salvar</button>
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
        loadWizard();
        tinymce.init({
            selector: "textarea#tinymce1",
            theme: "modern",
            height: 300,
            plugins: [
                "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars code fullscreen",
                "insertdatetime media nonbreaking save table contextmenu directionality",
                "emoticons template paste textcolor colorpicker textpattern imagetools",
            ],
        });
    }

    updateTipoColaborador(evt) {
        console.log("Value is: ", evt);
        this.tipo_colaborador_id = evt.target.value;
        console.log("after setted ... ", this.tipo_colaborador_id);
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
            username: this.username.value,
            nome_completo: this.nome_completo.value,
            nome_profissional: this.nome_profissional.value,
            data_nascimento: "2000-05-20", //this.data_nascimento.value,
            funcao: this.funcao.value,
            tipo_colaborador_id: this.tipo_colaborador_id.value,
            contactos: [
                {
                    tipo: 2,
                    valor: this.contactos_email_pessoal.value,
                },
                {
                    tipo: 2,
                    valor: this.contactos_email_corporativo.value,
                },
                {
                    tipo: 1,
                    valor: this.contactos_telefone_pessoal.value,
                },
                {
                    tipo: 1,
                    valor: this.contactos_telefone_emergencia.value,
                },
                {
                    tipo: 3,
                    valor: this.contactos_telefone_endereco.value,
                },
            ],
            identificacoes: [
                {
                    tipo: 4,
                    valor: this.identificacoes_cedula.value,
                },
                {
                    tipo: 1,
                    valor: this.identificacoes_bi.value,
                },
            ],

            status: this.status.value,
        };

        if (this.isValidInputForm()) {
            $still.HTTPClient.post(
                "http://localhost:3000/api/v1/colaborador",
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    console.log(`colaborador criado com sucesso: `, response);
                    console.log(`login criado com sucesso: `, response);
                    if (response.status !== 201) {
                        alert(response.errors);
                        // Router.goto('Init');
                    } else {
                        alert("Salvo com sucesso");
                        console.log("cadastro do colaborador ... ", response);
                        //AppTemplate.get().store('logged', true);
                        //Router.goto('Home');
                        // aonde guardar os dados do user logado com seguranca
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao cadastrar colaborador: `, err);
                });
        }
    }

    isValidInputForm() {
        return true;
    }

    stAfterInit() {
        console.log(`Cliend Form foi initializado`);

        const routeData = Router.data("ClientForm");

        if (routeData) {
            setTimeout(() => {
                const {
                    id,
                    denominacao,
                    tipo_id,
                    nif,
                    endereco,
                    pessoa_contacto,
                    contacto_cobranca,
                    nota,
                    status,
                    tipo: { id: tipoClientId, description },
                } = routeData;

                const nomes = denominacao.split(" ");
                this.nome = nomes[0];
                this.sobrenome = nomes[1];
                this.endereco = endereco;
                this.pessoaContacto = pessoa_contacto;
                this.contactoCobranca = contacto_cobranca;
                this.nif = nif;
                this.telefone = contacto_cobranca;
                this.pessoaContacto = pessoa_contacto;
                console.log(
                    `there is a new data from route on constructor: `,
                    routeData
                );
            });
        }

        //const routeData = Router.data('ClientForm');
        //if(routeData){
        //    console.log(`there is a new data from route: `, routeData);
        //}
    }
}

function loadWizard() {
    //Advanced form with validation
    var form = $("#wizard_with_validation").show();
    form.steps({
        showFinishButtonAlways: false,
        enableFinishButton: false,
        labels: {
            finish: "Submeter",
            next: "Próximo",
            previous: "Voltar",
        },
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "slideLeft",
        onInit: function (event, currentIndex) {
            //Set tab width
            var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
            var tabCount = $tab.length;
            $tab.css("width", 100 / tabCount + "%");

            //set button waves effect
            setButtonWavesEffect(event);
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) {
                return true;
            }

            if (currentIndex < newIndex) {
                form.find(".body:eq(" + newIndex + ") label.error").remove();
                form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }

            //form.validate().settings.ignore = ':disabled,:hidden';
            return form; //.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            setButtonWavesEffect(event);
        },
        onFinishing: function (event, currentIndex) {
            //form.validate().settings.ignore = ':disabled';
            return form; //.valid();
        },
        onFinished: function (event, currentIndex) {
            swal("Good job!", "Submitted!", "success");
        },
    });

    /* form.validate({
                highlight: function (input) {
                    $(input).parents('.form-line').addClass('error');
                },
                unhighlight: function (input) {
                    $(input).parents('.form-line').removeClass('error');
                },
                errorPlacement: function (error, element) {
                    $(element).parents('.form-group').append(error);
                },
                rules: {
                    'confirm': {
                        equalTo: '#password'
                    }
                }
            }); */
}

function setButtonWavesEffect(event) {
    $(event.currentTarget).find('[role="menu"] li a').removeClass("waves-effect");
    $(event.currentTarget)
        .find('[role="menu"] li:not(.disabled) a')
        .addClass("waves-effect");
}
