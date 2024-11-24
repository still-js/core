class ColaboradorDashboard extends ViewComponent {
  htmlRefId = "clientDataTable";
  dataSource;

  /** @Proxy @type { TabulatorComponent } */
  dataTable;

  /** @Proxy @type { TUICalendarComponent } */
  agendaColaboradorProxy;

  /** @Inject @type { ProcessoService } */
  processoService;

  /** @Prop */
  dataTableLabels = [
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
    { title: "Progresso", field: "progress", sorter: "30", hozAlign: "left", formatter: "progress" },
    { title: "Referência", field: "ref", sorter: "string" },
    { title: "Assunto", field: "assunto", sorter: "string" },
    { title: "Área", field: "area", sorter: "string" },
    { title: "Instituição", field: "instituicao", sorter: "string" },
    { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
    { title: "Cliente", field: "cliente", sorter: "string" },
    { title: "Gestor", field: "gestor", sorter: "string" },
    { title: "Data Cadastro", field: "data_registo", sorter: "string" },
  ];

  template = `
  <section class="content">
  <br />

  
  <div class="col-xs-12">
    <div class="card">
      <div class="body">
          
          <ul class="nav nav-tabs tab-nav-right" role="tablist">
              <li role="presentation">
                  <a href="#dashoboardMeusProcessos" data-toggle="tab" class="active show">Meus Processos</a>
              </li>
              <li role="presentation">
                  <a href="#dashoboardMinhaAgenda" data-toggle="tab">Minha Agenda</a>
              </li>
          </ul>

          <div class="tab-content colaborador-dashboard">

            <div role="tabpanel" class="tab-pane fade in active show" id="dashoboardMeusProcessos">

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
                    <div class="body table-responsive">
            
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

            </div>

            <div role="tabpanel" class="tab-pane fade in active" id="dashoboardMinhaAgenda">

              <div 
                   class="dashoboardMinhaAgenda"
                   style="background: #fff;
                          padding: 15px;
                          margin-left: 10px;
                          display: flex;
                          flex-direction: column;
                          min-width: 750px;
                          width: 1050px;
                          color: #555;
                          font-size: 14px;
                          border: 1px solid #e1e0e0;
              ">  
                <st-element
                  component="TUICalendarComponent"
                  milestoneTitle="Objectivo"
                  proxy="agendaColaboradorProxy"
                  >
                </st-element>
              </div>

            </div>

          </div>

      </div>
    </div>
  <div>

  <style>

    #dashoboardMinhaAgenda, #dashoboardMeusProcessos {
      background: none !important;
    }

    #dashoboardMinhaAgenda  .toastui-calendar-section-button {
      display: none;
    }

    #dashoboardMinhaAgenda  .toastui-calendar-section-detail {
      display: none;
    }

    .dashoboardMinhaAgenda .toastui-calendar-popup-container {
      top: 50% !important;
      left: 25% !important;
    }

  </style>

</section>
    `;

  constructor() {
    super();
    this.setup({});
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  transformDataTable(data) {

    function calculateDays(dataEncerramento) {
      if (dataEncerramento) {
        const inicio = new Date();
        const fim = new Date(dataEncerramento);
        const diferencaEmMilissegundos = fim - inicio;
        const milissegundosPorDia = 1000 * 60 * 60 * 24;
        const diferencaEmDias = diferencaEmMilissegundos / milissegundosPorDia;
        return Math.floor(diferencaEmDias) + 1;
      } else {
        return 100
      }
    }

    return data.map(item => {
      return {
        id: item.id,
        ref: item.ref,
        estado: item.estado,
        assunto: item.assunto,
        area: item.area,
        fase: item.fase,
        instituicao: item.instituicao,
        modo_facturacao: item.modo_facturacao,
        gestor: item.gestor,
        cliente: item.cliente,
        contra_parte: item.contra_parte,
        data_registo: item.data_registo ? new Date(item.data_registo).toLocaleDateString("PT") : item.data_registo,
        data_suspensao: item.data_suspensao ? new Date(item.data_suspensao).toLocaleDateString("PT") : item.data_suspensao,
        colaborador_id_suspendeu: item.colaborador_id_suspendeu,
        data_encerramento: item.data_encerramento ? new Date(item.data_encerramento).toLocaleDateString("PT") : item.data_encerramento,
        progress: 100 - calculateDays(item.data_encerramento)
      }
    })
  }

  async stAfterInit(val) {

    const userLogged = JSON.parse(localStorage.getItem('_user'));
    const service = this.processoService;

    if (userLogged) {

      try {

        AppTemplate.showLoading();
        const processosByColaborador = await service.getProcessoByColaborador(userLogged.id);
        this.dataTable.dataSource = this.transformDataTable(processosByColaborador);
        this.populateCards(processosByColaborador);
        const tasksData = await service.getTarefaByColaboradorId();
        this.pushDataToCalendar(tasksData);
        AppTemplate.hideLoading();

      } catch (error) {
        AppTemplate.hideLoading();
      }


    }
  }

  pushDataToCalendar(tasksData) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));
    let userId = userLogged.id;
    const agendaProxy = this.agendaColaboradorProxy;

    const tasks = tasksData.map((item) => {

      const start = new Date(item.data_para_realizacao);
      start.setHours(new Date().getHours());
      const end = new Date(item.data_para_realizacao);
      end.setHours(new Date().getHours() + 2);

      return {
        id: item.id,
        calendarId: 'entrevista',
        title: item.descricao,
        start, end
      };

    });


    this.agendaColaboradorProxy.on('load', () => {
      this.agendaColaboradorProxy.addNewEvents(tasks);
    });

  }

  populateCards(data) {
    let rascunho = data.filter((item) => item.estado === 'Rascunho')
    this._('processosRascunho', rascunho.length)

    let proposta = data.filter((item) => item.estado === 'Proposta')
    this._('processosProposta', proposta.length)

    let suspenso = data.filter((item) => item.estado === 'Suspenso')
    this._('processosSuspenso', suspenso.length)

    let enderrado = data.filter((item) => item.estado === 'Encerrado')
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

  detalheProcesso(_, _col, record) {
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
