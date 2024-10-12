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
                <button title="Editar Processo"
                  class="btn btn-default btn-circle waves-effect waves-circle waves-float"><i style="color: #fff"
                    class="fas fa-edit"></i></button>
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
  
            </div>
          </div>
        </div>
      </div>
  
  
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
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane fade in active show" id="metodologias">
  
                <div class="product-description">
                <div class="div-title-abas display-flex">
                    <label class="title-abas">Métodos e Procedimentos</label>
                    <button class="btn" title="Adicionar"><i class="fas fa-plus"></i></button>
                </div>      
  
                  <div>  
                    <div>
                      <div class="panel-group full-body" id="accordion_5" role="tablist" aria-multiselectable="true">
                        <div class="panel panel-primary">
                          <div class="panel-heading" role="tab" id="headingOne_5">
                            <h4 class="panel-title display-flex">
                              <a role="button" data-toggle="collapse" data-parent="#accordion_5" href="#collapseOne_5"
                                aria-expanded="true" aria-controls="collapseOne_5">
                                Metodologias
                              </a>
                              <a title="Editar Metodologias do Processo" style="cursor: pointer" (click)="editResourcesProcesso('input_metodologia')">
                                <span class="fas fa-pencil-alt"></span>
                              </a>
                            </h4>
                          </div>
                          <div id="collapseOne_5" class="panel-collapse collapse in show" role="tabpanel"
                            aria-labelledby="headingOne_5">
                            <div class="panel-body" style="background-color: #fff; border: 1px solid #f5f5f5;">
                                <textarea  readonly="true" style="border: none;  height: 120px" (value)="metodologia" id="input_metodologia"></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="panel panel-primary">
                          <div class="panel-heading" role="tab" id="headingTwo_5">
                            <h4 class="panel-title display-flex">
                              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                                href="#collapseTwo_5" aria-expanded="false" aria-controls="collapseTwo_5">
                                Estrategias
                              </a>
                              <a title="Editar Estrategias do Processo" style="cursor: pointer" (click)="editResourcesProcesso('input_estrategias')">
                                <span class="fas fa-pencil-alt"></span>
                            </a>
                            </h4>
                          </div>
                          <div id="collapseTwo_5" class="panel-collapse collapse" role="tabpanel"
                            aria-labelledby="headingTwo_5">
                            <div class="panel-body" style="background-color: #fff; border: 1px solid #f5f5f5;">
                              <textarea readonly="true" style="border: none;  height: 120px" id="input_estrategias"></textarea>
                            </div>
                          </div>
                        </div>
                        <div class="panel panel-primary">
                          <div class="panel-heading" role="tab" id="headingThree_5">
                            <h4 class="panel-title display-flex">
                              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                                href="#collapseThree_5" aria-expanded="false" aria-controls="collapseThree_5">
                                Objectivos
                              </a>
                              <a title="Editar Objectivos do Processo" style="cursor: pointer" (click)="editResourcesProcesso('input_objectivos')">
                                <span class="fas fa-pencil-alt"></span>
                              </a>
                            </h4>
                          </div>
                          <div id="collapseThree_5" class="panel-collapse collapse" role="tabpanel"
                            aria-labelledby="headingThree_5">
                            <div class="panel-body" style="background-color: #fff; border: 1px solid #f5f5f5;">
                              <textarea readonly="true" style="border: none;  height: 120px" id="input_objectivos"></textarea>
                            </div>
                          </div>
                        </div>


                        <div class="panel panel-primary">
                        <div class="panel-heading" role="tab" id="headingThree_6">
                          <h4 class="panel-title display-flex">
                            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                              href="#collapseThree_6" aria-expanded="false" aria-controls="collapseThree_6">
                              Factos
                            </a>
                            <a title="Editar Factos do Processo" style="cursor: pointer" (click)="editResourcesProcesso('input_factos')">
                              <span class="fas fa-pencil-alt"></span>
                            </a>
                          </h4>
                        </div>
                        <div id="collapseThree_6" class="panel-collapse collapse" role="tabpanel"
                          aria-labelledby="headingThree_6">
                          <div class="panel-body" style="background-color: #fff; border: 1px solid #f5f5f5;">
                            <textarea  readonly="true" style="border: none;  height: 120px" id="input_factos"></textarea>
                          </div>
                        </div>
                      </div>


                      <div class="panel panel-primary">
                      <div class="panel-heading" role="tab" id="headingThree_7">
                        <h4 class="panel-title display-flex">
                          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                            href="#collapseThree_7" aria-expanded="false" aria-controls="collapseThree_7">
                            Dados Importantes
                          </a>
                          <a title="Editar Dados Importantes do Processo" style="cursor: pointer" (click)="editResourcesProcesso('input_dados_importantes')">
                            <span class="fas fa-pencil-alt"></span>
                          </a>
                        </h4>
                      </div>
                      <div id="collapseThree_7" class="panel-collapse collapse" role="tabpanel"
                        aria-labelledby="headingThree_7">
                        <div class="panel-body" style="background-color: #fff; border: 1px solid #f5f5f5;">
                          <textarea readonly="true" style="border: none;  height: 120px" (value)="dadosImportantes" id="input_dados_importantes"></textarea>
                        </div>
                      </div>
                    </div>



                      </div>
                    </div>
                  </div>
                </div>
              </div>              
              
   
  
        <div role="tabpanel" class="tab-pane fade" id="equipas">
  
          <div class="div-title-abas display-flex">
            <label class="title-abas">Equipas Associadas ao Processo</label>
            <button class="btn" title="Adicionar"><i class="fas fa-plus"></i></button>
          </div>
  
          <div class="product-description">
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                <thead>
                  <tr>
                    <th width="100px">#</th>
                    <th>Colaborador</th>
                    <th>Função</th>
                    <th>Acções</th>
                  </tr>
                </thead>
                <!-- <output of="dataSource"> -->
                <tbody (forEach)="equipas">
                  <tr each="item">
                    <td>{item.id}</td>
                    <td>{item.colaborador}</td>
                    <td>{item.funcao}</td>
                    <td class="center">
                      <div style="display: flex; gap: 20px; justify-content: center;">
                        <a title="Editar Processo" style="cursor: pointer" (click)="editProcesso('{item.id}')">
                          <span class="fas fa-pencil-alt"></span>
                        </a>
                        <a title="Ver detalhes do Processo" style="cursor: pointer"
                          (click)="detalhesProcesso('{item.id}')">
                          <span class="fas fa-file-alt"></span>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
        </div>
        <div role="tabpanel" class="tab-pane fade" id="tarefas">
  
          <div class="div-title-abas display-flex">
            <label class="title-abas">Tarefas do Processo</label>
            <span title="Adicionar"><i class="fas fa-plus"></i></span>
          </div>
          

          <!-- inicio form add tarefas -->
          <div class="form_add_resources" id="form_tab_tarefas">
              <form id="wizard_with_validatio" onsubmit="javascript: return false;">
                <div>
                  <label>Descrição da Tarefa</label>
                  <input placeholder="Digite uma tarefa" type="text" id="input_form_tarefa" />
                </div>
                <div>
                  <button (click)="addTarefaProcesso()" class="btn btn-default">Salvar</button>
                </div>
              </form>
          </div>
          <!-- fim form add tarefas -->

  
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
              <thead>
                <tr>
                  <th width="100px">#</th>
                  <th>Tarefa</th>
                  <th>Estado</th>
                  <th>Data registo</th>
                  <th>Acções</th>
                </tr>
              </thead>
              <!-- <output of="dataSource"> -->
              <tbody (forEach)="tarefas">
                <tr each="item">
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.status}</td>
                  <td>{item.created_at}</td>
                  <td class="center">
                    <div style="display: flex; gap: 20px; justify-content: center;">
                      <a title="Editar Processo" style="cursor: pointer" (click)="editProcesso('{item.id}')">
                        <span class="fas fa-pencil-alt"></span>
                      </a>
                      <a title="Ver detalhes do Processo" style="cursor: pointer" (click)="detalhesProcesso('{item.id}')">
                        <span class="fas fa-file-alt"></span>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
  
  
        </div>
  
        <div role="tabpanel" class="tab-pane fade" id="precedentes">
  
          <div class="div-title-abas display-flex">
            <label class="title-abas">Processos Associados</label>
            <button class="btn" title="Adicionar"><i class="fas fa-plus"></i></button>
          </div>  
  
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
              <thead>
                <tr>
                  <th width="40px">#</th>
                  <th>Referência</th>
                  <th>Assunto</th>
                  <th>Acções</th>
                </tr>
              </thead>
              <!-- <output of="dataSource"> -->
              <tbody (forEach)="precedentes">
                <tr each="item">
                  <td>{item.precedente_id}</td>
                  <td>{item.precedente_refencia}</td>
                  <td>{item.precedente_assunto}</td>
                  <td class="center">
                    <div style="display: flex; gap: 20px; justify-content: center;">
                      <a title="Editar Processo" style="cursor: pointer" (click)="editProcesso('{item.id}')">
                        <span class="fas fa-pencil-alt"></span>
                      </a>
                      <a title="Ver detalhes do Processo" style="cursor: pointer" (click)="detalhesProcesso('{item.id}')">
                        <span class="fas fa-file-alt"></span>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
  
  
  
        </div>
  
        <div role="tabpanel" class="tab-pane fade" id="anexos">  
  
          <div class="div-title-abas display-flex">
            <label class="title-abas">Anexos Associados ao Processo</label>
            <span class="btn" title="Adicionar Anexo"><i class="fas fa-plus"></i></span>
          </div>
  
  
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
              <thead>
                <tr>
                  <th width="20px">#</th>
                  <th>Descrição</th>
                  <th width="40px">Colaborador</th>
                  <th width="40px">Data registo</th>
                  <th width="30px">Acções</th>
                </tr>
              </thead>
              <!-- <output of="dataSource"> -->
              <tbody (forEach)="anexos">
                <tr each="item">
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.colaborador}</td>
                  <td>{item.created_at}</td>
                  <td class="center">
                    <div style="display: flex; gap: 20px; justify-content: center;">
                      <a title="Baixar o Anexo" style="cursor: pointer" (click)="downalodAnexoProcesso('{item.id}')">
                        <span class="fas fa-file-download"></span>
                      </a>                     
                      <a title="Ver o Anexo" style="cursor: pointer" (click)="visualizarAnexoProcesso('{item.id}')">
                        <span class="fas fa-eye"></span>
                      </a>
                      <a title="Remover o Anexo" style="cursor: pointer; color: red;" (click)="deleteAnexoProcesso('{item.id}')">
                        <span class="fas fa-trash"></span>
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
  
        </div>
  
  
  
      </div>
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

  async onRender() {
    this.stRunOnFirstLoad(() => {
      $(".js-basic-example").DataTable({
        responsive: true,
      });
    });

    /** For Test purpose only */
    await this.stLazyExecution(async () => { });
  }

  stAfterInit(val) {
    console.log("val >>> ", val);

    const routeData = Router.data("ProcessoDetalhes");

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/processo/${routeData}`
    ).then((r) => {
      if (r.status === 200) {
        console.log(
          ">>>>>><<<<<<<<<<<<<<<< ::::: <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>   ",
          r.data[0]
        );
        try {
          this.populateAttributes(r.data[0]);
        } catch (e) {
          console.log("fn populates attributes", e);
        }
      }
    });
  }

  populateAttributes(data) {
    this.id = data.id ? data.id : "N/A";
    this.estado = data.estado ? data.estado : "N/A";
    this.referencia = data.ref ? data.ref : "N/A";
    this.assunto = data.assunto ? data.assunto : "N/A";
    this.area = data.area ? data.area : "N/A";
    this.fase = data.fase ? data.fase : "N/A";
    this.instituicaoId = data.instituicao_id ? data.instituicao_id : "";
    this.modoFacturacaoId = data.modo_facturacao_id
      ? data.modo_facturacao_id
      : "";
    this.clienteId = data.cliente_id ? data.cliente_id : "";
    this.gestorId = data.gestor_id ? data.gestor_id : "N/A";
    this.contraParte = data.contra_parte ? data.contra_parte : "N/A";
    this.dataRegisto = data.data_registo ? data.data_registo : "";
    this.dataSuspensao = data.data_suspensao ? data.data_suspensao : "";
    this.dataEncerramento = data.data_encerramento
      ? data.data_encerramento
      : "";

    this.metodologia = data.metodologia ? data.metodologia : "N/A";
    this.estrategia = data.estrategia ? data.estrategia : "N/A";
    this.factos = data.factos ? data.factos : "N/A";
    this.objectivos = data.objectivos ? data.objectivos : "N/A";
    this.dadosImportantes = data.dados_importantes
      ? data.dados_importantes
      : "N/A";
    this.statusId = data.status_id ? data.status_id : "N/A";

    this.createdAt = data.created_at ? data.created_at : "";
    this.updatedAt = data.updated_at ? data.updated_at : "";

    this.instituicao = data.instituicao ? data.instituicao : "N/A";
    this.modo_facturacao = data.modo_facturacao ? data.modo_facturacao : "N/A";
    this.cliente = data.cliente ? data.cliente : "N/A";
    this.tipoCliente = data.tipo_cliente ? data.tipo_cliente : "N/A";
    this.gestor = data.gestor ? data.gestor : "N/A";

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

    console.log("here...")
    console.log(this.assunto)

  }

  editResourcesProcesso(inputId) {
    console.log("editResourcesProcesso >>> ", inputId)
  }

  setValueById(id, value) {
    document.getElementById(id).value = value
  }

  getValueById(id) {
    return document.getElementById(id).value
  }


  /** Function Save */

  addTarefaProcesso() {

    const tarefa = this.getValueById('input_form_tarefa')

    const payload = {
        "processo_id": this.id,
        "tarefa": [tarefa]
    }

    return 0; 

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
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }



}
