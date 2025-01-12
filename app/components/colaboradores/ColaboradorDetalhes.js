class ColaboradorDetalhes extends ViewComponent {

  id;
  nomeCompleto;
  nomeProfissional;
  inicial;
  funcao;
  tipoColaboradorId;
  dataNascimento;
  taxaHoraria;
  status; 
  tipo; 
  identificacoes;
  contactos;
  custoFinanceiro;
  createdAt;

  listTimesheetFacturas;


  /** @Proxy @type { TabulatorComponent } */
  dataTableListProcessos = Proxy;

  /** @Prop */
  dataTableProcessosLabels = [
    { title: "Estado", field: "estado", sorter: "string", width: 100 },
    { title: "Referência", field: "ref", sorter: "string" },
    { title: "Assunto", field: "assunto", sorter: "string" },
    { title: "Área", field: "area", sorter: "string" },
    { title: "Instituição", field: "instituicao", sorter: "string" },
    { title: "Modo Facturação", field: "modo_facturacao", sorter: "string" },
    { title: "Gestor", field: "gestor", sorter: "string" },
    { title: "Data Cadastro", field: "data_registo", sorter: "string" },
    {
      title: "Data Encerramento",
      field: "data_encerramento",
      sorter: "string"
    }
  ]

  /** @Proxy @type { TabulatorComponent } */
  dataTableListFacturas = Proxy;

  /** @Prop */
  dataTableFacturasLabels = [
    {
      hozAlign: "center",
      editRow: true,
      icon: "<i class='fas fa-list-alt'></i>",
      width: 20,
    },
    {
      hozAlign: "center",
      deleteRow: true,
      icon: "<i class='fas fa-money-check-alt'></i>",
      width: 20,
    },
    { title: "Estado", field: "status", sorter: "string", width: 100 },
    { title: "Referência", field: "ref", sorter: "string" },
    { title: "Assunto", field: "assunto", sorter: "string" },
    { title: "Horas", field: "horas", sorter: "string" },
    { title: "Custo", field: "custo", sorter: "string" },
    { title: "Advogado", field: "colaborador", sorter: "string" },
    { title: "Data Emissão", field: "data_registo_factura", sorter: "string" }
  ]

  /** @Proxy @type { ModalDetalhesFactura } */
  modalDetalhesFacturaProxy;

  /** @Proxy @type { ModalPagamento } */
  modalPagamentoProxy;

  /** @Proxy @type { ModalListPagamentos } */
  modalListPagamentosProxy;

    /** @Prop */
    showModalDetalhesFactura = false;
    /** @Prop */
    showModalPagamento = false;
    /** @Prop */
    showModalListPagamentos = false;
    /** @Prop */
    showModal = false ;

  /**
  * @Inject
  * @type { ColaboradorService }  
  */
  colaboradorService;

  template = `
  <section class="content">
  <form>
    <div class="block-header">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 100px; margin-top: 30px">
          <h1>Detalhes do Colaborador</h1>
          <h3 class="title-grid-component-description">Veja aqui todo envolvimento do colaborador na Plataforma</h3>
        </div>
      </div>
    </div>
  
    <div class="row" style="height: 100vh;">
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <div class="card">
          <div class="body">
            <div id="mail-nav">    
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Nome Completo</div>
                <input id="input_referencia" (value)="nomeCompleto" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Nome Profissional</div>
                <input id="input_referencia" (value)="nomeProfissional" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>

              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Inicial</div>
                <input id="input_referencia" (value)="inicial" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Função</div>
                <input id="input_referencia" (value)="funcao" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>

              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Tipo</div>
                <input id="input_referencia" (value)="tipo" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>

              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Data de Nascimento</div>
                <input id="input_referencia" (value)="dataNascimento" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Taxa Horária</div>
                <input id="input_referencia" (value)="taxaHoraria" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Estado</div>
                <input id="input_referencia" (value)="status" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Data de Cadastro</div>
                <input id="input_referencia" (value)="createdAt" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>

            </div>
          </div>
        </div>
      </div>
  
      <!-- ABAs -->

  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
    <div class="card">
        <div class="body">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs tab-nav-right" role="tablist">
                <li role="presentation">
                  <a href="#contactos_identificacao" data-toggle="tab" class="active show">Contactos e Identificação</a>
                </li>
                <li role="presentation">
                    <a href="#timesheets" data-toggle="tab" class="">TimeSheets</a>
                </li>
            </ul>
            <!-- Tab panes -->

            <div class="tab-content">

                    <!-- Inicio TAB Contactos -->
                    <div role="tabpanel" class="tab-pane fade in active show" id="contactos_identificacao">

                    <div class="product-description">
                          
                            <div class="body">
                               <h5>Contactos</h5>
                                <table>
                                  <thead>
                                      <tr>
                                          <th>Tipo</th>
                                          <th>Descrição</th>
                                      </tr>
                                  </thead>
                                  <tbody (forEach)="contactos">
                                      <tr each="item">
                                          <td class="">{item.type}</td>
                                          <td class="">{item.value}</td>
                                      </tr>
                                  </tbody>
                              </table>
                            </div>

                            <div style="background-color: #fff; height: 20px"></div>


                            <div class="body">
                               <h5>Identificação</h5>
                                <table>
                                  <thead>
                                      <tr>
                                          <th>Tipo</th>
                                          <th>Descrição</th>
                                      </tr>
                                  </thead>
                                  <tbody (forEach)="identificacoes">
                                      <tr each="item">
                                          <td class="">{item.type}</td>
                                          <td class="">{item.description}</td>
                                      </tr>
                                  </tbody>
                              </table>
                            </div>
                            </div>
                                   
                </div>
        <!-- Fim TAB Contactos -->

            
        <!-- Inicio TAB Processos -->
                <div role="tabpanel" class="tab-pane fade in" id="timesheets">

                    <div class="product-description">
                       
                    <div class="body">
                    <h5>Registo dos TimeSheets</h5>
                     <table>
                       <thead>
                           <tr>
                               <th>#</th>
                               <th>Data Início</th>
                               <th>Data FIm</th>
                               <th>Horas</th>
                               <th>Referência</th>
                               <th>Assunto</th>
                               <th>Custo</th>
                               <th>Estado</th>
                               <th>Data de Registro</th>
                           </tr>
                       </thead>
                       <tbody (forEach)="listTimesheetFacturas">
                           <tr each="item">
                               <td class="">{item.id}</td>
                               <td class="">{item.dataInicio}</td>
                               <td class="">{item.dataFim}</td>
                               <td class="">{item.horas}</td>
                               <td class="">{item.ref}</td>
                               <td class="">{item.assunto}</td>
                               <td class="">{item.custo}</td>
                               <td class="">{item.estado}</td>
                               <td class="">{item.dataRegisto}</td>
                           </tr>
                       </tbody>
                   </table>
                 </div>
                                   
                        
                    </div>
                </div>
        <!-- Fim TAB Processos -->


   </form>


   <div class="still-popup-curtain" (showIf)="self.showModal"></div>

   <style>
      
   .modal-wrapper{
    position: absolute;
        top: 0;
        background: white;
        z-index: 529985;
        width: 66%;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 25%;
        transform: translate(-50%,-50%);
   }

    .still-popup-curtain{

      position: fixed;
      padding: 0;
      margin: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 529983;

    }

    .modal-pagamento {
      margin-top: 125px !important ;
    }

 </style>


</section>

      <div 
        class="modal-wrapper"
        id="idShowModalDetalhesFactura"
        style="display: none" 
      > 
        <st-element
          component="ModalDetalhesFactura"
          proxy="modalDetalhesFacturaProxy"
          (onCloseModal)="fecharModalDetalhesFactura()"
        >
        </st-element>
      </div>
  
    <div 
      class="modal-wrapper" 
      id="idShowModalPagamento"
      style="display: none"
    >
      <st-element
        component="ModalPagamento"
        proxy="modalPagamentoProxy"
        (onCloseModal)="fecharModalPagamento()"
      >
      </st-element>
    </div>

      <div 
        class="modal-wrapper modal-pagamento" 
        id="idShowModalPagamentosFactura"
        style="display: none"
      >
      <st-element
        component="ModalListPagamentos"
        proxy="modalListPagamentosProxy"
        (onCloseModal)="fecharModalPagamentosFactura()"
      >
      </st-element>
    </div>

  `;

  constructor() {
    super();
    this.setup({});
  }

  detalhesProcesso(row, col, record) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));
    // se for cliente não veja os detalhes do Processo!
    // if(userLogged.funcao != "cliente") {
    if(userLogged.auth.roles.includes('CAN_SEE_PROCESS_DETAILS')){
      Router.goto("ProcessoDetalhes", {
        data: record.id,
      });
    }else{
      console.log("sem permissao para ver detalhes do Processo ")
    }
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  stAfterInit(val) {
    setTimeout(() => {
      this.getTimesheetFacturaByColaborador(this.id.value)
    }, 1000)  
    //  this.getFacturasCliente(this.id.value)
  }

  async onRender() {
    const routeData = Router.data("ColaboradorDetalhes");

    try {
      if (routeData) {
        this.getDetalhesColaborador(routeData)
        this.id = routeData
      }else{
        AppTemplate.toast({ status: 'Erro', message: 'Colaborador ID não encontrado!' })
      }
    } catch (e) {
      console.log("onRender Cliente Detalhes >>>  >>>  ", e);
    } finally {
      AppTemplate.hideLoading();
    }
  }




  async getDetalhesColaborador(idColaborador) {

    this.colaboradorService.on('load', async () => {

      let response = await this.colaboradorService.getDetalhesColaborador(idColaborador)


      if (response) {

        this.id = response.id;
        this.nomeCompleto = response.nome_completo;
        this.nomeProfissional = response.nome_profissional;
        this.inicial = response.inicial;
        this.funcao = response.funcao;
        this.tipoColaboradorId = response.tipo_colaborador_id;
        this.dataNascimento = response.data_nascimento ? new Date(response.data_nascimento).toLocaleDateString("PT") : "";
        this.taxaHoraria = response.taxa_horaria ? convertToAkzCurrency(response.taxa_horaria) : '-';
        this.status = response.status.toString().toUpperCase();
        this.tipo = response.tipo ? response.tipo.description : "";
        this.identificacoes = response.identificacoes ? this.makeTipoIdentificacao(response.identificacoes) : [];
        this.contactos = response.contactos;
        this.custoFinanceiro = response.custoFinanceiro;
        this.createdAt = response.created_at ? new Date(response.created_at).toLocaleDateString("PT") : "";


        console.log("data de nascimento ", response.tipo)


      }

    })


  }

  async getTimesheetFacturaByColaborador() {

    this.colaboradorService.on('load', async () => {

      const routeData = Router.data("ColaboradorDetalhes");

      let response = await this.colaboradorService.getTimesheetFacturaByColaboradorId(routeData)

      if (response) {

          this.listTimesheetFacturas = response.map((item, index) => (
            {
              id : index + 1 ,
              dataInicio: `${new Date(item.data_inicio).toLocaleDateString("PT")} ${new Date(item.data_inicio).toLocaleTimeString("PT")}`,
              dataFim: `${new Date(item.data_fim).toLocaleDateString("PT")} ${new Date(item.data_fim).toLocaleTimeString("PT")}`,
               horas: item.horas,
              ref: item.ref,
              assunto: item.assunto,
              custo: item.custo ? convertToAkzCurrency(item.custo) : ' - ',
              estado: item.estado ?? 'Não facturado',
              dataRegisto: new Date(item.dataRegistoTimesheet).toLocaleDateString("PT")
            }
          ))

      }

    })


  }

  makeTipoIdentificacao(identificacoes) {

      return identificacoes.map(item => ({
              type: item.tipo.description,
              description: item.valor
      }))

  }

  getProcessosCliente(idCliente) {
    $still.HTTPClient.get(
      `/api/v1/cliente_processos/${idCliente}`
    ).then((r) => {
      let dataResponse = r.data;
      if (dataResponse) {
        console.log("processos do cliente >>>>>>>>>>>   ", dataResponse);
        this.dataTableListProcessos.dataSource = dataResponse
      }
    });
  }

  getFacturasCliente(idCliente) {
    $still.HTTPClient.get(
      `/api/v1/cliente_facturas/${idCliente}`
    ).then((r) => {
      let dataResponse = r.data;
      if (dataResponse) {
        this.dataTableListFacturas.dataSource = dataResponse;
      }
    });
  }


  detalhessFacturaCliente(_, record) {

    this.modalDetalhesFacturaProxy.idFactura = record.id
    this.modalDetalhesFacturaProxy.itensFactura = record.items

    this.showModal = true;
    document.getElementById('idShowModalDetalhesFactura').style.display = "block"

  }

  detalhessPagamentosFacturaCliente(_, record) {

    console.log("detalhes pagamentos ", _, record)

    this.modalListPagamentosProxy.idFactura = record.id
    this.modalListPagamentosProxy.estado = record.estado
    this.modalListPagamentosProxy.ref = record.ref
    this.modalListPagamentosProxy.horas = record.horas
    this.modalListPagamentosProxy.custo = record.custo
    this.modalListPagamentosProxy.dataRegisto = record.created_at

    this.showModal = true;

    this.modalListPagamentosProxy.listPagamentos = record.pagamentos
    document.getElementById('idShowModalPagamentosFactura').style.display = "block"

  }


  callModalPagamento(row, col, record) {

    this.modalPagamentoProxy.idFactura = record.id
    this.modalPagamentoProxy.ref = record.ref
    this.modalPagamentoProxy.valor = record.custo
    this.showModal = true;

    document.getElementById('idShowModalPagamento').style.display = "block"

  }


  fecharModalPagamento(row, col, record) {
    this.showModal = false;
    document.getElementById('idShowModalPagamento').style.display = "none"
  }

  fecharModalDetalhesFactura(row, col, record) {
    this.showModal = false;
    document.getElementById('idShowModalDetalhesFactura').style.display = "none"
  }

  fecharModalPagamentosFactura(row, col, record) {
    this.showModal = false;
    document.getElementById('idShowModalPagamentosFactura').style.display = "none"
  }

}




function convertToAkzCurrency(value) {
  const formatter = new Intl.NumberFormat('ao-AO',
    {
      style: 'currency', currency: 'AKZ',
      maximumFractionDigits: 2, minimumFractionDigits: 2
    }
  );

  return formatter.format(value);
}