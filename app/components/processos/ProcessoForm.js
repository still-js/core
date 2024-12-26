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
    dataRegisto = null;
    dataSuspensao = null;
    colaboradorIdSuspendeu;
    dataEncerramento = null;
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

    horasMes;
    valorTotal;
    dataEmissaoFactura;

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
        },
        {
            id: 2,
            descricao: "Success Fee",
        },
        {
            id: 3,
            descricao: "Fixo",
        },
        {
            id: 4,
            descricao: "Probono",
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

    /** @type { STForm } */
    processoForm;

    template = `
    <section class="content">
    <div class="row clearfix">
        
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="title-grid-component" style="display: flex">
                <span class="fas fa-archive title-grid-component-icon"></span>    
                <h3>Novo Processo</h3>
            </div>
            <div class="card">
                <div class="body" style="margin-top: -55px;">
                    <form id="wizard_with_validatio" (formRef)="processoForm" onsubmit="javascript: return false;">
                            <h3 style="background-color: #009688;
                                        padding: 15px;
                                        color: #fff;">
                                Dados Processo
                            </h3>

                            <div class="row clearfix" style="margin-top: 30px">
                                <div class="col-md-4">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <i class="material-icons">note</i> Assunto
                                        </span>
                                        <div class="form-line">
                                            <input 
                                            (required)="true"
                                            (validator)="text" 
                                            type="text" class="form-control date" (value)="assunto"
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
                                            <input 
                                            (required)="true"
                                            (validator)="text" 
                                            type="text" class="form-control date" (value)="area"
                                                placeholder="área">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <i class="material-icons">today</i> Contra Parte
                                    </span>
                                    <div class="form-line">
                                        <input 
                                        (required)="true"
                                        (validator)="text" 
                                        type="text" class="form-control date" placeholder="contra parte" (value)="contraParte">
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
                                                (required)="true"
                                                
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
                                    <select
                                    (required)="true"
                                    (change)="updateInstituicao($event)" (value)="instituicaoId" (forEach)="listInstituicao">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                    </div>
                                </div>

                               
                                <div class="col-md-4">
                                    <div class="input-field col s12">
                                        <span class="input-group-addon">
                                            <i class="material-icons">person</i> Gestor do processo
                                        </span>
                                        <select (value)="gestorId" (change)="updateGestorProcesso($event)" (forEach)="listColaboradores">
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
                                            <input 
                                            type="date" 
                                            id="dataRegistoInput" 
                                            (change)="updateDataRegisto($event)" 
                                            class="form-control date" 
                                            (value)="dataRegisto"
                                        >
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Modo de Facturação
                                    </span> 
                                    <select
                                    (required)="true"
                                    (change)="updateModoFacturacao($event)" (value)="modoFacturacaoId" (forEach)="listModoFacturacao">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="material-icons">access_time</i> Horas / Mês
                                </span>
                                <div class="form-line">
                                    <input id="horasMesInput" disabled type="numeric" class="form-control" placeholder=" 00 H" (value)="horasMes">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">attach_money</i> Valor Total
                            </span>
                            <div class="form-line">
                                <input type="numeric" id="valorTotalInput" disabled class="form-control" placeholder=" 0,00 Kz" (value)="valorTotal">
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

                        <div class="col-md-4">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="material-icons">date_range</i> Data para Emissão Factura
                            </span>
                            <div class="form-line">
                                <input type="date" id="dataEmissaoFacturaInput" (change)="updateDataEmissaoFactura($event)" class="form-control date" (value)="dataEmissaoFactura">
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

        const payload = {

            "assunto": this.assunto.value,
            "area": this.area.value,
            "fase": this.fase.value,
            "instituicaoId": this.instituicaoId.value,
            "modoFacturacaoId": this.modoFacturacaoId.value,
            "clienteId": this.clienteId.value === "" ? null : this.clienteId.value,
            "gestorId": this.gestorId.value === "" ? null : this.gestorId.value,
            "contraParte": this.contraParte.value,
            "dataRegisto": document.getElementById('dataRegistoInput').value,
            "dataSuspensao": document.getElementById('dataSuspensaoInput').value,
            "colaboradorIdSuspendeu": null,
            "dataEncerramento": document.getElementById('dataEncerramentoInput').value,
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
            "horasMes": this.horasMes.value == "" ? null : this.horasMes.value,
            "valorTotal": this.valorTotal.value == "" ? null : this.valorTotal.value,
            "dataEmissaoFactura":  document.getElementById('dataEmissaoFacturaInput').value
        };


        console.log("payload save processo... ", payload)
        // return 0

        const isValidForm = this.processoForm.validate();

        if (isValidForm) {
            AppTemplate.showLoading();
            if (this.id.value !== "") {
                this.updateProcesso(payload)
            } else {
                this.saveProcesso(payload)
            }
<<<<<<< HEAD
        } else {
            AppTemplate.toast({ status: 'warning', message: 'Por favor, preencha os campos obrigatórios' })
=======
        }else{

            AppTemplate.toast({status: 'warning', message: 'Por favor, preencha os campos obrigatórios'})
>>>>>>> fix_cliente
        }
    }

    formProcessoValidade() {

        if (Number(this.modoFacturacaoId.value) == 1 && this.horasMes.value == "") {
            alert("Para modo de facturação Avença, as horas/meses deve ser preenchida!")
            document.getElementById("horasMesInput").focus()
            return false
        }
        if (Number(this.modoFacturacaoId.value) == 2 && this.valorTotal.value == "") {
            alert("Para modo de facturação Success Fee, a valor total deve ser preenchida")
            document.getElementById("valorTotalInput").focus()
            return false
        }
        if (Number(this.modoFacturacaoId.value) == 3 && this.valorTotal.value == "") {
            alert("Para modo de facturação Fixo, a valor total deve ser preenchida")
            document.getElementById("valorTotalInput").focus()
            return false
        }
        return true;
    }


    saveProcesso(payload) {

        if (this.isValidInputForm()) {
            $still.HTTPClient.post(
                "/api/v1/processo",
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    AppTemplate.showLoading();
                    if (response.status !== 201) {
                        AppTemplate.hideLoading();
                        if (response.message) {
                            AppTemplate.toast({ status: 'Erro', message: response.message })
                        } else {
                            AppTemplate.toast({ status: 'Erro', message: JSON.stringify(response.errors) })
                        }
                    } else {
                        AppTemplate.hideLoading();
                        AppTemplate.toast({ status: 'Sucesso', message: 'Proceso salvo com sucesso!' })
                        Router.goto("ProcessoDetalhes", {
                            data: response.data.id,
                        });
                    }
                })
                .catch((err) => {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'Erro', message: err })
                });
        }
    }


    updateProcesso(payload) {

        if (this.isValidInputForm()) {
            $still.HTTPClient.put(
                `/api/v1/processo/${this.id.value}`,
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    AppTemplate.hideLoading();
                    if (response.status !== 200) {
                        AppTemplate.toast({ status: 'Erro', message: JSON.stringify(response.errors) })
                    } else {
                        AppTemplate.toast({ status: 'Sucesso', message: 'Alterações salvas com sucesso' })
                        Router.goto("ProcessoDetalhes", {
                            data: response.data.data[0].id,
                        });
                    }
                })
                .catch((err) => {
                    AppTemplate.hideLoading();
                    AppTemplate.toast({ status: 'Erro', message: err })
                });
        }
    }

    isValidInputForm() {
        return true;
    }

    getListColaboradores() {
        $still.HTTPClient.get("/api/v1/colaborador/").then(
            (r) => {
                if (r.data) {
                    let colaboradorData = [];
                    for (let colaborador of r.data) {
                        colaboradorData.push({
                            id: colaborador.id,
                            descricao: `${colaborador.description} - ${colaborador.nome_completo}`,
                        });
                    }
                    this.listColaboradores = colaboradorData;
                }
            }
        );
    }

    getListClientes() {
        $still.HTTPClient.get("/api/v1/cliente/").then((r) => {
            if (r.data) {
                let clienteData = [];

                for (let cliente of r.data) {
                    clienteData.push({
                        id: cliente.id,
                        descricao: `${cliente.tipo.description} - ${cliente.denominacao}`,
                    });
                }
                this.listClientes = clienteData;
            }
        });
    }

    async stAfterInit() {
        const idP = Router.data("ProcessoForm");
        await this.getListColaboradores();
        await this.getListClientes();

        if (idP) {
            this.id = idP;
            this.getProcessoById(idP)
        }
    }

    getProcessoById(id) {

        $still.HTTPClient.get(
            `/api/v1/processo/${id}`
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

        this.id = data.id;
        this.estado = data.estado;
        this.referencia = data.ref;
        this.assunto = data.assunto;
        this.area = data.area;
        this.fase = data.fase;

        this.contraParte = data.contra_parte;
        this.dataRegisto = data.data_registo;
        this.dataSuspensao = data.data_suspensao;
        this.dataEncerramento = data.data_encerramento;
        this.metodologia = data.metodologia;
        this.estrategia = data.estrategia;
        this.factos = data.factos;
        this.objectivos = data.objectivos;
        this.dadosImportantes = data.dados_importantes;

        this.createdAt = data.created_at;
        this.updatedAt = data.updated_at;

        this.instituicao = data.instituicao;
        this.modo_facturacao = data.modo_facturacao;
        this.cliente = data.cliente;
        this.tipoCliente = data.tipo_cliente;
        this.gestor = data.gestor;

        this.horasMes = data.horas_mes;
        this.valorTotal = data.valor_total;
        this.dataEmissaoFactura = data.data_emissao_factura;

        setTimeout(() => {

            if (this.dataRegisto.value)
                document.getElementById('dataRegistoInput').value = this.dataRegisto.value.substr(0, 10)

            if (this.dataSuspensao.value)
                document.getElementById('dataSuspensaoInput').value = this.dataSuspensao.value.substr(0, 10)

            if (this.dataEncerramento.value)
                document.getElementById('dataEncerramentoInput').value = this.dataEncerramento.value.substr(0, 10)

            if (this.dataEmissaoFactura.value)
                document.getElementById('dataEmissaoFacturaInput').value = this.dataEmissaoFactura.value

            if (this.horasMes.value)
                document.getElementById('horasMesInput').value = this.horasMes.value

            if (this.valorTotal.value)
                document.getElementById('valorTotalInput').value = this.valorTotal.value


            this.modoFacturacaoId = data.modo_facturacao_id;
            this.instituicaoId = data.instituicao_id;
            this.statusId = data.status_id;
            this.gestorId = data.gestor_id;
            this.clienteId = data.cliente_id;

            this.checkModoFacturacao(this.modoFacturacaoId.value)

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
        let value = evt.target.value;
        this.modoFacturacaoId = value;
        this.checkModoFacturacao(value)
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

    updateDataEmissaoFactura(evt) {
        this.dataEmissaoFactura = document.getElementById("dataEmissaoFacturaInput").value
    }

    checkModoFacturacao(value) {

        console.log("checkModoFacturacao fn ", value)

        switch (value) {
            case '1':
                document.getElementById("horasMesInput").disabled = false;
                document.getElementById("valorTotalInput").disabled = true;
                document.getElementById("valorTotalInput").value = "";
                this.valorTotal = ""
                break;
            case '2':
                document.getElementById("horasMesInput").disabled = true;
                document.getElementById("horasMesInput").value = "";
                this.horasMes = ""
                document.getElementById("valorTotalInput").disabled = false;
                break;
            case '3':
                document.getElementById("horasMesInput").disabled = true;
                document.getElementById("horasMesInput").value = "";
                this.horasMes = ""
                document.getElementById("valorTotalInput").disabled = false;
                break;
            default:
                document.getElementById("horasMesInput").disabled = true;
                document.getElementById("valorTotalInput").disabled = true;
        }

    }

}
