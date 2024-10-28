class ColaboradorDashboard extends ViewComponent {
  htmlRefId = "clientDataTable";
  dataSource;
  /** @type { TabulatorComponent } */
  dataTable = Proxy;
  dataTableLabels = Prop(
    JSON.stringify([
      {
        hozAlign: "center",
        editRow: true,
        icon: "<i class='far fa-calendar-alt'></i>",
        width: 20,
      },
      {
        hozAlign: "center",
        deleteRow: true,
        icon: "<i class='fas fa-file-alt'></i>",
        width: 20,
      },
      { title: "Estado", field: "estado", sorter: "string", width: 200 },
      { title: "Referência", field: "ref", sorter: "string" },
      { title: "Assunto", field: "assunto", sorter: "string" },
      { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
      { title: "Cliente", field: "cliente", sorter: "string" },
      { title: "Data Cadastro", field: "data_registo", sorter: "string" },
    ])
  );

  /** @type { TUICalendarComponent } */
  calendarProxy = Proxy;

  template = `
    <section class="content">
    <br />
    
    <div class="row">
    <div class="col-lg-3 col-sm-6">
        <div class="info-box7 l-bg-green order-info-box7">
            <div class="info-box7-block">
                <h4 class="m-b-20">Orders Received</h4>
                <h2 class="text-right"><i class="fas fa-cart-plus pull-left"></i><span>358</span></h2>
                <p class="m-b-0">18% Higher Then Last Month</p>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-sm-6">
        <div class="info-box7 l-bg-purple order-info-box7">
            <div class="info-box7-block">
                <h4 class="m-b-20">Completed Orders</h4>
                <h2 class="text-right"><i class="fas fa-business-time pull-left"></i><span>865</span></h2>
                <p class="m-b-0">21% Higher Then Last Month</p>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-sm-6">
        <div class="info-box7 l-bg-orange order-info-box7">
            <div class="info-box7-block">
                <h4 class="m-b-20">New Orders</h4>
                <h2 class="text-right"><i class="fas fa-chart-line pull-left"></i><span>128</span></h2>
                <p class="m-b-0">37% Higher Then Last Month</p>
            </div>
        </div>
    </div>

    <div class="col-lg-3 col-sm-6">
        <div class="info-box7 l-bg-cyan order-info-box7">
            <div class="info-box7-block">
                <h4 class="m-b-20">Total Earning</h4>
                <h2 class="text-right"><i class="fas fa-dollar-sign pull-left"></i><span>$25698</span></h2>
                <p class="m-b-0">10% Higher Then Last Month</p>
            </div>
        </div>
    </div>
</div>




<div class="row clearfix">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div class="card">
                        <div class="header">
                            <h2>
                                <strong>Teus </strong>Processos</h2>
                            <ul class="header-dropdown m-r--5">
                                <li class="dropdown">
                                    <a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li>
                                            <a href="#" onclick="return false;">Action</a>
                                        </li>
                                        <li>
                                            <a href="#" onclick="return false;">Another action</a>
                                        </li>
                                        <li>
                                            <a href="#" onclick="return false;">Something else here</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="body">

                        
                <st-element
                  component="TabulatorComponent"
                   proxy="dataTable"
                  tableHeader="parent.dataTableLabels"
                  (onEditColumn)="getClientDetails(fieldName, data)"
                  (onDeleteRow)="deleteRow(fieldName, data)"
                  (onCellClick)="cellClick(row, col, data)"
                >
    </st-element>


                           
                        </div>
                    </div>
                </div>
               
            </div>

       
      
    </section>
    `;

  constructor() {
    super();
    this.setup({});
  }

  async onRender() {
    /**
     * Isso quer dizer que o import do JQuery foi feito no index principal
     * ou no ficheiro de rotas em eagerImport
     */
    this.stRunOnFirstLoad(() => {
      $(".js-basic-example").DataTable({
        responsive: true,
      });
    });

    /** For Test purpose only */
    await this.stLazyExecution(async () => {});
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  stAfterInit(val) {
    let colaboradorId = 2;

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/processo_colaborador/${colaboradorId}`
    ).then((r) => {
      if (r.data) {
        console.log(r);
        // this.dataSource(r.data);
        this.dataTable.dataSource = r.data;
        this.hideLoading();
      }
    });
  }

  deleteRow(_, record) {
    Router.goto("ProcessoDetalhes", {
      data: record.id,
    });
  }

  editRow(_, record) {
    console.log(`ROW WILL BE EDITED: `);
    Router.goto("ProcessoTimeSheet", {
      data: record.id,
    });
  }

  cellClick(row, col, _) {
    console.log(`Cliecked on: `, {
      row,
      col,
      _,
    });
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  /** For Test purpose only */
  /** @type { StEvent } */
  anyState = "This is the state value";
  runLocalFunc() {
    alert("Alert from the components itself" + this.anyState);
  }
}
