class ProcessosGrid extends ViewComponent {
  dataSource;

  template = `
    <section class="content">
        <div class="block-header">
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div class="title-grid-component">
                    <span class="fas fa-folder title-grid-component-icon"></span>    
                        <h3>Lista dos Processos</h3>
                    <span class="title-grid-component-description">Navega pela lista ou cria um novo</span>
                </div>
            </div>
        </div>
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div>
                    <button (click)="gotoView('ProcessoForm')" type="button" class="btn btn-primary m-t-15 waves-effect">Novo</button>
                </div>
                <div class="card">
                    <div class="header" 
                        style="display: flex;
                        justify-content: space-between;
                    ">
                        <h2>
                            <strong>Colaboradores</strong> registados
                        </h2>
                        <div style="cursor: pointer">
                            <span class="far fa-file-pdf"></span>                        
                        </div>
                    </div>
                    <div class="body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-hover js-basic-example dataTable">
                                <thead>
                                    <tr>
                                        <th width="100px">Estado</th>
                                        <th>Referência</th>
                                        <th>Assunto</th>
                                        <th>Área</th>
                                        <th>Fase</th>
                                        <th>Instituição</th>
                                        <th>Modo Facturação</th>
                                        <th>Gestor</th>
                                        <th>Data Emissão</th>
                                        <th>Acções</th>
                                    </tr>
                                </thead>
                                <!-- <output of="dataSource"> -->
                                <tbody (forEach)="dataSource">
                                    <tr each="item">
                                        <td>{item.estado}</td>
                                        <td>{item.ref}</td>
                                        <td>{item.assunto}</td>
                                        <td>{item.area}</td>
                                        <td>{item.fase}</td>
                                        <td>{item.instituicao}</td>
                                        <td>{item.modo_facturacao}</td>
                                        <td>{item.gestor}</td>
                                        <td>{item.data_registo}</td>
                                        <td class="center" >
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
    /**
     * Isso quer dizer que o import do JQuery foi feito no index principal
     * ou no ficheiro de rotas em eagerImport
     */
    this.stRunOnFirstLoad(() => {
      $(".js-basic-example").DataTable({
        responsive: true,
      });
    });

    /** For Test purpose only */
    await this.stLazyExecution(async () => {});
  }

  stAfterInit(val) {
    $still.HTTPClient.get("http://localhost:3000/api/v1/processo/").then(
      (r) => {
        if (r.data) {
          console.log(r);
          this.dataSource = r.data
          // this.makeColaboradorDTO(r.data);
        }
      }
      );
    }
    
  /*
  editClient(nif) {
    console.log(`Clicked client is: `, nif);

    const result = this.dataSource.value.filter((r) => r.nif == nif);
    Router.goto("ClientForm", {
      data: result[0],
    });
  }

  makeColaboradorDTO(data) {
    let initialObjectColaborador = {
      idColaborador: null,
      nomeCompleto: null,
      nomeProfissional: null,
      funcao: null,
      dataNascimento: null,
      status: null,
      createdAt: null,
      tipoColaborador: null,
      identificacoes: [
        {
          code: null,
          descricao: null,
        },
      ],
      contactos: [
        {
          tipo: null,
          descricao: null,
        },
      ],
    };

    // this.dataSource = r.data;
    let colaboradorData = [];

    for (let colaborador of data) {
      colaboradorData.push({
        ...initialObjectColaborador,
        idColaborador: colaborador.id,
        nomeCompleto: colaborador.nome_completo,
        nomeProfissional: colaborador.nome_profissional,
        funcao: colaborador.funcao,
        dataNascimento: colaborador.data_nascimento,
        status: colaborador.status,
        createdAt: colaborador.created_at,
        tipoColaborador: colaborador.tipo.description,
        identificacoes: colaborador.identificacoes.map((item) => ({
          code: item.tipo.code,
          descricao: item.tipo.description,
        })),
        contactos: colaborador.contactos.map((item) => ({
          tipo: item.type,
          descricao: item.descricao,
        })),
      });
    }

    this.dataSource = colaboradorData;
    console.log(colaboradorData);
  }
  */

  /** For Test purpose only */
  /** @type { StEvent } */
  anyState = "This is the state value";
  runLocalFunc() {
    alert("Alert from the components itself" + this.anyState);
  }
}
