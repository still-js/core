class ProcessosGrid extends ViewComponent {
  
  /** @type { TabulatorComponent } */
  dataTableListProcessos = Proxy;
  dataTableLabels = Prop(
    JSON.stringify([
      {
        hozAlign: "center",
        editRow: true,
        icon: "<i class='fa fa-pen'></i>",
        width: 20,
      },
      {
        hozAlign: "center",
        deleteRow: true,
        icon: "<i class='fas fa-file-alt'></i>",
        width: 20,
      },
      { title: "Estado", field: "estado", sorter: "string", width: 100 },
      { title: "Referência", field: "ref", sorter: "string" },
      { title: "Assunto", field: "assunto", sorter: "string" },
      { title: "Área", field: "area", sorter: "string" },
      { title: "Instituição", field: "instituicao", sorter: "string" },
      { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
      { title: "Cliente", field: "cliente", sorter: "string" },
      { title: "Gestor", field: "gestor", sorter: "string" },
      { title: "Data Cadastro", field: "data_registo", sorter: "string" },
    ])
  );


  template = `
    <section class="content">

    <br/>
    <div class="block-header">
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <ul class="breadcrumb breadcrumb-style" style="
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;">
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
</div>

        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div>
                    <button (click)="gotoView('ProcessoForm')" type="button" class="btn btn-primary m-t-15 waves-effect">
                    <span style="display: flex;
                                 gap: 10px;
                                 align-items: center;"
                    >
                    <i class="material-icons">create_new_folder</i>
                      Novo
                    </span>
                    </button>
                </div>
                <div class="card">
                <div class="header">
                <h2><strong>Lists </strong>Geral dos Processos</h2>
                <p style="font-size: 12px">Encontre aqui, todos os processos</p>
              </div>
                    <div class="body">
                        <div class="table-responsive">
                        <st-element
                        component="TabulatorComponent"
                        proxy="dataTableListProcessos"
                        tableHeader="parent.dataTableLabels"
                        tableHeight="510px"
                        (onEditColumn)="editProcesso(fieldName, data)"
                        (onDeleteRow)="detalhesProcesso(fieldName, data)"
                        (onCellClick)="cellClick(row, col, data)"
                        
                      >
                      </st-element>
                        </div>
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

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  stAfterInit(val) {
    $still.HTTPClient.get("http://localhost:3000/api/v1/processo/").then(
      (r) => {
        if (r.data) {
          this.dataTableListProcessos.dataSource = r.data;
        }
      }
    );
  }

  detalhesProcesso(_, record) {
    Router.goto("ProcessoDetalhes", {
      data: record.id,
    });
  }

  editProcesso(_, record) {
    Router.goto("ProcessoForm", {
      data: record.id,
    });
  }

  cellClick(row, col, data) {
    Router.goto("ProcessoDetalhes", {
      data: data.id,
    });
  }
}
