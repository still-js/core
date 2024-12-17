class Despesas extends ViewComponent {

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

            <form id="client_wizard_with_validation" (formRef)="filtroForm" onsubmit="javascript: return false;">
                <!-- <h3>Da</h3> -->
                <fieldset>
                    <h2 class="card-inside-title">Filtrar por cliente e/ou processo</h2>
                    <div class="row clearfix">

                        <div class="col-md-3">

                            <st-element
                                label="Novo registo"
                                iconName="add_circle"
                                component="CreateButton"
                                (onClick)="showHideCreateForm()"
                            >

                        </div>

                        <div class="col-md-4">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Cliente
                                    </span>
                                    <select
                                        (required)="true"
                                        (value)="nomeClienteFiltro"
                                        (change)="setNomeClienteFiltro($event)" 
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
                                    <select Dados Pessoais
                                        (required)="true"
                                        (value)="numProcessoFiltro"
                                        (change)="setNumProcessoFiltro($event)" 
                                        (forEach)="listProcesso">
                                        <option each="item" value="">Selecione uma opção</option>
                                        <option each="item" value="{item.id}">{item.numero}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="input-group">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        &nbsp;
                                    </span>
                                    <st-element
                                        label="Pesquisar"
                                        iconName="search"
                                        color="bg-blue"
                                        component="CreateButton"
                                        (onClick)="gotoCreateCliente()"
                                    >
                                </div>
                            </div>
                        </div>

                    </div>
                </fieldset>
            </form>

            <form  
                (showIf)="self.createFormVisible"
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
                                        <option each="item" value="{item.id}">{item.numero}</option>
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
                                    <input type="text" (value)="valorDespesa">
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

        <st-element 
            component="TabulatorComponent"
            tableHeader="parent.dataTableLabels"
            proxy="despesasTableProxy"
        >

    </section>
    `;

    constructor() {
        super();
        AppTemplate.showLoading();
    }

    async stAfterInit() {
        this.clientList = await this.processoService.getListClientes();
        this.listProcesso = await this.processoService.getProcessos();
        await this.getDespesa();
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
    setNomeCliente(evt) {
        this.nomeCliente = evt.target.value;
        this.nomeClienteText = evt.target.options[evt.target.selectedIndex].text;
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
            this.despesasTableProxy.insertRow({
                numProcesso: this.numProcessoText,
                nomeCliente: this.nomeClienteText,
                valor: payload.valor,
                tipo: this.tipoMovimentosMap[payload.tipoMovimento],
                dataMovimento: payload.dataMovimento
            });
        }).catch((err) => {
            AppTemplate.hideLoading();
            console.log(`Erro ao cadastrar despesa: `, err);
        });

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

}