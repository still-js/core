class ProcessoDetalhes extends ViewComponent {
  dataSource;

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

  tarefaInput;
  precedenteInput;
  equipaInput;
  clienteInput;

  listColaboradores;
  listPrecedentes;
  listEquipas;
  listClientes;

  listEstado = [
      {
          id: 1,
          descricao: "Rascunho",
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
      {
          id: 2,
          descricao: "Proposta",
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
      {
          id: 3,
          descricao: "Suspenso",
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
      {
          id: 4,
          descricao: "Encerrado",
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
  ];

  listModoFacturacao = [
      {
          id: 1,
          descricao: "Avença",
          obesevacao: null,
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
      {
          id: 2,
          descricao: "Taxa horária",
          obesevacao: null,
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
      {
          id: 3,
          descricao: "Valor Fixo",
          obesevacao: null,
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
      {
          id: 4,
          descricao: "Sucess fee",
          obesevacao: null,
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
      {
          id: 5,
          descricao: "pro bono",
          obesevacao: null,
          created_at: "2024-10-06 21:30:34",
          updated_at: "2024-10-06 21:30:34",
      },
  ];

  listInstituicao = [
      {
          id: 1,
          descricao: "SIC",
      },
      {
          id: 2,
          descricao: "PGR",
      },
      {
          id: 3,
          descricao: "Tribunal Comarca",
      },
      {
          id: 4,
          descricao: "Tribunal Relação",
      },
      {
          id: 5,
          descricao: "Tribunal Supremo",
      },
      {
          id: 6,
          descricao: "Tribunal Constitucional",
      },
      {
          id: 7,
          descricao: "Tribunal de Contas",
      },
      {
          id: 8,
          descricao: "Tribunal Militar",
      },
      {
          id: 9,
          descricao: "Outro",
      },
  ];


  template = `
    <section class="content">
        <div class="block-header">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 100px; margin-top: 30px">
                    <h1>Detalhes do Processo</h1>
                    <h3 class="title-grid-component-description">Navega pela lista ou cria um novo</h3>
                </div>
            </div>
          </div>
         
          <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <div class="card">
                  <div class="body">
                      <div id="mail-nav">
                          <button type="button" class="btn btn-success waves-effect m-b-15">RASCUNHO</button>

                          <div style="margin-bottom: 5px">
                            <div style="font-weight: bold;">Assunto</div>
                            <div>{this.dataSource.estado}</div>
                          </div>

                          <div style="margin-bottom: 5px">
                            <div style="font-weight: bold;">Assunto</div>
                            <div>Assunto text</div>
                          </div>

                          <div style="margin-bottom: 5px">
                            <div style="font-weight: bold;">Assunto</div>
                            <div>Assunto text</div>
                          </div>

                          <div style="margin-bottom: 5px">
                            <div style="font-weight: bold;">Assunto</div>
                            <div>Assunto text</div>
                          </div>

                          <h6 class="b-b p-10 text-strong">Gestor do Processo</h6>
                          <ul class="" id="mail-labels">
                            <li>
                              <a href="javascript:;">
                              <i class="material-icons col-orange" title="Away">Jorge</i>Askay</a>
                            </li>
                          </ul>
                          <h6 class="b-b p-10 text-strong">Cliente do Processo</h6>
                          <ul class="" id="mail-labels">
                            <li>
                              <a href="javascript:;">
                              <i class="material-icons col-orange" title="Away">Anselmo</i>Askay</a>
                            </li>
                          </ul>
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
                                  <h2 class="mb-5">Features metodologias </h2>
                                  <dl class="row mb-5">
                                      <dt class="col-sm-3">Brand</dt>
                                      <dd class="col-sm-9">XYZ</dd>
                                      <dt class="col-sm-3">Dimensions</dt>
                                      <dd class="col-sm-9">H 32 x W 18 x D 19; Seating Height-18</dd>
                                      <dt class="col-sm-3">Weight</dt>
                                      <dd class="col-sm-9">5 Kgs </dd>
                                      <dt class="col-sm-3">Warranty</dt>
                                      <dd class="col-sm-9">24 Months' Warranty</dd>
                                      <dt class="col-sm-3">Material</dt>
                                      <dd class="col-sm-9">Metal</dd>
                                      <dt class="col-sm-3">Height</dt>
                                      <dd class="col-sm-9">32.0 inches</dd>
                                      <dt class="col-sm-3">Width</dt>
                                      <dd class="col-sm-9">18.0 inches</dd>
                                      <dt class="col-sm-3">Depth</dt>
                                      <dd class="col-sm-9">19.0 inches</dd>
                                  </dl>
                              </div>
                          </div>
                          <div role="tabpanel" class="tab-pane fade" id="equipas">
                              <div class="product-description">
                                  <h2 class="mb-5">Description equipas </h2>
                                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                                      elit. Odit
                                      nemo reiciendis quisquam a quis delectus
                                      consectetur ipsa
                                      eligendi aliquam earum in vitae voluptate ratione
                                      fugiat
                                      similique nostrum debitis dolor, ipsam quo officiis
                                      quas
                                      necessitatibus? Magnam eveniet iure, eligendi est
                                      ullam
                                      consectetur repellat quis doloremque ad
                                      perspiciatis assumenda
                                      ducimus distinctio quaerat sit repudiandae illo
                                      praesentium
                                      modi dolor. Veritatis aperiam, minima natus
                                      assumenda
                                      ipsum voluptatem reprehenderit? Possimus nobis,
                                      voluptate,
                                      blanditiis, temporibus ad nostrum corrupti quos
                                      corporis
                                      voluptas tempora aliquid magnam quia voluptatem
                                      rerum odit
                                      fugiat facere necessitatibus adipisci sunt.
                                      Veritatis
                                      architecto,
                                      perferendis labore sit nobis eaque perspiciatis et
                                      iusto, in
                                      doloribus est!</p>
                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing
                                      elit. Natus
                                      vel reiciendis voluptatibus assumenda tempora vitae
                                      aut
                                      adipisci harum, corporis in id perferendis quia
                                      repellat
                                      reprehenderit temporibus aspernatur ab ullam magni
                                      error
                                      consectetur, facilis inventore ipsum, veniam
                                      voluptas. Error
                                      laboriosam atque quisquam facere esse repellat
                                      consectetur quos
                                      eum, quaerat blanditiis saepe?</p>
                              </div>
                          </div>
                          <div role="tabpanel" class="tab-pane fade" id="tarefas">
                              <b>Questions and Answers tarefas </b>
                              <div class="product-faq mb-5">
                                  <p class="text-muted">What information do you need?</p>
                              </div>
                              <div class="product-comments">
                                  <h5 class="mb-2">Or ask to David's Store</h5>
                                  <form class="form-inline mb-5">
                                      <textarea cols="50" rows="2" class="form-control mr-4" placeholder="write a question"></textarea><button
                                          class="btn btn-lg btn-primary">Ask</button>
                                  </form>
                                  <h5 class="mb-5">Lastest Questions</h5>
                                  <ol class="list-unstyled last-questions-list">
                                      <li><i class="fa fa-comment"></i> <span>Hello
                                              david, can i pay
                                              with credit card?</span></li>
                                      <li><i class="fa fa-comment"></i> <span>can i send
                                              it to
                                              another address?</span></li>
                                  </ol>
                              </div>
                          </div>

                          <div role="tabpanel" class="tab-pane fade" id="precedentes">
                              <b>Questions and Answers precedentes</b>
                              <div class="product-faq mb-5">
                                  <p class="text-muted">What information do you need?</p>
                              </div>
                              <div class="product-comments">
                                  <h5 class="mb-2">Or ask to David's Store</h5>
                                  <form class="form-inline mb-5">
                                      <textarea cols="50" rows="2" class="form-control mr-4" placeholder="write a question"></textarea><button
                                          class="btn btn-lg btn-primary">Ask</button>
                                  </form>
                                  <h5 class="mb-5">Lastest Questions</h5>
                                  <ol class="list-unstyled last-questions-list">
                                      <li><i class="fa fa-comment"></i> <span>Hello
                                              david, can i pay
                                              with credit card?</span></li>
                                      <li><i class="fa fa-comment"></i> <span>can i send
                                              it to
                                              another address?</span></li>
                                  </ol>
                              </div>
                          </div>

                          <div role="tabpanel" class="tab-pane fade" id="anexos">
                              <b>Questions and Answers anexos</b>
                              <div class="product-faq mb-5">
                                  <p class="text-muted">What information do you need?</p>
                              </div>
                              <div class="product-comments">
                                  <h5 class="mb-2">Or ask to David's Store</h5>
                                  <form class="form-inline mb-5">
                                      <textarea cols="50" rows="2" class="form-control mr-4" placeholder="write a question"></textarea><button
                                          class="btn btn-lg btn-primary">Ask</button>
                                  </form>
                                  <h5 class="mb-5">Lastest Questions</h5>
                                  <ol class="list-unstyled last-questions-list">
                                      <li><i class="fa fa-comment"></i> <span>Hello
                                              david, can i pay
                                              with credit card?</span></li>
                                      <li><i class="fa fa-comment"></i> <span>can i send
                                              it to
                                              another address?</span></li>
                                  </ol>
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
    await this.stLazyExecution(async () => {});
  }

  stAfterInit(val) {

    console.log("val >>>> ", val)

    const routeData = Router.data('ProcessoDetalhes');
    
    console.log(">>>>> routeData >>>> ", routeData)
    
    $still.HTTPClient.get(`http://localhost:3000/api/v1/processo/${routeData}`).then(
      (r) => {
        if (r.status === 200) {
          console.log(">>>>>><<<<<<<<<<<<<<<< ::::: <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>   ", r.data[0]);
          this.dataSource = r.data[0];
          // this.makeColaboradorDTO(r.data);
        }
      }
    );
  }

  /** For Test purpose only */
  /** @type { StEvent } */
  anyState = "This is the state value";
  runLocalFunc() {
    alert("Alert from the components itself" + this.anyState);
  }
}
