class ProcessoForm extends ViewComponent {
    id;
    assunto;
    area;
    fase;
    instituicaoId;
    modoFacturacaoId;
    clienteId;
    gestorId;
    contraParte;
    dataRegisto;
    dataSuspensao;
    colaboradorIdSuspendeu;
    dataEncerramento;
    colaboradorIdEnderrou;
    metodologia;
    estrategia;
    factos;
    objectivos;
    dataImportantes;
    statusId;
    precedentes;
    equipas;
    tarefas;

    tarefaInput;
    precedenteInput;
    equipaInput;
    clienteInput;

    listColaboradores;
    listPrecedentes;
    listEquipas;
    listClientes;

    listEstado = [
        {
            id: 1,
            descricao: "Rascunho",
        },
        {
            id: 2,
            descricao: "Proposta",
        },
        {
            id: 3,
            descricao: "Suspenso",
        },
        {
            id: 4,
            descricao: "Encerrado",
        },
    ];

    listModoFacturacao = [
        {
            id: 1,
            descricao: "Avença",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 2,
            descricao: "Taxa horária",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 3,
            descricao: "Valor Fixo",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 4,
            descricao: "Sucess fee",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 5,
            descricao: "pro bono",
            obesevacao: null,
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
    ];

    listInstituicao = [
        {
            id: 1,
            descricao: "SIC",
        },
        {
            id: 2,
            descricao: "PGR",
        },
        {
            id: 3,
            descricao: "Tribunal Comarca",
        },
        {
            id: 4,
            descricao: "Tribunal Relação",
        },
        {
            id: 5,
            descricao: "Tribunal Supremo",
        },
        {
            id: 6,
            descricao: "Tribunal Constitucional",
        },
        {
            id: 7,
            descricao: "Tribunal de Contas",
        },
        {
            id: 8,
            descricao: "Tribunal Militar",
        },
        {
            id: 9,
            descricao: "Outro",
        },
    ];

    template = `
    <section class="content">
    <div class="row clearfix">
        
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

        <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <ul class="breadcrumb breadcrumb-style" style="
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px
            margin-top: 10px
            ;">
                <li class="breadcrumb-item 	bcrumb-1">
                    <a href="/">
                        <i class="material-icons">home</i>
                        Home</a>
                </li>
                <li class="breadcrumb-item bcrumb-1 active">Processo</li>
                <li class="breadcrumb-item active">Lista dos Processos</li>
            </ul>
        </div>             
        </div>

        
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div>
                <h2>Novo Processo</h2>
                <p>Crie um novo Processo</p>
            </div>

            <div class="card">
                <div class="header">
                    <h2><strong>Cadastro</strong> de processo</h2>
                </div>
                <div class="body">
                    <form id="wizard_with_validatio" onsubmit="javascript: return false;">
                            <h3 style="background-color: #009688;
                                        padding: 15px;
                                        color: #fff;">
                                Dados Processo
                            </h3>

                            <h2 class="card-inside-title">Detalhes do processo</h2>
                            <div class="row clearfix">
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">note</i> Assunto
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="assunto"
                                                placeholder="assunto">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">group</i> Área
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" (value)="area"
                                                placeholder="área">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <div class="input-field col">
                                            <span class="input-group-addon">
                                                <i class="material-icons">person</i> Fase
                                            </span>
                                            <select 
                                                (change)="updateFase($event)" 
                                                (value)="fase"
                                                >
                                                <option value="" disabled selected>Selecione a fase
                                                </option>
                                                <option value="Extrajudicial">Extrajudicial</option>
                                                <option value="Judicial">Judicial</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Instituição
                                        </span>
                                    <select (change)="updateInstituicao($event)" (value)="instituicaoId" (forEach)="listInstituicao">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Modo de Facturação
                                        </span> 
                                        <select (change)="updateModoFacturacao($event)" (value)="modoFacturacaoId" (forEach)="listModoFacturacao">
                                            <option each="item" value="">Selecione uma opção</option>
                                            <option each="item" value="{item.id}">{item.descricao}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">today</i> Contra Parte
                                        </span>
                                        <div class="form-line">
                                            <input type="text" class="form-control date" placeholder="contra parte" (value)="contraParte">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Gestor do processo
                                        </span>
                                        <select (change)="updateGestorProcesso($event)" (forEach)="listColaboradores">
                                            <option each="item" value="">Selecione uma opção</option>
                                            <option each="item" value="{item.id}">{item.descricao}</option>
                                        </select>
                                    </div>

                                </div>

                                <div class="col-md-4">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Cliente
                                    </span>
                                    <select (value)="clienteId" (change)="updateClientes($event)" (forEach)="listClientes">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>

                            </div>

                            <div class="col-md-4">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Estado
                                    </span>
                                    <select (change)="updateEstado($event)" (value)="statusId" (forEach)="listEstado">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select> 
                                </div>
                            </div>


                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">date_range</i> Data de registo
                                        </span>
                                        <div class="form-line">
                                            <input type="date" id="dataRegistoInput" (change)="updateDataRegisto($event)" class="form-control date" (value)="dataRegisto">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">date_range</i> Data de Suspensão
                                    </span>
                                    <div class="form-line">
                                        <input type="date" id="dataSuspensaoInput" (change)="updateDataSuspensao($event)" class="form-control date" (value)="dataSuspensao">
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">date_range</i> Data de Encerramento
                                </span>
                                <div class="form-line">
                                    <input type="date" id="dataEncerramentoInput" (change)="updateDataEncerramento($event)" class="form-control date" (value)="dataEncerramento">
                                </div>
                            </div>
                        </div>

                            </div>
                        <div style="display: flex;
                                    justify-content: end;
                                    align-items: center;"
                        >
                            <button class="btn btn-primary julaw-submit-button" (click)="registerProcesso()">Salvar</button>
                        </div>
                        </div>
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

    registerProcesso() {
        // this.precedentes = listPrecedentesArray.length ? listPrecedentesArray.map((el) => el.id) : []
        // this.equipas = listEquipasArray.length ? listEquipasArray.map((el) => el.id) : []
        // this.tarefas = listTarefasArray

        const payload = {
            "assunto": this.assunto.value,
            "area": this.area.value,
            "fase": this.fase.value,
            "instituicaoId": this.instituicaoId.value,
            "modoFacturacaoId": this.modoFacturacaoId.value,
            "clienteId": this.clienteId.value,
            "gestorId": this.gestorId.value,
            "contraParte": this.contraParte.value,
            "dataRegisto": this.dataRegisto.value,
            "dataSuspensao": this.dataSuspensao.value,
            "colaboradorIdSuspendeu": null,
            "dataEncerramento": this.dataEncerramento.value,
            "colaboradorIdEnderrou": null,
            "metodologia": null,
            "estrategia": null,
            "factos": null,
            "objectivos": null,
            "dataImportantes": null,
            "statusId": this.statusId.value,
            "precedentes": this.precedentes.value,
            "equipas": this.equipas.value,
            "tarefas": this.tarefas.value,
        };

        console.log("payload >>> ", payload);

        if (this.id.value !== "") {
            this.updateProcesso(payload)
        } else {
            this.saveProcesso(payload)
        }

    }


    saveProcesso(payload) {

        console.log("save processo")

        if (this.isValidInputForm()) {
            $still.HTTPClient.post(
                "http://localhost:3000/api/v1/processo",
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    console.log(`processo criado com sucesso: `, response);
                    if (response.status !== 201) {
                        alert(response.errors);
                        // Router.goto('Init');
                    } else {
                        alert("Salvo com sucesso");
                        console.log("cadastro do colaborador ... ", response);
                        //AppTemplate.get().store('logged', true);
                        Router.goto("ProcessoDetalhes", {
                            data: response.data.id,
                        });
                        // aonde guardar os dados do user logado com seguranca
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao cadastrar processo: `, err);
                });
        }
    }


    updateProcesso(payload) {

        console.log("update processo")

        if (this.isValidInputForm()) {
            $still.HTTPClient.put(
                `http://localhost:3000/api/v1/processo/${this.id.value}`,
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    console.log(`processo criado com sucesso: `, response);
                    if (response.status !== 200) {
                        alert(response.errors);
                        // Router.goto('Init');
                    } else {
                        alert("Alterações salvas com sucesso");
                        console.log("cadastro do colaborador ... ", response);
                        console.log("cadastro do colaborador ... >> ", response.data);
                        console.log("cadastro do colaborador ... >> ", response.data.data[0]);
                        //AppTemplate.get().store('logged', true);

                        Router.goto("ProcessoDetalhes", {
                            data: response.data.data[0].id,
                        });
                        // aonde guardar os dados do user logado com seguranca
                    }
                })
                .catch((err) => {
                    console.log(`Erro ao cadastrar processo: `, err);
                });
        }
    }

    isValidInputForm() {
        return true;
    }

    getListColaboradores() {
        $still.HTTPClient.get("http://localhost:3000/api/v1/colaborador/").then(
            (r) => {
                if (r.data) {
                    let colaboradorData = [];
                    let equipasData = [];

                    for (let colaborador of r.data) {
                        colaboradorData.push({
                            id: colaborador.id,
                            descricao: `${colaborador.description} - ${colaborador.nome_completo}`,
                        });
                    }

                    //this.listEquipas = equipasData;
                    this.listColaboradores = colaboradorData;
                }
            }
        );
    }

    getListClientes() {
        $still.HTTPClient.get("http://localhost:3000/api/v1/cliente/").then((r) => {
            if (r.data) {
                let clienteData = [];

                for (let cliente of r.data) {
                    clienteData.push({
                        id: cliente.id,
                        descricao: `${cliente.tipo.description} - ${cliente.denominacao}`,
                    });
                }

                this.listClientes = clienteData;

                console.log(
                    "getListColaboradores - listClientes >>>>>> ",
                    this.listClientes
                );
            }
        });
    }

    stAfterInit() {
        const idP = Router.data("ProcessoForm");
        this.getListColaboradores();
        this.getListClientes();

        if (idP) {
            this.id = idP;
            this.getProcessoById(idP)
        }
    }

    getProcessoById(id) {

        $still.HTTPClient.get(
            `http://localhost:3000/api/v1/processo/${id}`
        ).then((r) => {
            if (r.status === 200) {
                try {
                    this.populateAttributes(r.data[0]);
                } catch (e) {
                    console.log("fn populates attributes", e);
                }
            }
        });


    }

    populateAttributes(data) {

        console.log("populateAttributes - data >>>>>>  ", data);

        this.id = data.id;
        this.estado = data.estado;
        this.referencia = data.ref;
        this.assunto = data.assunto;
        this.area = data.area;
        this.fase = data.fase;
        this.instituicaoId = data.instituicao_id;
        this.modoFacturacaoId = data.modo_facturacao_id;
        this.clienteId = data.cliente_id;
        this.gestorId = data.gestor_id;
        this.contraParte = data.contra_parte;
        this.dataRegisto = data.data_registo;
        this.dataSuspensao = data.data_suspensao;
        this.dataEncerramento = data.data_encerramento;
        this.metodologia = data.metodologia;
        this.estrategia = data.estrategia;
        this.factos = data.factos;
        this.objectivos = data.objectivos;
        this.dadosImportantes = data.dados_importantes;
        this.statusId = data.status_id;

        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;

        this.instituicao = data.instituicao;
        this.modo_facturacao = data.modo_facturacao;
        this.cliente = data.cliente;
        this.tipoCliente = data.tipo_cliente;
        this.gestor = data.gestor;

        setTimeout(() => {
            if(this.dataRegisto.value)
                document.getElementById('dataRegistoInput').value = this.dataRegisto.value.substr(0,10)

            if(this.dataSuspensao.value)
                document.getElementById('dataSuspensaoInput').value = this.dataSuspensao.value.substr(0,10)

            if(this.dataEncerramento.value)
                document.getElementById('dataEncerramentoInput').value = this.dataEncerramento.value.substr(0,10)
    
        }, 500)
     
    }

    /** fn updates */
    updateFase(evt) {
        this.fase = evt.target.value;
    }

    updateInstituicao(evt) {
        this.instituicaoId = evt.target.value;
    }

    updateModoFacturacao(evt) {
        this.modoFacturacaoId = evt.target.value;
    }

    updateGestorProcesso(evt) {
        this.gestorId = evt.target.value;
    }

    updateEstado(evt) {
        this.statusId = evt.target.value;
    }

    updatePrecedentes(evt) {
        this.precedenteInput = evt.target.value;
    }

    updateClientes(evt) {
        this.clienteId = evt.target.value;
    }

    updateEquipasProcesso(evt) {
        this.equipaInput = evt.target.value;
    }

    updateDataRegisto(evt) {
        this.dataRegisto = document.getElementById("dataRegistoInput").value
    }

    updateDataSuspensao(evt) {
        this.dataSuspensao = document.getElementById("dataSuspensaoInput").value
    }

    updateDataEncerramento(evt) {
        this.dataEncerramento = document.getElementById("dataEncerramentoInput").value
    }

}

/*
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
}

function setButtonWavesEffect(event) {
    $(event.currentTarget).find('[role="menu"] li a').removeClass("waves-effect");
    $(event.currentTarget)
        .find('[role="menu"] li:not(.disabled) a')
        .addClass("waves-effect");
}
*/
