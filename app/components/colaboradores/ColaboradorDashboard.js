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
  <br />

  <div class="row">
    <div class="col-lg-3 col-sm-6">
      <div class="info-box7 l-bg-green order-info-box7">
        <div class="info-box7-block">
          <h4 class="m-b-20">Processos Rascunho</h4>
          <h2 class="text-right">
            <i class="fas fa-folder-open pull-left"></i><span id="processosRascunho">0</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-sm-6">
      <div class="info-box7 l-bg-purple order-info-box7">
        <div class="info-box7-block">
          <h4 class="m-b-20">Processos Proposta</h4>
          <h2 class="text-right">
            <i class="far fa-folder-open pull-left"></i><span id="processosProposta">0</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-sm-6">
      <div class="info-box7 l-bg-orange order-info-box7">
        <div class="info-box7-block">
          <h4 class="m-b-20">Processos Suspenso</h4>
          <h2 class="text-right">
            <i class="far fa-folder pull-left"></i><span id="processosSuspenso">0</span>
          </h2>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-sm-6">
      <div class="info-box7 l-bg-cyan order-info-box7">
        <div class="info-box7-block">
          <h4 class="m-b-20">Processos Encerrado</h4>
          <h2 class="text-right">
            <i class="fas fa-folder pull-left"></i><span id="processosEncerrado">0</span>
          </h2>
        </div>
      </div>
    </div>
  </div>

  <div class="row clearfix">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <div class="card">
        <div class="header">
          <h2><strong>Teus </strong>Processos</h2>
          <p style="font-size: 12px">Encontre aqui, os processos que foram partilhados consigo</p>
        </div>
        <div class="body">
          <st-element
            component="TabulatorComponent"
            proxy="dataTable"
            tableHeader="parent.dataTableLabels"
            (onEditColumn)="getTimeSheetProcesso(fieldName, data)"
            (onDeleteRow)="getDetailsProcesso(fieldName, data)"
            (onCellClick)="detalheProcesso(row, col, data)"
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

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  stAfterInit(val) {
    const userLogged = JSON.parse(localStorage.getItem('_user'))

    if(userLogged) {
      $still.HTTPClient.get(
        `http://localhost:3000/api/v1/processo_colaborador/${userLogged.id}`
      ).then((r) => {
      if (r.data) {
          this.dataTable.dataSource = r.data;
          this.populateCards(r.data);
      } else {
        this.hideLoading();
      }
    });
    }
  }

  populateCards(data) {
      let rascunho =  data.filter((item) => item.estado === 'Rascunho')
      this._('processosRascunho', rascunho.length)

      let proposta =  data.filter((item) => item.estado === 'Proposta')
      this._('processosProposta', proposta.length)

      let suspenso =  data.filter((item) => item.estado === 'Suspenso')
      this._('processosSuspenso', suspenso.length)

      let enderrado =  data.filter((item) => item.estado === 'Encerrado')
      this._('processosEncerrado', enderrado.length)
  }

  _(id, valor) {
    document.getElementById(id).innerHTML = valor
  }

  getDetailsProcesso(_, record) {
    Router.goto("ProcessoDetalhes", {
      data: record.id,
    });
  }

  detalheProcesso(_,_col, record) {
    Router.goto("ProcessoDetalhes", {
      data: record.id,
    });
  }

  getTimeSheetProcesso(_, record) {
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

}
