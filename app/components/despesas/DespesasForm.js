class DespesasForm extends ViewComponent {

    clientList;
    listProcesso;

    /** @Prop */
    dataTableLabels = [
        {
            hozAlign: "center",
            deleteRow: true,
            icon: "<i class='fas fa-file-alt'></i>",
            width: 20,
        },
        { title: "N. Processo", field: "numProcesso", hozAlign: "left" },
        { title: "Nome cliente", field: "nomeCliente", sorter: "string" },
        { title: "Valor", field: "valor", sorter: "string" },
        { title: "Tipo Movimento", field: "tipo", sorter: "string" },
        { title: "Data Movimento", field: "dataMovimento", sorter: "string" }
    ];

    /** @type { StForm } */
    filtroForm;

    /** @type { StForm } */
    despesaForm;

    /** @Prop */
    createFormVisible = false;

    /** @Proxy @type { TabulatorComponent } */
    despesasTableProxy;

    tipoMovimento;
    valorDespesa;
    numeroProcesso;
    dataDespesa;

    nomeCliente;

    nomeClienteFiltro;
    numProcessoFiltro;

    tipoMovimentos = [
        { id: 1, name: 'Débito' },
        { id: 2, name: 'Crédito' },
    ];

    /** @Prop */
    tipoMovimentosMap = { 1: 'Débito', 2: 'Crédito' };

    /** @Inject @type { ProcessoService } */
    processoService;

    template = `
    <section class="content">
        <div class="body">

            <form  
                (formRef)="despesaForm" 
                onsubmit="javascript: return false;">
                <!-- <h3>Da</h3> -->
                <fieldset>
                    <h2 class="card-inside-title">Cadastro de nova despesa</h2>
                    <div class="row clearfix">

                        <div class="col-md-3">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Cliente
                                    </span>
                                    <select
                                        (required)="true"
                                        (value)="nomeCliente"
                                        (change)="setNomeCliente($event)" 
                                        (forEach)="clientList">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">folder</i> Processo
                                    </span>
                                    <select
                                        (required)="true"
                                        (value)="numeroProcesso"
                                        (change)="setNumeroProcesso($event)"
                                        (forEach)="listProcesso">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.ref}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">vertical_align_center</i> Tipo Movimento
                                    </span>
                                    <select
                                        (required)="true"
                                        (value)="tipoMovimento"
                                        (change)="setTipoMovimento($event)"
                                        (forEach)="tipoMovimentos"
                                    >
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.name}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">monetization_on</i> Valor
                                    </span>
                                    <input  (required)="true" type="text" (value)="valorDespesa">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">monetization_on</i> Data
                                    </span>
                                    <input 
                                     (required)="true"
                                        type="date"
                                        id="dataDespesa"
                                        (value)="dataDespesa"
                                        >
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <span class="input-group-addon">&nbsp;</span>
                            <span class="input-group-addon">&nbsp;</span>
                            <st-element
                                label="Salvar"
                                iconName="save"
                                component="CreateButton"
                                (onClick)="saveNewDespesa()"
                            >
                        </div>

                    </div>
                </fieldset>
            </form>

        </div>

    </section>
    `;

    constructor() {
        super();
        AppTemplate.showLoading();
    }

    async stAfterInit() {
        this.clientList = await this.processoService.getListClientes();
        AppTemplate.hideLoading();
    }

    setDataDespesa(evt) {
        this.dataDespesa = evt.target.value;
    }

    setNomeClienteFiltro(evt) {
        this.nomeClienteFiltro = evt.target.value;
    }

    setNumProcessoFiltro(evt) {
        this.numProcessoFiltro = evt.target.value;
    }

    /** @Prop */
    nomeClienteText;
    async setNomeCliente(evt) {
        console.log("teste ", evt.target.value)
        this.nomeCliente = evt.target.value;
        this.nomeClienteText = evt.target.options[evt.target.selectedIndex].text;
        this.listProcesso = await this.processoService.getProcessosByCliente(this.nomeCliente.value);
        console.log(this.nomeCliente)
        console.log(this.listProcesso)
    }

    showHideCreateForm() {
        this.createFormVisible = !this.createFormVisible;
    }

    /** @Prop */
    numProcessoText;
    setNumeroProcesso(evt) {
        this.numeroProcesso = evt.target.value;
        this.numProcessoText = evt.target.options[evt.target.selectedIndex].text;
    }

    setTipoMovimento(evt) {
        this.tipoMovimento = evt.target.value;
    }

    saveNewDespesa() {

        const isValidForm = this.despesaForm.validate();

        if (isValidForm) { 


        const colaboradorId = JSON.parse(localStorage._user).id;

        const payload = {
            colaboradorId,
            dataMovimento: document.getElementById('dataDespesa').value,
            idProcesso: this.numeroProcesso.value,
            tipoMovimento: this.tipoMovimento.value,
            valor: this.valorDespesa.value
        }

        AppTemplate.showLoading();
        $still.HTTPClient.post(
            '/api/v1/processo/despesa',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((r) => {
            AppTemplate.hideLoading();
            if(r.status == 201) {
                AppTemplate.toast({ status: 'Sucesso!', message: 'Despesa, registadas com sucesso!' })

                setTimeout(() => {
                    Router.goto("Despesas");
                },1000)
            }else{
                AppTemplate.toast({ status: 'Erro!', message: r.message })
            }
        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao cadastrar despesa: `, err);
        });



        }else {
                AppTemplate.toast({ status: 'Erro!', message: "Preencha os campos obrigatórios." })
        }




    }

    getDespesa() {

        $still.HTTPClient.get(
            '/api/v1/processo/despesa/all'
        ).then((r) => {
            AppTemplate.hideLoading();

            const dataSource = r.data.map(item => ({
                numProcesso: item.numeroProcesso,
                nomeCliente: item.nomeCliente,
                valor: item.valor,
                tipo: this.tipoMovimentosMap[item.tipoMovimento],
                dataMovimento: item?.dataMovimento?.split('T')[0]
            }));

            this.despesasTableProxy.insertRow(null, dataSource);

        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao buscar despesas: `, err);
        });

    }

    getDespesaFilter() {

        let payload =
        {
            "cliente_id": document.getElementById('clienteId').value == "" ? 0 : document.getElementById('clienteId').value,
            "processo_id": document.getElementById('processoId').value == "" ? 0 : document.getElementById('processoId').value 
        }

        console.log("Payload das despeas ", payload)

        $still.HTTPClient.get(
            `/api/v1/despesas_filtro/${payload.cliente_id}/${payload.processo_id}`,
        ).then((r) => {
            AppTemplate.hideLoading();

            const dataSource = r.data.map(item => ({
                numProcesso: item.numeroProcesso,
                nomeCliente: item.nomeCliente,
                valor: item.valor,
                tipo: this.tipoMovimentosMap[item.tipoMovimento],
                dataMovimento: item?.dataMovimento?.split('T')[0]
            }));

            this.despesasTableProxy.insertRow(null, dataSource);

        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao buscar despesas: `, err);
        });

    }

}