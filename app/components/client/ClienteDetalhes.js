class ClienteDetalhes extends ViewComponent {

  id;
  denominacao;
  tipoCliente;
  nif;
  pessoaContacto;
  contacto;
  email;
  endereco;
  createdAt;

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
    showModalPagamento = true;
    /** @Prop */
    showModalListPagamentos = false;

    /**
    * @Inject
    * @type { ClienteService }  
    */
    clienteService;

  template = `
  <section class="content">
  <form>
    <div class="block-header">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 100px; margin-top: 30px">
          <h1>Detalhes do CLiente</h1>
          <h3 class="title-grid-component-description">Veja aqui todo envolvimento do cliente na Plataforma</h3>
        </div>
      </div>
    </div>
  
    <div class="row" style="height: 100vh;">
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <div class="card">
          <div class="body">
            <div id="mail-nav">    
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Denominação</div>
                <input id="input_referencia" (value)="denominacao" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Tipo de Cliente</div>
                <input id="input_referencia" (value)="tipoCliente" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>

              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">NIF</div>
                <input id="input_referencia" (value)="nif" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Pessoa de Contacto</div>
                <input id="input_referencia" (value)="pessoaContacto" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>

              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Contacto</div>
                <input id="input_referencia" (value)="contacto" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">E-mail</div>
                <input id="input_referencia" (value)="email" style="border: none; background-color: #d3d3d3;" readonly="true" />
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Endereço</div>
                <input id="input_referencia" (value)="endereco" style="border: none; background-color: #d3d3d3;" readonly="true" />
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
                    <a href="#processos" data-toggle="tab" class="active show">Processos</a>
                </li>
                <li role="presentation">
                    <a href="#facturas" data-toggle="tab">Facturas</a>
                </li>
            </ul>
            <!-- Tab panes -->

            <div class="tab-content">
            
        <!-- Inicio TAB Processos -->
                <div role="tabpanel" class="tab-pane fade in active show" id="processos">

                    <div class="product-description">
                        <div class="div-title-abas display-flex">
                            <label class="title-abas">Os teus Processos</label>
                            </div>
                          
                            <div class="body">
                                <div class="table-responsive">
                                    <st-element component="TabulatorComponent" 
                                        proxy="dataTableListProcessos"
                                        tableHeader="parent.dataTableProcessosLabels" 
                                        tableHeight="auto"
                                        (onEditColumn)="editProcesso(fieldName, data)"
                                        (onDeleteRow)="detalhesProcesso(fieldName, data)" (onCellClick)="cellClick(row, col, data)">
                                    </st-element>
                            </div>
                                   
                        </div>
                    </div>
                </div>
        <!-- Fim TAB Processos -->

        <!-- Inicio TAB Facturas -->
                <div role="tabpanel" class="tab-pane fade" id="facturas">

                <div class="product-description">
                <div class="div-title-abas display-flex">
                    <label class="title-abas">As tuas Facturas</label>
                    </div>
                  
                    <div class="body">
                    <div class="table-responsive">
                        <st-element component="TabulatorComponent" 
                            proxy="dataTableListFacturas"
                            tableHeader="parent.dataTableFacturasLabels" 
                            tableHeight="auto"
                            (onEditColumn)="callModalDetalhesFactura(fieldName, data)"
                            (onDeleteRow)="callModalListPagamento(fieldName, data)" 
                            (onCellClick)="callModalPagamento(row, col, data)">
                        </st-element>
                </div>
                   
                           
                </div>
            </div>
                    
                </div>
   <!-- Fim TAB Facturas -->

   </form>

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

 </style>
  
  </section>

    <div 
      class="modal-wrapper" 
      (showIf)="self.showModalPagamento"
    >
      <st-element
        component="ModalPagamento"
        proxy="modalPagamentoProxy"
        (onCloseModal)="fecharModalPagamento()"
      >
      </st-element>
    <div>

    <div 
    class="modal-wrapper" 
    (showIf)="self.showModalDetalhesFactura"
    >
      <st-element
        component="ModalDetalhesFactura"
        proxy="modalDetalhesFacturaProxy"
        (onCloseModal)="fecharModalDetalhesFactura()"
      >
      </st-element>
    <div>

    <div 
      class="modal-wrapper" 
     (showIf)="self.showModalListPagamentos"
    >
      <st-element
        component="ModalListPagamentos"
        proxy="modalListPagamentosProxy"
        (onCloseModal)="fecharModalListPagamentos()"
      >
      </st-element>
    <div>
    `;

  constructor() {
    super();
    this.setup({});
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  stAfterInit(val) {
    this.getProcessosCliente(this.id.value)
    this.getFacturasCliente(this.id.value)
  }

  async onRender() {
    const routeData = Router.data("ClienteDetalhes");

    try {
      if (routeData) {
        this.getDetalhesCliente(routeData)      
      }
    } catch (e) {
      console.log("onRender Cliente Detalhes >>>  >>>  ", e);
    } finally {
      AppTemplate.hideLoading();
    }
  }

  async getDetalhesCliente(idCliente) {

    this.clienteService.on('load', async () => {

      console.log("getDetalhesClient ", idCliente)

      let response = await this.clienteService.getDetalhesCliente(idCliente)
  
        if (response) {
  
          console.log("clienteService ... ", response);
  
          this.id = response.id;
          this.denominacao = response.denominacao;
          this.nif = response.nif;
          this.endereco = response.endereco;
          this.pessoaContacto = response.pessoa_contacto;
          this.contacto = response.contacto_cobranca;
          this.tipoCliente = response.tipo.description;
          this.email = response.e_mail;
          this.createdAt = new Date(response.created_at)
            .toLocaleString("PT")
            .substring(0, 10);
        }

    })

   
  }

  getProcessosCliente(idCliente) {
    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/cliente_processos/${idCliente}`
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
      `http://localhost:3000/api/v1/cliente_facturas/${idCliente}`
    ).then((r) => {
      let dataResponse = r.data;
      if (dataResponse) {
        console.log("processo facturas >>>>>>>>>>   ", dataResponse);
        this.dataTableListFacturas.dataSource = dataResponse;
      }
    });
  }


  callModalDetalhesFactura(_, record) {

    console.log("datalhes factura ", _ , record)
    this.showModalDetalhesFactura = true

  }

  callModalListPagamento(_, record) {

    console.log("callModalListPagamento ", _ , record)
    this.showModalListPagamentos = true

  }

  callModalPagamento(row, col, record) {

    console.log("callModalPagamento ", row, col, record)
    this.showModalPagamento = true

  }

}
