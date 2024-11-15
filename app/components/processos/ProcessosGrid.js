class ProcessosGrid extends ViewComponent {

  roles = Prop()
  canCreateProcess = Prop(true);

  
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
      { title:"Progresso", field:"progress", sorter:"30", hozAlign:"left", formatter:"progress"},
      { title: "Referência", field: "ref", sorter: "string" },
      { title: "Assunto", field: "assunto", sorter: "string" },
      { title: "Área", field: "area", sorter: "string" },
      { title: "Instituição", field: "instituicao", sorter: "string" },
      { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
      { title: "Cliente", field: "cliente", sorter: "string" },
      { title: "Gestor", field: "gestor", sorter: "string" },
      { title: "Data Cadastro", field: "data_registo", sorter: "string" },
      { title: "Data Suspensão", field: "data_suspensao", sorter: "string" },
      { title: "Data Encerramento", field: "data_encerramento", sorter: "string" },
    ])
  );


  template = `
  <section class="content">

  <br />
  <div class="block-header">
      <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div>
          <span 
          (renderIf)="self.canCreateProcess"
          >
          <button (click)="gotoView('ProcessoForm')" type="button" class="btn btn-primary m-t-15 waves-effect">
          <span style="display: flex;
                       gap: 10px;
                       align-items: center;"
          >
          <i class="material-icons">create_new_folder</i>
            Novo
          </span>
          </button>
      </span>   

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
          <div class="card">
              <div class="header">
                  <h2><strong>Lista </strong>Geral dos Processos</h2>
                  <p style="font-size: 12px">Encontre aqui, todos os processos</p>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
       
              <div class="body">
                  <div class="table-responsive">
                      <st-element component="TabulatorComponent" 
                          proxy="dataTableListProcessos"
                          tableHeader="parent.dataTableLabels" 
                          tableHeight="auto"
                          (onEditColumn)="editProcesso(fieldName, data)"
                          (onDeleteRow)="detalhesProcesso(fieldName, data)" (onCellClick)="cellClick(row, col, data)">
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

  getRolesByLoggedUser() {
    try {
      const userLogged = JSON.parse(localStorage.getItem("_user"));
      this.roles = userLogged.auth.roles 
    }catch(e){
      console.log(e)
    }      
  }

  
  onRender() {
    this.getRolesByLoggedUser()
    this.canCreateProcess = this.roles.includes('CAN_CREATE_PROCESS')
    console.log("on render canCreateProcess here ... ", this.canCreateProcess);
  }

  stAfterInit(val) {

    this.getRolesByLoggedUser()
 
    $still.HTTPClient.get("http://localhost:3000/api/v1/processo/").then(
      (r) => {
        if (r.data) {
          this.dataTableListProcessos.dataSource = this.transformDataTable(r.data);
        }
      }
    );
  }


  transformDataTable(data) {

    function calculateDays(dataEncerramento) {
      if(dataEncerramento) {
      const inicio = new Date();
      const fim = new Date(dataEncerramento);
      const diferencaEmMilissegundos = fim - inicio;
      const milissegundosPorDia = 1000 * 60 * 60 * 24;
      const diferencaEmDias = diferencaEmMilissegundos / milissegundosPorDia;
      return Math.floor(diferencaEmDias) + 1;
      }else {
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
        data_encerramento:  item.data_encerramento ? new Date(item.data_encerramento).toLocaleDateString("PT") :  item.data_encerramento,
        progress: 100 - calculateDays(item.data_encerramento)
      }
    })
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
