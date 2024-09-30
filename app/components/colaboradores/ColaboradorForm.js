class ColaboradorForm extends ViewComponent {

    username = "";
    nome_completo = "";
    nome_profissional = "";
    data_nascimento = "";
    funcao = "";
    tipo_colaborador_id = "";
    contactos = [];
    identificacoes = "";

    template = `
    <div class="row clearfix">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="card">
                <div class="header">
                    <h2><strong>Cadastro</strong> de colaborador</h2>
                </div>
                <div class="body">
                    <form id="wizard_with_validation" onsubmit="javascript: return false;">
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
                                            <input type="text" class="form-control date" (value)="nome_completo" placeholder="Nome completo">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">group</i> Nome Profissional
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="nome_profissional" placeholder="Nome">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                <div class="input-group">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Tipo de colaborador
                                        </span>
                                        <select  (value)="tipo_colaborador_id">
                                            <option value="" disabled selected>Selecione o tipo de colaborador</option>
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
                                <select>
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
                                            <i class="material-icons">today</i> Data de Nascimento
                                        </span>
                                        <div class="form-line">
                                            <input type="date" class="form-control date" (value)="data_nascimento">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                <div class="input-field col s12">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i> Status
                                </span>
                                <select>
                                    <option value="" disabled >Selecione um status</option>
                                    <option selected value="pending">Pendente</option>
                                    <option value="active">Activo</option>
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
                                            <input type="text" class="form-control date" (value)="username" placeholder="Nome de Usuário">
                                        </div>
                                    </div>
                                </div>

                        </fieldset>

                        <h3>Contactos</h3>
                        <fieldset>
                            <h2 class="card-inside-title">Dados de contactos</h2>
                            <div class="row clearfix">
                            <div class="col-md-6">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Tipo de Contacto :
                                    </span>
                                <select>
                                    <option value="" selected disabled >Selecione um tipo</option>
                                    <option value="e-mail">Email</option>
                                    <option value="telefone">Telefone</option>
                                    <option value="endereco">Endereço</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">contact_phone</i> Valor de Contacto :   </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="contactos[]" placeholder="valor de contacto">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row clearfix">
                            <div class="col-md-6">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Tipo de Contacto :
                                    </span>
                                <select>
                                    <option value="" selected disabled >Selecione um tipo</option>
                                    <option value="e-mail">Email</option>
                                    <option value="telefone">Telefone</option>
                                    <option value="endereco">Endereço</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">contact_phone</i> Valor de Contacto :   </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="contactos[]" placeholder="valor de contacto">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row clearfix">
                            <div class="col-md-6">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Tipo de Contacto :
                                    </span>
                                <select>
                                    <option value="" selected disabled >Selecione um tipo</option>
                                    <option value="e-mail">Email</option>
                                    <option value="telefone">Telefone</option>
                                    <option value="endereco">Endereço</option>
                                    <option value="outro">Outro</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">contact_phone</i> Valor de Contacto :   </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="contactos[]" placeholder="valor de contacto">
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
                                    <i class="material-icons">person</i> Tipo de Identificação :
                                </span>
                            <select>
                                <option value="" selected disabled >Selecione um tipo</option>
                                <option value="1">Billhete de Identidade</option>
                                <option value="2">Passaporte</option>
                                <option value="3">Cartão de Residente</option>
                                <option value="4">Cédula OAA</option>
                                <option value="5">Outro</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">contact_phone</i> N.º de Identificação :   </span>
                                    <div class="form-line">
                                    <input type="text" class="form-control" (value)="identificacoes[]" placeholder="n.º identificação">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                        <div class="col-md-6">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i> Tipo de Contacto :
                                </span>
                            <select>
                                <option value="" selected disabled >Selecione um tipo</option>
                                <option value="1">Billhete de Identidade</option>
                                <option value="2">Passaporte</option>
                                <option value="3">Cartão de Residente</option>
                                <option value="4">Cédula OAA</option>
                                <option value="5">Outro</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">contact_phone</i>  N.º de Identificação :   </span>
                                    <div class="form-line">
                                    <input type="text" class="form-control" (value)="identificacoes[]" placeholder="n.º identificação">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row clearfix">
                        <div class="col-md-6">
                                <span class="input-group-addon">
                                    <i class="material-icons">person</i> Tipo de Contacto :
                                </span>
                            <select>
                                <option value="" selected disabled >Selecione um tipo</option>
                                <option value="1">Billhete de Identidade</option>
                                <option value="2">Passaporte</option>
                                <option value="3">Cartão de Residente</option>
                                <option value="4">Cédula OAA</option>
                                <option value="5">Outro</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">contact_phone</i> N.º de Identificação :   </span>
                                    <div class="form-line">
                                        <input type="text" class="form-control" (value)="identificacoes[]" placeholder="n.º identificação">
                                    </div>
                                </div>
                            </div>
                        </div>

                                <button class="julaw-submit-button" (click)="registerColaborador()">Salvar</button>

                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
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


    registerColaborador() {
        console.log(">>>>>>>>>>>>>>> ", this.tipo_colaborador_id);
        console.log(">>>>>>>>>>>>>>> ", this.nome_completo);
        console.log(">>>>>>>>>>>>>>> ", this.tipo_colaborador_id);
        console.log(">>>>>>>>>>>>>>> contactos:::  ", this.contactos);
        return 0;

        const payload = {
            denominacao: this.nome.value,
            tipo_id: 1,
            nif: this.nif.value,
            endereco: this.endereco.value,
            pessoa_contacto: this.pessoaContacto.value,
            contacto_cobranca: this.contactoCobranca.value,
            nota: this.clientNota.value,
            status: "pending",
        };

        $still.HTTPClient.post(
            "http://localhost:3000/api/v1/colaborador",
            JSON.stringify(payload),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((r) => {
                console.log(`colaborador criado com sucesso: `, r.data);
            })
            .catch((err) => {
                console.log(`Erro ao cadastrar colaborador: `, err);
            });

        //console.log(this.getStateValues());
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
