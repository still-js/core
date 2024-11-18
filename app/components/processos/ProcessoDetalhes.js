class ProcessoDetalhes extends ViewComponent {

  id;
  estado;
  referencia;
  assunto;
  area;
  fase;
  instituicaoId;
  modoFacturacaoId;
  clienteId;
  gestorId;
  contraParte;
  dataRegisto;
  dataSuspensao;
  colaboradorIdSuspendeu;
  dataEncerramento;
  colaboradorIdEnderrou;

  metodologia;
  estrategia;
  factos;
  objectivos;
  dadosImportantes;

  statusId;
  precedentes;
  equipas;
  tarefas;
  anexos;

  createdAt;
  updatedAt;

  instituicao;
  modo_facturacao;
  cliente;
  tipoCliente;
  gestor;

  listColaboradores;
  listPrecedentes;
  listEquipas;
  listClientes;

  valueInputTarefa;
  equipaInput;
  precedenteInput;

  inputAnexoDescricao;
  inputAnexoFile;

  modePagamento = [
    { code: 1, designacao: 'Transferência Bancária' },
    { code: 2, designacao: 'Depósito' },
    { code: 3, designacao: 'Cash' },
  ]


  /** @type { TabulatorComponent } */
  dataTableListProcessosEquipas = Proxy;
  dataTableLabelsEquipas = Prop(
    JSON.stringify([
      {
        hozAlign: "center",
        editRow: false,
        icon: "<i class='fa fa-pen'></i>",
        width: 20,
      },
      {
        hozAlign: "center",
        deleteRow: true,
        icon: "<i class='fas fa-trash-alt'></i>",
        width: 20,
      },
      { title: "Colaborador", field: "colaborador", sorter: "string" },
      { title: "Função", field: "funcao", sorter: "string" },
    ])
  );
  /** @type { TabulatorComponent } */
  dataTableListProcessosTarefas = Proxy;
  dataTableLabelsTarefas = Prop(
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
        icon: "<i class='fas fa-trash-alt'></i>",
        width: 20,
      },
      { title: "Descrição", field: "descricao", sorter: "string" },
      { title: "Estado", field: "status", sorter: "string" },
      { title: "Data Registo", field: "created_at", sorter: "string" },
    ])
  );

  /** @type { TabulatorComponent } */
  dataTableListProcessosPrecedentes = Proxy;
  dataTableLabelsPrecedentes = Prop(
    JSON.stringify([
      {
        hozAlign: "center",
        editRow: false,
        icon: "<i class='fa fa-pen'></i>",
        width: 20,
      },
      {
        hozAlign: "center",
        deleteRow: true,
        icon: "<i class='fas fa-trash-alt'></i>",
        width: 20,
      },
      { title: "Referência", field: "precedente_refencia", sorter: "string" },
      { title: "Assunto", field: "precedente_assunto", sorter: "string" },
      { title: "#", field: "precedente_id", sorter: "string" },
    ])
  );



  /** @type { TabulatorComponent } */
  dataTableListProcessosTarefas = Proxy;
  dataTableLabelsTarefas = Prop(
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
        icon: "<i class='fas fa-trash-alt'></i>",
        width: 20,
      },
      { title: "Descrição", field: "descricao", sorter: "string" },
      { title: "Estado", field: "status", sorter: "string" },
      { title: "Data Registo", field: "created_at", sorter: "string" },
    ])
  );

  /** @type { TabulatorComponent } */
  dataTableListProcessosPrecedentes = Proxy;
  dataTableLabelsPrecedentes = Prop(
    JSON.stringify([
      {
        hozAlign: "center",
        editRow: false,
        icon: "<i class='fa fa-pen'></i>",
        width: 20,
      },
      {
        hozAlign: "center",
        deleteRow: true,
        icon: "<i class='fas fa-trash-alt'></i>",
        width: 20,
      },
      { title: "Referência", field: "precedente_refencia", sorter: "string" },
      { title: "Assunto", field: "precedente_assunto", sorter: "string" }
    ])
  );


  /** @type { TabulatorComponent } */
  dataTableListProcessosAnexos = Proxy;
  dataTableLabelsAnexos = Prop(
    JSON.stringify([
      {
        hozAlign: "center",
        editRow: true,
        icon: "<i class='fas fa-file-download'></i>",
        width: 20,
      },
      {
        hozAlign: "center",
        deleteRow: true,
        icon: "<i class='fas fa-trash-alt'></i>",
        width: 20,
      },
      { title: "Descrição", field: "descricao", sorter: "string" },
      { title: "Data Registo", field: "created_at", sorter: "string" },
    ])
  );

  horarioCabecalho = Prop(
    JSON.stringify([
      { title: "Designação", field: "name" },
      { title: "Início", field: "start" },
      { title: "Fim", field: "end" },
      { title: "Custo", field: "custo", hozAlign: "right" }
    ])
  );

  horarioDestCabecalho = Prop(
    JSON.stringify([
      { title: "Designação", field: "name" },
      { title: "Início", field: "start" },
      { title: "Fim", field: "end" },
      { title: "Custo", field: "custo", hozAlign: "right", editor: "parent.editPricingValue()" }
    ])
  );

  dadosTimeSheet = Prop(JSON.stringify([]));

  /** @type { TBDragableGrid } */
  honorarioProxy = Proxy;

  /** @type { Factura } */
  facturaProxy = Proxy;

  showFactura = Prop(false);
  totalFactura = Prop(0);

  template = `<section class="content">
    <div class="block-header">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 100px; margin-top: 30px">
          <h1>Detalhes do Processo</h1>
          <h3 class="title-grid-component-description">Navega pela lista ou cria um novo</h3>
        </div>
      </div>
    </div>
  
    <div class="row" style="height: 100vh;">
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <div class="card">
          <div class="body">
            <div id="mail-nav">
              <div class="display-flex">
                <input id="input_estado" (value)="estado" style="border: none; 
                                          font-size: 18px;
                                          font-weight: 600;" readonly="true" />
                <button 
                  title="Editar Processo"
                  (click)="editProcesso(undefined)"
                  style="color: #fff; width: 65px; height: 35px; background-color: #343d45"
                  >
                    <i class="fas fa-edit"></i></button>
              </div>
              <div style="border-bottom: 2px solid #f5f5f5;"></div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Referêcia do Processo</div>
                <div><input id="input_referencia" (value)="referencia" style="border: none; background-color: #d3d3d3;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Assunto</div>
                <div><input id="input_assunto" (value)="assunto" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Área</div>
                <div><input id="input_area" (value)="area" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Fase</div>
                <div><input id="input_fase" (value)="fase" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>

              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Contra Parte</div>
                <div><input id="input_contraparte" (value)="contraParte" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Instituição</div>
                <div><input id="input_instituicao" (value)="instituicao" style="border: none; background-color: #f5f5f5;" readonly="true" />
                </div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Modo de Facturação</div>
                <div><input id="input_modo_facturacao" (value)="modo_facturacao" style="border: none; background-color: #f5f5f5;" readonly="true" />
                </div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Cliente</div>
                <div><input id="input_cliente" (value)="cliente" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Gestor do Processo</div>
                <div><input id="input_gestor" (value)="gestor" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
              <div style="font-weight: bold;">Data de Registo</div>
              <div><input (value)="dataRegisto" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>

              
              <div style="margin-bottom: 5px">
              <div style="font-weight: bold;">Data Encerramento</div>
              <div><input (value)="dataEncerramento" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>

              <div style="margin-bottom: 5px">
              <div style="font-weight: bold;">Data Suspensão</div>
              <div><input (value)="dataSuspensao" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
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
                    <a href="#metodologias" data-toggle="tab" class="active show">Metodologias</a>
                </li>
                <li role="presentation">
                    <a href="#equipas" data-toggle="tab">Equipas</a>
                </li>
                <li role="presentation">
                    <a href="#tarefas" data-toggle="tab">Tarefas</a>
                </li>
                <li role="presentation">
                    <a href="#precedentes" data-toggle="tab">Procedentes</a>
                </li>
                <li role="presentation">
                    <a href="#anexos" data-toggle="tab">Anexos</a>
                </li>
                <li role="presentation">
                    <a href="#honorarios" data-toggle="tab">Honorário</a>
                </li>
            </ul>
            <!-- Tab panes -->

            <div class="tab-content">
            
        <!-- Inicio TAB Metodologias -->
                <div role="tabpanel" class="tab-pane fade in active show" id="metodologias">

                    <div class="product-description">
                        <div class="div-title-abas display-flex">
                            <label class="title-abas">Métodos e Procedimentos</label>
                        </div>

                        <div>
                            <div>
                                <div class="panel-group full-body" id="accordion_5" role="tablist"
                                    aria-multiselectable="true">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading" role="tab" id="headingOne_5">
                                            <h4 class="panel-title display-flex">
                                                <a role="button" data-toggle="collapse" data-parent="#accordion_5"
                                                    href="#collapseOne_5" aria-expanded="true"
                                                    aria-controls="collapseOne_5">
                                                    Metodologias
                                                </a>
                                                <div class="display-flex">
                                                    <a title="Editar Metodologias do Processo" style="cursor: pointer"
                                                        (click)="editResourcesProcesso('input_metodologia')">
                                                        <span class="fas fa-pencil-alt" style="color: #383838"></span>
                                                    </a>
                                                    <a title="Salvar as alterações da metodologia do Processo"
                                                        style="cursor: pointer"
                                                        (click)="saveResourcesProcesso('input_metodologia')">
                                                        <span class="fas fa-save" style="color: #01d28e"></span>
                                                    </a>
                                                </div>
                                            </h4>
                                        </div>
                                        <div id="collapseOne_5" class="panel-collapse collapse in show" role="tabpanel"
                                            aria-labelledby="headingOne_5">
                                            <div class="panel-body"
                                                style="background-color: #fff; border: 1px solid #f5f5f5;">
                                                <textarea readonly="true" style="border: none;  height: 120px"
                                                    (value)="metodologia" id="input_metodologia"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading" role="tab" id="headingTwo_5">
                                            <h4 class="panel-title display-flex">
                                                <a class="collapsed" role="button" data-toggle="collapse"
                                                    data-parent="#accordion_5" href="#collapseTwo_5"
                                                    aria-expanded="false" aria-controls="collapseTwo_5">
                                                    Estrategias
                                                </a>
                                                <div class="display-flex">
                                                    <a title="Editar Estrategia do Processo" style="cursor: pointer"
                                                        (click)="editResourcesProcesso('input_estrategias')">
                                                        <span class="fas fa-pencil-alt" style="color: #383838"></span>
                                                    </a>
                                                    <a title="Salvar as alterações" style="cursor: pointer"
                                                        (click)="saveResourcesProcesso('input_estrategias')">
                                                        <span class="fas fa-save" style="color: #01d28e"></span>
                                                    </a>
                                                </div>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo_5" class="panel-collapse collapse" role="tabpanel"
                                            aria-labelledby="headingTwo_5">
                                            <div class="panel-body"
                                                style="background-color: #fff; border: 1px solid #f5f5f5;">
                                                <textarea readonly="true" style="border: none;  height: 120px"
                                                    id="input_estrategias"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading" role="tab" id="headingThree_5">
                                            <h4 class="panel-title display-flex">
                                                <a class="collapsed" role="button" data-toggle="collapse"
                                                    data-parent="#accordion_5" href="#collapseThree_5"
                                                    aria-expanded="false" aria-controls="collapseThree_5">
                                                    Objectivos
                                                </a>
                                                <div class="display-flex">
                                                    <a title="Editar Objectivos do Processo" style="cursor: pointer"
                                                        (click)="editResourcesProcesso('input_objectivos')">
                                                        <span class="fas fa-pencil-alt" style="color: #383838"></span>
                                                    </a>
                                                    <a title="Salvar as alterações" style="cursor: pointer"
                                                        (click)="saveResourcesProcesso('input_objectivos')">
                                                        <span class="fas fa-save" style="color: #01d28e"></span>
                                                    </a>
                                                </div>
                                            </h4>
                                        </div>
                                        <div id="collapseThree_5" class="panel-collapse collapse" role="tabpanel"
                                            aria-labelledby="headingThree_5">
                                            <div class="panel-body"
                                                style="background-color: #fff; border: 1px solid #f5f5f5;">
                                                <textarea readonly="true" style="border: none;  height: 120px"
                                                    id="input_objectivos"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="panel panel-primary">
                                        <div class="panel-heading" role="tab" id="headingThree_6">
                                            <h4 class="panel-title display-flex">
                                                <a class="collapsed" role="button" data-toggle="collapse"
                                                    data-parent="#accordion_5" href="#collapseThree_6"
                                                    aria-expanded="false" aria-controls="collapseThree_6">
                                                    Factos
                                                </a>
                                                <div class="display-flex">
                                                    <a title="Editar Factos do Processo" style="cursor: pointer"
                                                        (click)="editResourcesProcesso('input_factos')">
                                                        <span class="fas fa-pencil-alt" style="color: #383838"></span>
                                                    </a>
                                                    <a title="Salvar as alterações" style="cursor: pointer"
                                                        (click)="saveResourcesProcesso('input_factos')">
                                                        <span class="fas fa-save" style="color: #01d28e"></span>
                                                    </a>
                                                </div>
                                            </h4>
                                        </div>
                                        <div id="collapseThree_6" class="panel-collapse collapse" role="tabpanel"
                                            aria-labelledby="headingThree_6">
                                            <div class="panel-body"
                                                style="background-color: #fff; border: 1px solid #f5f5f5;">
                                                <textarea readonly="true" style="border: none;  height: 120px"
                                                    id="input_factos"></textarea>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="panel panel-primary">
                                        <div class="panel-heading" role="tab" id="headingThree_7">
                                            <h4 class="panel-title display-flex">
                                                <a class="collapsed" role="button" data-toggle="collapse"
                                                    data-parent="#accordion_5" href="#collapseThree_7"
                                                    aria-expanded="false" aria-controls="collapseThree_7">
                                                    Dados Importantes
                                                </a>
                                                <div class="display-flex">
                                                    <a title="Editar Dados Importantes do Processo"
                                                        style="cursor: pointer"
                                                        (click)="editResourcesProcesso('input_dados_importantes')">
                                                        <span class="fas fa-pencil-alt" style="color: #383838"></span>
                                                    </a>
                                                    <a title="Salvar as alterações" style="cursor: pointer"
                                                        (click)="saveResourcesProcesso('input_dados_importantes')">
                                                        <span class="fas fa-save" style="color: #01d28e"></span>
                                                    </a>
                                                </div>
                                            </h4>
                                        </div>
                                        <div id="collapseThree_7" class="panel-collapse collapse" role="tabpanel"
                                            aria-labelledby="headingThree_7">
                                            <div class="panel-body"
                                                style="background-color: #fff; border: 1px solid #f5f5f5;">
                                                <textarea readonly="true" style="border: none;  height: 120px"
                                                    (value)="dadosImportantes" id="input_dados_importantes"></textarea>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        <!-- Fim TAB Metodologias -->



        <!-- Inicio TAB Equipas -->
                <div role="tabpanel" class="tab-pane fade" id="equipas">

                    <div class="div-title-abas">
                        <label class="title-abas">Equipas Associadas ao Processo</label>
                        <span (click)="toggleForms('form_tab_equipas')" class="btn-details-processo-form"
                            title="Adicionar equipas">
                            <i class="fas fa-plus"></i>
                        </span>
                    </div>

                    <!-- inicio form add tarefas -->
                    <div class="form_add_resources hiddenForm" id="form_tab_equipas">
                        <form id="wizard_with_validatio" onsubmit="javascript: return false;">
                            <div class="row">
                                <div class="input-field col s12">
                                    <span class="input-group-addon">
                                        <i class="material-icons">person</i> Equipas
                                    </span>
                                    <select
                                    id="qeuipaSelectedColaborador"
                                    (change)="updateEquipasProcesso($event)" (forEach)="listEquipas">
                                        <option each="item" value="">Selecione um Advogado</option>
                                        <option each="item" value="{item.id}">{item.descricao}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button (click)="addEquipaProcesso('form_tab_equipas')"
                                    class="btn btn-default">Salvar</button>
                            </div>
                        </form>
                    </div>
                    <!-- fim form add tarefas -->

                    <st-element component="TabulatorComponent" proxy="dataTableListProcessosEquipas"
                        tableHeader="parent.dataTableLabelsEquipas" (onEditColumn)="editProcessoEquipa(fieldName, data)"
                        (onDeleteRow)="removerColaboradorProcesso(fieldName, data)"
                        (onCellClick)="cellClickProcessoEquipa(row, col, data)"></st-element>

                </div>
   <!-- Fim TAB Equipas -->

   <!-- Inicio TAB Tarefas -->
                <div role="tabpanel" class="tab-pane fade" id="tarefas">

                    <div class="div-title-abas display-flex">
                        <label class="title-abas">Tarefas do Processo</label>
                        <span (click)="toggleForms('form_tab_tarefas')" class="btn-details-processo-form"
                            title="Adicionar tarefas"><i class="fas fa-plus"></i></span>
                    </div>


                    <!-- inicio form add tarefas -->
                    <div class="form_add_resources hiddenForm" id="form_tab_tarefas">
                        <form id="wizard_with_validatio" class="" onsubmit="javascript: return false;">
                            <div>
                                <label>Descrição da Tarefa</label>
                                <input (value)="valueInputTarefa" placeholder="Digite uma tarefa" type="text"
                                    id="input_form_tarefa" />
                            </div>
                            <div>
                                <button (click)="addTarefaProcesso('form_tab_tarefas')"
                                    class="btn btn-default">Salvar</button>
                            </div>
                        </form>
                    </div>
                    <!-- fim form add tarefas -->

                    <div class="product-description">
                        <st-element component="TabulatorComponent" proxy="dataTableListProcessosTarefas"
                            tableHeader="parent.dataTableLabelsTarefas"
                            (onEditColumn)="editTarefaProcesso(fieldName, data)"
                            (onDeleteRow)="removerTarefaProcesso(fieldName, data)"
                            (onCellClick)="concluirTarefaProcesso(row, col, data)"></st-element>
                    </div>

                </div>
    <!-- Fim TAB Equipas -->



       <!-- Inicio TAB Precedentes -->
        <div role="tabpanel" class="tab-pane fade" id="precedentes">

                <div class="div-title-abas display-flex">
                    <label class="title-abas">Processos Associados</label>
                    <span (click)="toggleForms('form_tab_precedentes')" class="btn-details-processo-form"
                        title="Vincular Processos">
                        <i class="fas fa-plus"></i>
                    </span>
                </div>
            

            <!-- inicio form add tarefas -->
            <div class="form_add_resources hiddenForm" id="form_tab_precedentes">
                <form id="wizard_with_validatio" onsubmit="javascript: return false;">
                    <div class="row">
                        <div class="input-field col s12">
                            <span class="input-group-addon">
                                <i class="material-icons">person</i> Processos à Associar
                            </span>
                            <select (change)="updatePrecedentes($event)" (forEach)="listPrecedentes">
                                <option each="item" value="">Selecione uma opção</option>
                                <option each="item" value="{item.id}">{item.descricao}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button (click)="addPrecedentesProcesso('form_tab_precedentes')"
                            class="btn btn-default">Salvar</button>
                    </div>
                </form>
            </div>
            <!-- fim form add tarefas -->


            <div class="product-description">
                <st-element 
                    component="TabulatorComponent" 
                    proxy="dataTableListProcessosPrecedentes"
                    tableHeader="parent.dataTableLabelsPrecedentes"
                    (onEditColumn)="editProcessoPrecedente(fieldName, data)"
                    (onDeleteRow)="removerPrecedenteProcesso(fieldName, data)"
                    (onCellClick)="detalhesProcesso(row, col, data)">
                >
                </st-element>


            </div>
    </div>
    <!-- Fim TAB Precedentes -->


    <!-- Inicio TAB Anexos -->
    <div role="tabpanel" class="tab-pane fade" id="anexos">

        <div class="div-title-abas display-flex">
            <label class="title-abas">Anexos Associados ao Processo</label>
            <span (click)="toggleForms('form_tab_anexos')" class="btn-details-processo-form"
                title="Associar anexos ao Processo">
                <i class="fas fa-plus"></i>
            </span>
        </div>

        <!-- inicio form add tarefas -->
        <div class="form_add_resources hiddenForm" id="form_tab_anexos">
            <form>
                <div class="row">
                    <div class="input-field col s12">
                        <label>Descrição</label>
                        <input type="text" class="form-control" (value)="inputAnexoDescricao" />
                        <br />
                        <input id="inputUploadAnexo" class="form-control" accept="image/*" type="file" />
                        <img style="display: none" id="inputUploadAnexoHidden" src="" />
                    </div>
                </div>
                <div>
                    <button (click)="addAnexoProcesso('form_tab_anexos')" class="btn btn-default">Salvar</button>
                </div>
            </form>
        </div>
        <!-- fim form add anexos -->

        <div class="product-description">
            <st-element 
                component="TabulatorComponent" 
                proxy="dataTableListProcessosAnexos"
                tableHeader="parent.dataTableLabelsAnexos" 
                (onEditColumn)="downalodAnexoProcesso(fieldName, data)"
                (onDeleteRow)="removerAnexoProcesso(fieldName, data)"
                (onCellClick)="visualizarAnexoProcesso(row, col, data)">
            </st-element>
        </div>
        
    </div>
    <!-- Fim TAB Anexos -->

    <!-- Inicio TAB Honorário -->
    <div role="tabpanel" class="tab-pane fade" id="honorarios">

        <div class="display-flex">
          <div class="input-field col s12">
            <select (change)="updatePrecedentes($event)" (forEach)="modePagamento">
                <option each="item" value="">Modo de pagamento</option>
                <option each="item" value="{item.code}">{item.designacao}</option>
            </select>
          </div>
          <div class="input-field col s12">
            <select (change)="updatePrecedentes($event)" (forEach)="listEquipas">
                <option each="item" value="">Nome Advogado</option>
                <option each="item" value="{item.id}">{item.descricao}</option>
            </select>
          </div>
        </div>

        <st-element
            component="TBDragableGrid"
            proxy="honorarioProxy"
            tableData="parent.dadosTimeSheet"
            tableFields="parent.horarioCabecalho"
            destFields="parent.horarioDestCabecalho"
            destPlaceholder="Arraste aqui o item a pagar"
            >
        </st-element>

        <div style="display: flex; justify-content: right; margin-top: 30px;">
          <!-- <span (click)="checkHonorarios()">Validar</span> -->
          <button 
            class="btn btn-primary julaw-submit-button" 
            (click)="generateHonorario()">
            Gerar Honorário
          </button>
        </div>

    </div>
    <!-- Fim TAB Anexos -->

    <div class="still-popup-curtain" (showIf)="self.showFactura"></div>
  
    <div 
      class="factura-wrapper" 
      (showIf)="self.showFactura"
      >
      <st-element
        component="Factura"
        proxy="facturaProxy"
        (onCloseFactura)="fecharFactura()"
        >
      </st-element>
    <div>

    <style>
      
      .factura-wrapper{
        position: absolute;
        top: 0;
        background: white;
        z-index: 529985;
        width: 90%;
        top: 0;
        left: 0;
        margin: 0 auto;
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
    `;

  constructor() {
    super();
    this.setup({});
  }

  gotoView(viewComponent) {
    Router.goto(viewComponent);
  }

  async onRender() {
    this.stRunOnFirstLoad(() => {
      $(".js-basic-example").DataTable({
        responsive: true,
      });
    });

    /** For Test purpose only */
    await this.stLazyExecution(async () => { });
  }

  getDetalhesProcesso(idProcesso) {

    console.log("lista dos Detalhes do Processo... here ...")

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/processo/${idProcesso}`
    ).then((r) => {
      if (r.status === 200) {
        try {

          this.populateAttributes(r.data[0]);
          this.getListColaboradores();
          this.getListPrecedentes();

        } catch (e) {
          console.log("fn populates attributes", e);
        }
      }
    });

    this.getTimeSheet(idProcesso);
    this.getListColaboradores();
    this.getListPrecedentes();
  }

  stAfterInit(val) {

    const routeData = Router.data("ProcessoDetalhes");

    this.getDetalhesProcesso(routeData)

    document.getElementById('inputUploadAnexo').addEventListener('change', function (event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const base64String = e.target.result;
          this.inputAnexoFile = base64String;

          document.getElementById('inputUploadAnexoHidden').src = base64String;

          // const imagePreview = document.getElementById('imagePreview');
          // imagePreview.src = base64String;  // Exibe a imagem
        };
        reader.readAsDataURL(file); // Converte o arquivo em base64
      }
    })

  }

  populateAttributes(data) {

    this.id = data.id ? data.id : "";
    this.estado = data.estado ? data.estado : "";
    this.referencia = data.ref ? data.ref : "";
    this.assunto = data.assunto ? data.assunto : "";
    this.area = data.area ? data.area : "";
    this.fase = data.fase ? data.fase : "";
    this.instituicaoId = data.instituicao_id ? data.instituicao_id : "";
    this.modoFacturacaoId = data.modo_facturacao_id
      ? data.modo_facturacao_id
      : "";
    this.clienteId = data.cliente_id ? data.cliente_id : "";
    this.gestorId = data.gestor_id ? data.gestor_id : "";
    this.contraParte = data.contra_parte ? data.contra_parte : "";
    this.dataRegisto = data.data_registo ? new Date(data.data_registo).toLocaleDateString("PT") : "";
    this.dataSuspensao = data.data_suspensao ? new Date(data.data_suspensao).toLocaleDateString("PT")  : "";
    this.dataEncerramento = data.data_encerramento
      ? new Date(data.data_encerramento).toLocaleDateString("PT")
      : "";

    this.metodologia = data.metodologia ? data.metodologia : "";
    this.estrategia = data.estrategia ? data.estrategia : "";
    this.factos = data.factos ? data.factos : "";
    this.objectivos = data.objectivos ? data.objectivos : "";
    this.dadosImportantes = data.dados_importantes
      ? data.dados_importantes
      : "";
    this.statusId = data.status_id ? data.status_id : "";

    this.createdAt = data.created_at ? data.created_at : "";
    this.updatedAt = data.updated_at ? data.updated_at : "";

    this.instituicao = data.instituicao ? data.instituicao : "";
    this.modo_facturacao = data.modo_facturacao ? data.modo_facturacao : "";
    this.cliente = data.cliente ? data.cliente : "";
    this.tipoCliente = data.tipo_cliente ? data.tipo_cliente : "";
    this.gestor = data.gestor ? data.gestor : "";

    this.precedentes = data.precedentes ? data.precedentes : [];
    this.equipas = data.equipas ? data.equipas : [];
    this.tarefas = data.tarefas ? data.tarefas : [];
    this.anexos = data.anexos ? data.anexos : [];

    /** Setters values  */
    this.setValueById('input_metodologia', this.metodologia.value)
    this.setValueById('input_estrategias', this.estrategia.value)
    this.setValueById('input_objectivos', this.objectivos.value)
    this.setValueById('input_factos', this.factos.value)
    this.setValueById('input_dados_importantes', this.dadosImportantes.value)

    /** details */
    this.setValueById('input_estado', this.estado.value)
    this.setValueById('input_referencia', this.referencia.value)
    this.setValueById('input_assunto', this.assunto.value)
    this.setValueById('input_area', this.area.value)
    this.setValueById('input_fase', this.fase.value)
    this.setValueById('input_instituicao', this.instituicao.value)
    this.setValueById('input_modo_facturacao', this.modo_facturacao.value)
    this.setValueById('input_cliente', this.cliente.value)
    this.setValueById('input_gestor', this.gestor.value)

    /** populate table Proxy Components */
    if(data.equipas)
      this.dataTableListProcessosEquipas.dataSource = data.equipas;

    if(data.tarefas)
      this.dataTableListProcessosTarefas.dataSource = data.tarefas;

    if(data.precedentes)
      this.dataTableListProcessosPrecedentes.dataSource = data.precedentes;

    if(data.anexos)
      this.dataTableListProcessosAnexos.dataSource = data.anexos;

  }

  editResourcesProcesso(inputId) {
    this.toggleEditarInputArea(inputId)
  }

  toggleEditarInputArea(id, isEdit = true) {
    console.log(id)
    // document.getElementById("")
    let elm = document.getElementById(id)
    if (isEdit) {
      elm.removeAttribute("readonly")
      elm.focus()
    } else {
      elm.setAttribute("readonly", true)
    }

  }

  saveResourcesProcesso(id) {
    let elm = document.getElementById(id)

    if (elm.hasAttribute("readonly"))
      return false

    switch (id) {
      case "input_metodologia":
        this.metodologia = elm.value
        break
      case "input_estrategias":
        this.estrategia = elm.value
        break
      case "input_objectivos":
        this.objectivos = elm.value
        break
      case "input_factos":
        this.factos = elm.value
        break
      default:
        this.dadosImportantes = elm.value
    }

    const payload = {
      "metodologia": this.metodologia.value,
      "estrategia": this.estrategia.value,
      "factos": this.factos.value,
      "objectivos": this.objectivos.value,
      "dataImportantes": this.dadosImportantes.value
    };

    this.updateProcesso(payload)
    this.toggleEditarInputArea(id, false)

  }

  updateProcesso(payload) {
    $still.HTTPClient.put(
      `http://localhost:3000/api/v1/processo/${this.id.value}`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          alert(response.errors);
        } else {
          alert("Salvo com sucesso");
        }
      })
      .catch((err) => {
        alert(err.message)
      });
  }


  setValueById(id, value) {
    document.getElementById(id).value = value
  }

  getValueById(id) {
    return document.getElementById(id).value
  }

  qeuipaSelectedColaborador;
  updateEquipasProcesso(evt) {
    this.equipaInput = evt.target.value;
    const e = document.getElementById("qeuipaSelectedColaborador");
    this.qeuipaSelectedColaborador = e.options[e.selectedIndex].text;
  }

  updatePrecedentes(evt) {
    this.precedenteInput = evt.target.value;
  }


  getListColaboradores() {
    $still.HTTPClient.get("http://localhost:3000/api/v1/colaborador/").then(
      (r) => {
        if (r.data) {
          let colaboradorData = [];
          let equipasData = [];

          for (let colaborador of r.data) {
            colaboradorData.push({
              id: colaborador.id,
              descricao: `${colaborador.description} - ${colaborador.nome_completo}`,
            });

            if (colaborador.funcao.toString().toUpperCase().includes("ADV")) {
              equipasData.push({
                id: colaborador.id,
                descricao: `${colaborador.description} - ${colaborador.nome_completo}`,
              });
            }
          }

          this.listEquipas = equipasData;
          this.listColaboradores = colaboradorData;
        }
      }
    );
  }


  getListPrecedentes() {
    $still.HTTPClient.get("http://localhost:3000/api/v1/processo/").then(
      (r) => {
        if (r.data) {
          let processoData = [];

          for (let processo of r.data) {
            processoData.push({
              id: processo.id,
              descricao: `${processo.assunto} - ${processo.ref}`,
            });
          }

          this.listPrecedentes = processoData;
        }
      }
    );
  }


  /** Function Save */
  async addEquipaProcesso(idForm) {

    const equipa = this.equipaInput.value;
    
    const payload = {
      "processoId": this.id.value,
      "colaboradoresId": [equipa]
    }

    $still.HTTPClient.post(
      "http://localhost:3000/api/v1/recursos_processo",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(`processo criado com sucesso: `, response);
        if (response.status !== 201) {
          console.log(response)
          console.log(response.errors);
        } else {
          console.log("Salvo com sucesso");
          this.toggleForms(idForm);

          const dados = this.qeuipaSelectedColaborador.value.split('-');
          const funcao = [dados[0], dados[1]].join('');
          const colaborador = dados[2].trim()

          this.dataTableListProcessosEquipas.insertRow(
            { colaborador, funcao }
          );
          //this.getDetalhesProcesso(this.id.value)
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });

  }



  async addPrecedentesProcesso(idForm) {

    console.log("addPrecedentesProcesso... ", this.precedenteInput.value);

    const tarefa = this.getValueById('input_form_tarefa')
    const precedente = this.precedenteInput.value;

    const payload = {
      "processoId": this.id.value,
      "precedentes": [precedente]
    }

    $still.HTTPClient.post(
      "http://localhost:3000/api/v1/recursos_processo",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(`processo criado com sucesso: `, response);
        if (response.status !== 201) {
          console.log(response)
          alert(response.errors);
        } else {
          alert("Salvo com sucesso");
          console.log("cadastro do colaborador ... ", response);
          this.toggleForms(idForm)
          this.getDetalhesProcesso(this.id.value)
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });

  }


  addAnexoProcesso(idForm) {

    const userLogged = JSON.parse(localStorage.getItem("_user"));

    console.log(userLogged)
    let userId = userLogged.id 

    const payload = {
      "processoId": this.id.value,
      "colaboradorId": userId,
      "anexos": [{
        "descricao": this.inputAnexoDescricao.value,
        "anexo": document.getElementById('inputUploadAnexoHidden').src
      }]
    }


    console.log("payload anexo", payload)

    $still.HTTPClient.post(
      "http://localhost:3000/api/v1/anexos_processo",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(`processo criado com sucesso: `, response);
        if (response.status !== 201) {
          console.log(response)
          alert(response.errors);
        } else {
          alert("Salvo com sucesso");
          console.log("cadastro do colaborador ... ", response);
          this.toggleForms(idForm)
          this.getDetalhesProcesso(this.id.value)
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });

  }


  addTarefaProcesso(idForm) {
    
    const tarefa = this.getValueById('input_form_tarefa')
    let inputTarefa = document.getElementById('input_form_tarefa')

    if (inputTarefa.value.trim() === '') {
      alert("Preencha o campo da tarefa!");
      return false;
    }

    if (inputTarefa.hasAttribute("data-id")) {

      let idTarefa = inputTarefa.dataset.id
      const payload = {
        "descricao": tarefa
      }

      $still.HTTPClient.put(
        `http://localhost:3000/api/v1/tarefas_processo/${idTarefa}`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log(`processo criado com sucesso: `, response);
          if (response.status !== 200) {
            console.log(response)
            alert(response.errors);
          } else {
            alert("Actualizado com sucesso");
            console.log("cadastro do colaborador ... ", response);
            this.toggleForms(idForm)
            this.getDetalhesProcesso(this.id.value)
          }
        })
        .catch((err) => {
          console.log(`Erro ao cadastrar processo: `, err);
        });

    } else {

      const payload = {
        "processoId": this.id.value,
        "tarefas": [tarefa]
      }


      $still.HTTPClient.post(
        "http://localhost:3000/api/v1/recursos_processo",
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log(`processo criado com sucesso: `, response);
          if (response.status !== 201) {
            console.log(response)
            alert(response.errors);
          } else {
            alert("Salvo com sucesso");
            console.log("cadastro do colaborador ... ", response);
            this.toggleForms(idForm)
            this.getDetalhesProcesso(this.id.value)
          }
        })
        .catch((err) => {
          console.log(`Erro ao cadastrar processo: `, err);
        });

    }


  }

  editProcesso(id) {
    const idProcesso = id == undefined ? this.id.value : id;
    console.log("here... ProcessoDetalhes ...", idProcesso)
    Router.goto("ProcessoForm", {
      data: idProcesso,
    });
  }

  /** toogle dos forms */
  toggleForms(id) {
    console.log(id)
    let form = document.getElementById(id)
    form.classList.toggle("showForm")
  }

  removerColaboradorProcesso(_, record) {

    let payload = {
      "type": "colaborador",
      "valueId": record.id
    }

    $still.HTTPClient.delete(
      `http://localhost:3000/api/v1/recursos_processo/`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("ver anexo processo response >> ", response)

        if (response.status === 200) {
          alert("Removido com Sucesso!")
        }
        if (response.status === 200) {
          alert("Removido com Sucesso!")
          this.getDetalhesProcesso(this.id.value)
        }

      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  editTarefaProcesso(_, record) {
    document.getElementById('input_form_tarefa').value = record.descricao
    document.getElementById('input_form_tarefa').setAttribute("data-id", record.id)
    document.getElementById('form_tab_tarefas').classList.toggle("showForm")
  }

  removerTarefaProcesso(_, record) {

    let payload = {
      "type": "tarefa",
      "valueId": record.id
    }

    $still.HTTPClient.delete(
      `http://localhost:3000/api/v1/recursos_processo/`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("ver anexo processo response >> ", response)

        if (response.status === 200) {
          alert("Removido com Sucesso!")
          this.getDetalhesProcesso(this.id.value)
        }

      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });


  }

  concluirTarefaProcesso(_, _col, record) {

    const payload = {
      "status": 1
    }

    $still.HTTPClient.put(
      `http://localhost:3000/api/v1/tarefas_processo/${record.id}`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          alert(response.errors);
        } else {
          alert("Actualizado com sucesso a tarefa");
          this.getDetalhesProcesso(this.id.value)
          // this.toggleForms(idForm)
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });

  }

  removerPrecedenteProcesso(_, record) {

    let payload = {
      "type": "precedente",
      "valueId": record.id
    }


    $still.HTTPClient.delete(
      `http://localhost:3000/api/v1/recursos_processo/`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      console.log("ver anexo processo response >> ", response)

      if (response.status === 200) {

        alert("Removido com Sucesso!")
        this.getDetalhesProcesso(this.id.value)
      } else {
        alert("Erro ao remover o Processo!")
      }

    })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }



  downalodAnexoProcesso(_, record) {

    console.log('view_anexo_processo >>  ', record.id)


    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/view_anexo_processo/${record.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("ver anexo processo response >> ", response)

        if (response.status === 200) {

          let pathDownload = `http://localhost:3000/api/v1/preview_anexo`
          const link = document.createElement('a');
          link.setAttribute("target", '_blank');
          link.href = `${pathDownload}/${response.data.fileName}`;
          link.download = 'Processo Anexo'; // Define o nome do arquivo ao fazer o download
          document.body.appendChild(link);
          link.click(); // Simula o clique no link
          document.body.removeChild(link); // Remove o link após o download
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });

  }

  visualizarAnexoProcesso(_, _col, record) {
    console.log('visualizarAnexoProcesso ', record.id)

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/view_anexo_processo/${record.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("ver anexo processo response >> ", response)

        if (response.status === 200) {
          let pathDownload = `http://localhost:3000/api/v1/preview_anexo`
          window.open(`${pathDownload}/${response.data.fileName}`, '_blank', 'width=800,height=600');
        }

      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });

  }


  detalhesProcesso(_, record) {
    Router.goto("ProcessoDetalhes", {
      data: record.id,
    });
  }

  removerAnexoProcesso(_, record) {

    console.log('removerAnexoProcesso ', record.id)

    let payload = {
      "type": "anexo",
      "valueId": record.id
    }

    $still.HTTPClient.delete(
      `http://localhost:3000/api/v1/recursos_processo/`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("ver anexo processo response >> ", response)

        if (response.status === 200) {
          alert("Removido com Sucesso!")
          this.getDetalhesProcesso(this.id.value)
        }

      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });


  }


  editPricingValue(evtType, value, rowData, rowNum) {

    if (evtType == 'onFocus') {
      const actualValue = String(value)
        .slice(4) //Remove AKZ Angola currency code and the space after it
        .replace('.', '', 'gi') //Remove the period/dot in the thousands separator
        .split(','); //Separate the integer value from the cents
      const cents = parseFloat(actualValue[1]);
      return parseFloat(actualValue[0]) + `${cents > 0 ? ',' + cents : ''}`;
    }

    if (evtType == 'onLoseFocus') {

      const inputValue = String(value).split(',');
      const amount = inputValue[0];
      const cents = inputValue[1] ? ',' + inputValue[1] : ',00';

      const formatter = new Intl.NumberFormat('ao-AO',
        {
          style: 'currency', currency: 'AKZ',
          maximumFractionDigits: 0, minimumFractionDigits: 0
        }
      );

      const custo = formatter.format(amount) + `${cents} `;
      this.honorarioProxy.updateDestRow(rowNum, { custo, total: custo });

      return custo;
    }

  }


  getTimeSheet(idProcess) {

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/processo_time_sheets/${idProcess}`
    ).then((r) => {
      if (r.status === 200) {
        try {

          const mapper = this.convertTimeSheetToGrid;
          const timeSheetData = r.data.map(mapper);
          this.honorarioProxy.setSourceData(timeSheetData);

        } catch (e) {
          console.log("fn populates attributes", e);
        }
      }
    });

  }

  convertTimeSheetToGrid(r) {

    const { dados_importantes, id } = r;
    const { title: name, start: Start, end: End } = JSON.parse(dados_importantes);

    const startDate = new Date(Start.d.d);
    const endDate = new Date(End.d.d);

    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    const start = startDate.toLocaleString();
    const end = endDate.toLocaleString();

    const hours = (endTime - startTime) / (1000 * 60 * 60);
    const custo = `${convertToAkzCurrency(hours * 10_000)}`

    return {
      id,
      custo,
      name,
      start,
      end,
      qtd: `${hours} Hrs`,
      total: custo
    }

  }

  generateHonorario() {

    const data = this.honorarioProxy.getDestData();
    console.log(data);
    this.showFactura = true;

    const totalFactura = data
      .map(
        r => parseFloat(cleanCurrencyValue(r.total))
      )
      .reduce((accum, val) => accum + val);

    const invoiceNum = Math.random().toString().split('.')[1];
    this.facturaProxy.setNumeroFactura(invoiceNum.substring(0, 5));
    this.facturaProxy.setNomeDocliente(this.cliente.value);
    this.facturaProxy.setTotalFactura(totalFactura);
    this.facturaProxy.itensFactura = data;

  }

  fecharFactura() {
    this.showFactura = false;
  }


  checkHonorarios() {
    //this.dataTableListProcessosAnexos
    console.log(this.dataTableListProcessosAnexos.table.getData());
    //this.honorarioProxy.inse
  }

}


/**
 * Move this to Utility class of function
 */

function convertToAkzCurrency(value) {
  const formatter = new Intl.NumberFormat('ao-AO',
    {
      style: 'currency', currency: 'AKZ',
      maximumFractionDigits: 2, minimumFractionDigits: 2
    }
  );

  return formatter.format(value);
}

/**
 * @param { Date } date
 */
function convertDateToEuStr(date) {
  return date.toLocaleString();
}

function cleanCurrencyValue(val) {
  return val
    .replace('AKZ', '')
    .replace('.', '')
    .replace(',', '.')
    .trim()
}


/**
 * End of Move this to Utility class of function
 */