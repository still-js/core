class ClientsGrid extends ViewComponent {
  htmlRefId = "clientDataTable";
  dataSource;
  /** @type { TabulatorComponent } */
  dataTable = Proxy;
  dataTableLabels = Prop(
    JSON.stringify([
      {
        hozAlign: "center",
        editRow: true,
        icon: "<i class='fa fa-pen'></i>",
        width: 20
      },
      {
        hozAlign: "center",
        deleteRow: true,
        icon: "<i class='fa fa-trash'></i>",
        width: 20
      },
      { title: "Tipo Cliente", field: "tipo", sorter: "string", width: 200 },
      { title: "Nome", field: "denominacao", sorter: "string" },
      { title: "NIF", field: "nif", sorter: "string" },
      { title: "Endereco", field: "endereco", sorter: "string" },
      { title: "Telefone", field: "pessoa_contacto", sorter: "string" },
      {
        title: "Telefone Cobrança",
        field: "contacto_cobranca",
        sorter: "string"
      },
      { title: "E-mail", field: "e_mail", sorter: "string" },
      { title: "Data Cadastro", field: "created_at", sorter: "string" }
    ])
  );

    htmlRefId = 'clientDataTable';
    dataSource;
    /** 
     * @Proxy
     * @type { TabulatorComponent } 
     */
    dataTable;

    /** @Prop */
    dataTableLabels = [
        { hozAlign: "center", editRow: true, icon: "<i class='fa fa-pen'></i>", width: 20 },
        { hozAlign: "center", deleteRow: true, icon: "<i class='fa fa-trash'></i>", width: 20 },
        { title: "Tipo Cliente", field: "tipo_id", sorter: "string", width: 200 },
        { title: "Nome", field: "denominacao", sorter: "string" },
        { title: "NIF", field: "nif", sorter: "string" },
        { title: "Endereco", field: "endereco", sorter: "string" },
        { title: "Telefone", field: "pessoa_contacto", sorter: "string" },
        { title: "Telefone Cobrança", field: "contacto_cobranca", sorter: "string" }
    ];

    /** @Proxy @type { TUICalendarComponent } */
    calendarProxy;

    /** 
     * @Proxy 
     * @type { TBDragableGrid } */
    dragableTBProxy;

    /** @Prop */
    dragableData = [
        { name: "Atendimento no Escritório", custo: "AKZ 0.0" },
        { name: "Elaboração de contracto", custo: "AKZ 0.0" },
        { name: "Rectificação do processo", custo: "AKZ 0.0" }
    ];

    /** @Prop */
    dragableFields = [
        { title: "Name", field: "name" },
        { title: "Custo", field: "custo" }
    ];

    /** @Prop */
    dragableDestFields = [
        { title: "Name", field: "name" },
        { title: "Custo", field: "custo", editor: "parent.editPricingValue()" }
    ];

    template = `
    <section class="content">
        <br>
        <div class="block-header">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        
                    <st-element
                        component="CreateButton"
                        (onClick)="gotoCreateCliente()"
                    >

                    <ul class="breadcrumb breadcrumb-style" style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 5px;"
                    >
                        <li class="breadcrumb-item 	bcrumb-1">
                            <a href="/">
                                <i class="material-icons">home</i>
                                Home
                            </a>
                        </li>
                        <li class="breadcrumb-item bcrumb-1 active">Cliente</li>
                        <li class="breadcrumb-item active">Lista de Clientes</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="header">
            <h2><strong>Cliente </strong>Cadastrados</h2>
            </div>
            <div class="body table-responsive">
                <st-element
                    component="TabulatorComponent"
                    proxy="dataTable"
                    tableHeader="parent.dataTableLabels"
                     tableHeight="auto"
                    (onEditColumn)="getClientDetails(fieldName, data)"
                    (onDeleteRow)="deleteRow(fieldName, data)"
                    (onCellClick)="goToClienteDetalhes(row, col, data)"
                    >
                </st-element>
            </div>
        </div>

    </section>
    `;

  constructor() {
    super();
    AppTemplate.showLoading();
    this.setup({});
  }

  goToClienteDetalhes(row, col, data) {
    console.log(data.id);

    Router.goto("ClienteDetalhes", {
      data: data.id
    });
  }

  deleteRow(_, record) {
    alert(JSON.stringify(record));
  }

  editRow(_, record) {
    console.log(`ROW WILL BE EDITED: `, record);
  }

  cellClick(row, col, _) {
    console.log(`Cliecked on: `, {
      row,
      col,
      _
    });
  }

  async onRender() {
    /** For Test purpose only */
    await this.stLazyExecution(async () => {
      /** @type { ClientForm } */
      /* 
            const clientFormView = $still.view.get('ClientForm');
            clientFormView.onChange((newState) => {
                console.log(`Client grid detectou mudança no client form: `, newState);
            }); 
            */
    });
  }

  stAfterInit(val) {
    $still.HTTPClient.get("http://localhost:3000/api/v1/cliente/").then((r) => {
      try {
        let dataResponse = r.data;
        if (dataResponse) {
          let clieteDTO = dataResponse.map((item) => {
            return {
              id: item.id,
              denominacao: item.denominacao,
              nif: item.nif,
              endereco: item.endereco,
              pessoa_contacto: item.pessoa_contacto,
              contacto_cobranca: item.contacto_cobranca,
              tipo: item.tipo.description,
              tipo_id: item.tipo_id,
              e_mail: item.e_mail,
              created_at: new Date(item.created_at)
                .toLocaleString("PT")
                .substring(0, 10)
            };
          });
          this.dataSource = clieteDTO;
          this.dataTable.dataSource = clieteDTO;
        }
      } catch (e) {
        console.log("erro no processo DTO", e);
      } finally {
        AppTemplate.hideLoading();
      }
    });
  }

  /** For Test purpose only */
  /** @type { StEvent } */
  anyState = "This is the state value";
  runLocalFunc() {
    this.dataTable.dataSource = [{ denominacao: "Novo valor", tipo_id: 190 }];
  }

  getClientDetails(f, row) {
    Router.goto("ClientForm", { data: row });
  }

  editPricingValue(evtType, value, rowData) {
    if (evtType == "onFocus") {
      const actualValue = String(value)
        .slice(4) //Remove AKZ Angola currency code and the space after it
        .replace(".", "", "gi") //Remove the period/dot in the thousands separator
        .split(","); //Separate the integer value from the cents
      const cents = parseFloat(actualValue[1]);
      return parseFloat(actualValue[0]) + `${cents > 0 ? "," + cents : ""}`;
    }

    if (evtType == "onLoseFocus") {
      const inputValue = String(value).split(",");
      const amount = inputValue[0];
      const cents = inputValue[1] ? "," + inputValue[1] : ",00";

      const formatter = new Intl.NumberFormat("ao-AO", {
        style: "currency",
        currency: "AKZ",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      });

      return formatter.format(amount) + `${cents}`;
    }
  }

  gotoCreateCliente() {
    Router.goto("ClientForm");
  }
}
