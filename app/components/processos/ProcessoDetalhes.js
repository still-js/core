class ProcessoDetalhes extends ViewComponent {
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
    dataImportantes;
    statusId;
    precedentes;
    equipas;
    tarefas;

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
                <input (value)="estado" style="border: none; 
                                          font-size: 25px;
                                          font-weight: 600;" readonly="true" />
                <button title="Editar Processo"
                  class="btn btn-default btn-circle waves-effect waves-circle waves-float"><i style="color: #fff"
                    class="fas fa-edit"></i></button>
              </div>
              <div style="border-bottom: 2px solid #f5f5f5;"></div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Referêcia do Processo</div>
                <div><input (value)="referencia" style="border: none; background-color: #d3d3d3;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Assunto</div>
                <div><input (value)="assunto" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Área</div>
                <div><input (value)="area" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Fase</div>
                <div><input (value)="fase" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Instituição</div>
                <div><input (value)="instituicao" style="border: none; background-color: #f5f5f5;" readonly="true" />
                </div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Modo de Facturação</div>
                <div><input (value)="modo_facturacao" style="border: none; background-color: #f5f5f5;" readonly="true" />
                </div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Cliente</div>
                <div><input (value)="cliente" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Gestor do Processo</div>
                <div><input (value)="gestor" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
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
                            <h4 class="panel-title">
                              <a role="button" data-toggle="collapse" data-parent="#accordion_5" href="#collapseOne_5"
                                aria-expanded="true" aria-controls="collapseOne_5">
                                Metodologias
                              </a>
                            </h4>
                          </div>
                          <div id="collapseOne_5" class="panel-collapse collapse in show" role="tabpanel"
                            aria-labelledby="headingOne_5">
                            <div class="panel-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod high life
                              accusamus terry richardson ad squid. 3 wolf moon officia aute,
                              non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                              laborum
                              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                              squid
                              single-origin coffee nulla assumenda shoreditch et. Nihil anim
                              keffiyeh
                              helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                              proident.
                              Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                              farm-to-table,
                              raw denim aesthetic synth nesciunt you probably haven't heard of
                              them
                              accusamus labore sustainable VHS.
                            </div>
                          </div>
                        </div>
                        <div class="panel panel-primary">
                          <div class="panel-heading" role="tab" id="headingTwo_5">
                            <h4 class="panel-title">
                              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                                href="#collapseTwo_5" aria-expanded="false" aria-controls="collapseTwo_5">
                                Estrategias
                              </a>
                            </h4>
                          </div>
                          <div id="collapseTwo_5" class="panel-collapse collapse" role="tabpanel"
                            aria-labelledby="headingTwo_5">
                            <div class="panel-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod high life
                              accusamus terry richardson ad squid. 3 wolf moon officia aute,
                              non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                              laborum
                              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                              squid
                              single-origin coffee nulla assumenda shoreditch et. Nihil anim
                              keffiyeh
                              helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                              proident.
                              Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                              farm-to-table,
                              raw denim aesthetic synth nesciunt you probably haven't heard of
                              them
                              accusamus labore sustainable VHS.
                            </div>
                          </div>
                        </div>
                        <div class="panel panel-primary">
                          <div class="panel-heading" role="tab" id="headingThree_5">
                            <h4 class="panel-title">
                              <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                                href="#collapseThree_5" aria-expanded="false" aria-controls="collapseThree_5">
                                Objectivos
                              </a>
                            </h4>
                          </div>
                          <div id="collapseThree_5" class="panel-collapse collapse" role="tabpanel"
                            aria-labelledby="headingThree_5">
                            <div class="panel-body">
                              Anim pariatur cliche reprehenderit, enim eiusmod high life
                              accusamus terry richardson ad squid. 3 wolf moon officia aute,
                              non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                              laborum
                              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                              squid
                              single-origin coffee nulla assumenda shoreditch et. Nihil anim
                              keffiyeh
                              helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                              proident.
                              Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                              farm-to-table,
                              raw denim aesthetic synth nesciunt you probably haven't heard of
                              them
                              accusamus labore sustainable VHS.
                            </div>
                          </div>
                        </div>


                        <div class="panel panel-primary">
                        <div class="panel-heading" role="tab" id="headingThree_6">
                          <h4 class="panel-title">
                            <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                              href="#collapseThree_6" aria-expanded="false" aria-controls="collapseThree_6">
                              Factos
                            </a>
                          </h4>
                        </div>
                        <div id="collapseThree_6" class="panel-collapse collapse" role="tabpanel"
                          aria-labelledby="headingThree_6">
                          <div class="panel-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life
                            accusamus terry richardson ad squid. 3 wolf moon officia aute,
                            non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                            laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                            squid
                            single-origin coffee nulla assumenda shoreditch et. Nihil anim
                            keffiyeh
                            helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                            proident.
                            Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                            farm-to-table,
                            raw denim aesthetic synth nesciunt you probably haven't heard of
                            them
                            accusamus labore sustainable VHS.
                          </div>
                        </div>
                      </div>


                      <div class="panel panel-primary">
                      <div class="panel-heading" role="tab" id="headingThree_7">
                        <h4 class="panel-title">
                          <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion_5"
                            href="#collapseThree_7" aria-expanded="false" aria-controls="collapseThree_7">
                            Dados Importantes
                          </a>
                        </h4>
                      </div>
                      <div id="collapseThree_7" class="panel-collapse collapse" role="tabpanel"
                        aria-labelledby="headingThree_7">
                        <div class="panel-body">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life
                          accusamus terry richardson ad squid. 3 wolf moon officia aute,
                          non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
                          laborum
                          eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
                          squid
                          single-origin coffee nulla assumenda shoreditch et. Nihil anim
                          keffiyeh
                          helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                          proident.
                          Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                          farm-to-table,
                          raw denim aesthetic synth nesciunt you probably haven't heard of
                          them
                          accusamus labore sustainable VHS.
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
            <button class="btn" title="Adicionar"><i class="fas fa-plus"></i></button>
          </div>
  
  
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
              <thead>
                <tr>
                  <th width="100px">#</th>
                  <th>Tarefa</th>
                  <th>Estado</th>
                  <th>Acções</th>
                </tr>
              </thead>
              <!-- <output of="dataSource"> -->
              <tbody (forEach)="tarefas">
                <tr each="item">
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.status}</td>
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
            <button class="btn" title="Adicionar"><i class="fas fa-plus"></i></button>
          </div>
  
  
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
              <thead>
                <tr>
                  <th width="20px">#</th>
                  <th>Tarefa</th>
                  <th width="40px">Estado</th>
                  <th width="30px">Acções</th>
                </tr>
              </thead>
              <!-- <output of="dataSource"> -->
              <tbody (forEach)="tarefas">
                <tr each="item">
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td>{item.status}</td>
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
        this.dataImportantes = data.dados_importantes
            ? data.dados_importantes
            : "N/A";
        this.statusId = data.status_id ? data.status_id : "N/A";

        this.createdAt = data.created_at ? data.created_at : "";
        this.updatedAt = data.updated_at ? data.updated_at : "";

        this.instituicao = data.instituicao ? data.instituicao : "N/A";
        this.modo_facturacao = data.modo_facturacao ? data.modo_facturacao : "N/A";
        this.cliente = data.cliente ? data.cliente : "";
        this.tipoCliente = data.tipo_cliente ? data.tipo_cliente : "N/A";
        this.gestor = data.gestor ? data.gestor : "N/A";

        this.precedentes = data.precedentes ? data.precedentes : [];
        this.equipas = data.equipas ? data.equipas : [];
        this.tarefas = data.tarefas ? data.tarefas : [];

        console.log("here...")
        console.log( this.assunto)
    }
}
