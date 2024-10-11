class ProcessoForm extends ViewComponent {
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
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 2,
            descricao: "Proposta",
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 3,
            descricao: "Suspenso",
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
        },
        {
            id: 4,
            descricao: "Encerrado",
            created_at: "2024-10-06 21:30:34",
            updated_at: "2024-10-06 21:30:34",
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
                                            <select (change)="updateFase($event)">
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
                                    <select (change)="updateInstituicao($event)" (forEach)="listInstituicao">
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
                                        <select (change)="updateModoFacturacao($event)" (forEach)="listModoFacturacao">
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
                                <div class="col-md-6">
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

                                <div class="col-md-6">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Cliente
                                    </span>
                                    <select (change)="updateClientes($event)" (forEach)="listClientes">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>

                            </div>

                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Data de registo
                                        </span>
                                        <div class="form-line">
                                            <input type="date" id="dataRegistoInput" (change)="updateDataRegisto($event)" class="form-control date" (value)="dataRegisto">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Estado
                                        </span>
                                        <select (change)="updateEstado($event)" (forEach)="listEstado">
                                            <option each="item" value="">Selecione uma opção</option>
                                            <option each="item" value="{item.id}">{item.descricao}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </fieldset>

                        <h3>Precedentes / Tarefas </h3>
                        <fieldset>
                            <h2 class="card-inside-title">Processos associados / Tarefas</h2>
                            <div class="row clearfix">    
                                <div class="col-md-6">
                                    <div class="row">
                                        <div class="col-md-10">
                                        <select (change)="updatePrecedentes($event)" (forEach)="listPrecedentes">
                                            <option each="item" value="">Selecione uma opção</option>
                                            <option each="item" value="{item.id}">{item.descricao}</option>
                                        </select>
                                        </div>
                                        <div class="col-md-2">
                                            <button (click)="addPrecedentesProcesso()" class="btn btn-default"><i class="fas fa-plus"></i></button>
                                        </div>
                                        <div class="col-md-12">
                                            <div id="divListProcessosAssociados">
                                                <p>Lista dos processos associados</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>                       
                                <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" placeholder="digite uma tarefa" (value)="tarefaInput">
                                    </div>
                                    <div class="col-md-2">
                                        <button (click)="addTarefaProcesso()" class="btn btn-sm btn-default"  ><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="col-md-12">
                                        <div id="divListTarefasProcesso">
                                            <p>Inputs das tarefas</p>
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
                                    <div class="col-md-10">
                                    <select (change)="updateEquipasProcesso($event)" (forEach)="listEquipas">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                    </div>
                                    <div class="col-md-2">
                                        <button (click)="addEquipaProcesso()" class="btn btn-default"><i class="fas fa-plus"></i></button>
                                    </div>
                                    <div class="col-md-12">
                                        <div id="divListEquipa">
                                            <p>Lista das equipas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>                       
                            
                        
                        <button class="btn btn-default julaw-submit-button" (click)="registerProcesso()">Salvar</button>
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

    registerProcesso() {

        this.precedentes = listPrecedentesArray.length ? listPrecedentesArray.map((el) => el.id) : []
        this.equipas = listEquipasArray.length ? listEquipasArray.map((el) => el.id) : []
        this.tarefas = listTarefasArray

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
            "dataSuspensao": null,
            "colaboradorIdSuspendeu": null,
            "dataEncerramento": null,
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
                        Router.goto('ProcessosGrid');
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
                            descricao: `${colaborador.tipo.description} - ${colaborador.nome_completo}`,
                        });

                        if (colaborador.funcao.includes("adv")) {
                            equipasData.push({
                                id: colaborador.id,
                                descricao: `${colaborador.tipo.description} - ${colaborador.nome_completo}`,
                            });
                        }
                    }

                    this.listEquipas = equipasData;
                    this.listColaboradores = colaboradorData;

                    console.log(
                        "getListColaboradores - COLABORADORES >>>>>> ",
                        this.listColaboradores
                    );
                    console.log(
                        "getListColaboradores - EQUIPAS >>>>>> ",
                        this.listEquipas
                    );
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

    getListPrecedentes() {
        $still.HTTPClient.get("http://localhost:3000/api/v1/processo/").then(
            (r) => {
                if (r.data) {
                    let processoData = [];

                    for (let processo of r.data) {
                        processoData.push({
                            id: processo.id,
                            descricao: `${processo.assunto} - ${processo.ref}`,
                        });
                    }

                    this.listPrecedentes = processoData;
                    console.log("getListPrecedentes >>> ", this.listPrecedentes);
                }
            }
        );
    }

    stAfterInit() {
        this.getListPrecedentes();
        this.getListColaboradores();
        this.getListClientes();
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
        console.log(
            "updatePrecedentes >>>>>>>><<<< :::: :::: >>>>>>>>><<<<<< ",
            evt.target.value
        );
        this.precedenteInput = evt.target.value;
    }

    updateClientes(evt) {
        console.log(
            "clienteInput >>>>>>>><<<< :::: :::: >>>>>>>>><<<<<< ",
            evt.target.value
        );
        this.clienteId = evt.target.value;
    }

    updateEquipasProcesso(evt) {
        this.equipaInput = evt.target.value;
        console.log(" <<<<<<<<<< this.equipasProcesso  ", this.equipaInput)
    }

    updateDataRegisto(evt) {
        this.dataRegisto = document.getElementById("dataRegistoInput").value
        console.log(" <<<<<<<<<< this.dataRegisto  ", this.dataRegisto)
    }

    async addPrecedentesProcesso() {

        console.log("addPrecedentesProcesso... ", this.precedenteInput.value);

        let response = await $still.HTTPClient.get(`http://localhost:3000/api/v1/processo/${this.precedenteInput.value}`)
        const precedente = response.data[0]

        console.log("precedente", precedente)

        listPrecedentesArray.push({
            "id": precedente.id,
            "ref": precedente.ref,
            "assunto": precedente.assunto
        });

        console.log(listPrecedentesArray);
        displayPrecedentes();
    }

    addTarefaProcesso() {
        console.log("addTarefaProcesso... ", this.precedenteInput.value);
        listTarefasArray.push(this.tarefaInput.value);
        console.log(listTarefasArray);
        displayTarefas();
        setTimeout(() => {
            this.tarefaInput = ""
        }, 1000)
    }

    async addEquipaProcesso() {
        console.log("addEquipaProcesso ... ", this.equipaInput.value);
        let response = await $still.HTTPClient.get(`http://localhost:3000/api/v1/colaborador/${this.equipaInput.value}`)
        const colaborador = response.data[0]

        console.log("colaborador", colaborador)

        listEquipasArray.push({
            "id": colaborador.id,
            "nome": colaborador.nome_completo,
            "funcao": colaborador.tipo.description
        });
        console.log(listEquipasArray);
        //this.precedentes.push(this.precedenteInput.value);
        displayEquipas();
    }

}


function removePrecedente(elm) {
    console.log("remove precendente", elm.dataset.id)
    listPrecedentesArray = listPrecedentesArray.filter(el => el.id != elm.dataset.id)
    console.log(listPrecedentesArray)
    displayPrecedentes()
}

function displayPrecedentes() {
    let frame = document.getElementById("divListProcessosAssociados");
    let templateFrame = `
    <div style="background-color: #f2f2f2; width: 80%">
        <div>
            <table class="table bordered" width="70%">
                <tr>
                    <th>Ref. Processo </th>
                    <th>Assunto </th>
                    <th>&nbsp;</th>
                </tr>
            `;
    for (let precedente of listPrecedentesArray) {
        templateFrame += `
                <tr>
                    <td>${precedente.ref}</td>
                    <td>${precedente.assunto}</td>
                    <td>
                        <span data-id=${precedente.id} onClick="removePrecedente(this)" style="cursor: pointer">
                        <i class="fas fa-trash"></i>
                        </span>
                    </td>                            
                </tr>
            `;
    }

    templateFrame += `</table>
        </div>
    </div>`;
    console.log(frame);
    frame.innerHTML = templateFrame;

}


function removeTarefa(elm) {
    listTarefasArray = listTarefasArray.filter(el => el != elm.dataset.id)
    displayTarefas()
}

function displayTarefas() {

    let frame = document.getElementById("divListTarefasProcesso");
    let templateFrame = `
    <div style="background-color: #f2f2f2; width: 80%">
        <div>
            <table class="table bordered" width="70%">
                <tr>
                    <th>Tarefa</th>
                    <th>Estado</th>
                    <th>Remover</th>
                </tr>
            `;
    for (let tarefa of listTarefasArray) {
        templateFrame += `
                <tr>
                    <td>${tarefa}</td>
                    <td><input type="checkbox" id="horns" name="horns" /></td>
                    <td>
                        <span data-id=${tarefa} onClick="removeTarefa(this)" style="cursor: pointer">
                        <i class="fas fa-trash"></i>
                        </span>
                    </td>                            
                </tr>
            `;
    }

    templateFrame += `</table>
        </div>
    </div>`;
    console.log(frame);
    frame.innerHTML = templateFrame;

}



function removeEquipa(elm) {
    listEquipasArray = listEquipasArray.filter((el) => el.id != elm.dataset.id)
    displayEquipas()
}

function displayEquipas() {

    let frame = document.getElementById("divListEquipa");
    let templateFrame = `
    <div style="background-color: #f2f2f2; width: 80%">
        <div>
            <table class="table bordered" width="70%">
                <tr>
                    <th>Nome </th>
                    <th>Tipo</th>
                    <th>&nbsp;</th>
                </tr>
            `;
    for (let equipa of listEquipasArray) {
        templateFrame += `
                <tr>
                    <td>${equipa.nome}</td>
                    <td>${equipa.funcao}</td>
                    <td>
                        <span data-id=${equipa.id} onClick="removeEquipa(this)" style="cursor: pointer">
                        <i class="fas fa-trash"></i>
                        </span>
                    </td>                            
                </tr>
            `;
    }

    templateFrame += `</table>
        </div>
    </div>`;
    frame.innerHTML = templateFrame;

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
}

function setButtonWavesEffect(event) {
    $(event.currentTarget).find('[role="menu"] li a').removeClass("waves-effect");
    $(event.currentTarget)
        .find('[role="menu"] li:not(.disabled) a')
        .addClass("waves-effect");
}

let listPrecedentesArray = [];
let listTarefasArray = [];
let listEquipasArray = [];
