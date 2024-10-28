class ProcessoTimeSheet extends ViewComponent {

  id;
  referencia;
  assunto;

  dadosImportantes;

  modo_facturacao;
  cliente;
  tipoCliente;
  gestor;
  processoId;

  template = `<section class="content">
    <div class="block-header">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="height: 100px; margin-top: 30px">
          <h1>Registo das Actividades</h1>
          <h3 class="title-grid-component-description">Controlo do Tempo gastos no Processo</h3>
        </div>
      </div>
    </div>  
    <div class="row" style="height: 100vh;">
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <div class="card">
          <div class="body">
            <div id="mail-nav">
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Referêcia do Processo</div>
                <div><input id="input_referencia" (value)="referencia" style="border: none; background-color: #d3d3d3;" readonly="true" /></div>
              </div>
  
              <div style="margin-bottom: 5px">
                <div style="font-weight: bold;">Assunto</div>
                <div><input id="input_assunto" (value)="assunto" style="border: none; background-color: #f5f5f5;" readonly="true" /></div>
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

          <st-element
          component="TUICalendarComponent"
          proxy="timeSheet"
          (onEventCreate)="saveEvent()"
          editLabel="Editar"
          milestoneTitle="Objectivo"
          (onEventUpdate)="updateEvent()"
          (onEventDeletion)="deleteEvent()"
          proxy="calendarProxy"
          >
      </st-element> 
  
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

  populateCalendarDTO(data) {
    console.log(data);

    if (data) {
      this.calendarProxy.addNewEvents(
        data.map((item) => {
          console.log(item);
          return {
            id: item.id,
            calendarId: item.tipo_evento,
            title: item.descricao,
            start: item.data_inicio,
            end: item.data_fim,
          };
        })
      );
    }
  }

  stAfterInit(val) {
    const routeData = Router.data("ProcessoTimeSheet");
    this.processoId = routeData

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/processo_time_sheets/${routeData}`
    ).then((r) => {
      if (r.status === 200) {
        try {
         // this.populateAttributes(r.data[0]);
         console.log(r)
         console.log(r.data)
          this.populateCalendarDTO(r.data);
        } catch (e) {
          console.log("fn populates attributes", e);
        }
      }
    });

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/processo/${routeData}`
    ).then((r) => {
      if (r.status === 200) {
        try {
          this.populateAttributes(r.data[0]);
         // this.populateCalendarDTO(r.data);
        } catch (e) {
          console.log("fn populates attributes", e);
        }
      }
    });
  }

  populateAttributes(data) {
    try {
      this.referencia = data.ref
        ? data.ref
        : "N/A";
      this.assunto = data.assunto ? data.assunto : "N/A";
      this.cliente = data.cliente ? data.cliente : "N/A";
      this.tipoCliente = data.tipo_cliente ? data.tipo_cliente : "N/A";
      this.gestor = data.colaborador ? data.colaborador : "N/A";
      this.modo_facturacao = data.modo_facturacao
        ? data.modo_facturacao
        : "N/A";
      /** details */
      this.setValueById("input_referencia", this.referencia.value);
      this.setValueById("input_assunto", this.assunto.value);
      this.setValueById("input_modo_facturacao", this.modo_facturacao.value);
      this.setValueById("input_cliente", this.cliente.value);
      this.setValueById("input_gestor", this.gestor.value);
    } catch (e) {
      alert("Error: " + e.message)
    }
  }

  async saveEvent(data) {
    let horasCalculadas = (data.end.d.d - data.start.d.d) / 3600000

    //    return 0
    let payload = {
      tipoEventoId: data.calendarId = 'entrevista' ? 1 : 2,
      processoId: this.processoId.value,
      descricao: data.title,
      dadosImportantes: JSON.stringify(data),
      dataInicio: data.start.d.d,
      dataFim: data.end.d.d,
      horas: horasCalculadas.toFixed(2),
    };

    let response = await $still.HTTPClient.post(
      "http://localhost:3000/api/v1/processo_time_sheets",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    console.log("save response", response);
    if (response.status !== 201) {
      console.log(response.errors);
      return false
    } else {
      console.log("Salvo com sucesso");
      return true
    }
    
  }

  updateEvent() {
    /**
     * Pôr a regra de negócio e a chamada a BD,
     * retornar true apenas se for salvo com sucess
     * caso contrário retornar false
     */
    alert("Event update called from parent");
    return true;
  }

  deleteEvent() {
    /**
     * Pôr a regra de negócio e a chamada a BD,
     * retornar true apenas se for salvo com sucess
     * caso contrário retornar false
     */
    alert("Called Deletion event from parent");
    return true;
  }

  setValueById(id, value) {
    console.log(id, value);
    document.getElementById(id).value = value;
  }

  getValueById(id) {
    return document.getElementById(id).value;
  }

  updateEquipasProcesso(evt) {
    this.equipaInput = evt.target.value;
    console.log(" <<<<<<<<<< this.equipasProcesso  ", this.equipaInput);
  }

  updatePrecedentes(evt) {
    console.log(
      "updatePrecedentes >>>>>>>><<<< :::: :::: >>>>>>>>><<<<<< ",
      evt.target.value
    );
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
              descricao: `${colaborador.tipo.description} - ${colaborador.nome_completo}`,
            });

            if (colaborador.funcao.includes("adv")) {
              equipasData.push({
                id: colaborador.id,
                descricao: `${colaborador.tipo.description} - ${colaborador.nome_completo}`,
              });
            }
          }

          this.listEquipas = equipasData;
          this.listColaboradores = colaboradorData;

          console.log(
            "getListColaboradores - COLABORADORES >>>>>> ",
            this.listColaboradores
          );
          console.log(
            "getListColaboradores - EQUIPAS >>>>>> ",
            this.listEquipas
          );
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
          console.log("getListPrecedentes >>> ", this.listPrecedentes);
        }
      }
    );
  }

  /** Function Save */

  async addEquipaProcesso(idForm) {
    const equipa = this.equipaInput.value;

    const payload = {
      processoId: this.id.value,
      colaboradoresId: [equipa],
    };

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
          console.log(response);
          alert(response.errors);
        } else {
          alert("Salvo com sucesso");
          console.log("cadastro do colaborador ... ", response);
          this.toggleForms(idForm);
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  async addPrecedentesProcesso(idForm) {
    console.log("addPrecedentesProcesso... ", this.precedenteInput.value);

    const tarefa = this.getValueById("input_form_tarefa");
    const precedente = this.precedenteInput.value;

    const payload = {
      processoId: this.id.value,
      precedentes: [precedente],
    };

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
          console.log(response);
          alert(response.errors);
        } else {
          alert("Salvo com sucesso");
          console.log("cadastro do colaborador ... ", response);
          this.toggleForms(idForm);
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  addAnexoProcesso(idForm) {
    const payload = {
      processoId: this.id.value,
      colaboradorId: 3,
      anexos: [
        {
          descricao: this.inputAnexoDescricao.value,
          anexo: document.getElementById("inputUploadAnexoHidden").src,
        },
      ],
    };

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
          console.log(response);
          alert(response.errors);
        } else {
          alert("Salvo com sucesso");
          console.log("cadastro do colaborador ... ", response);
          this.toggleForms(idForm);
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  addTarefaProcesso(idForm) {
    const tarefa = this.getValueById("input_form_tarefa");
    let inputTarefa = document.getElementById("input_form_tarefa");

    if (inputTarefa.value.trim() === "") {
      alert("Preencha o campo da tarefa!");
      return false;
    }

    if (inputTarefa.hasAttribute("data-id")) {
      let idTarefa = inputTarefa.dataset.id;
      const payload = {
        descricao: tarefa,
      };

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
            console.log(response);
            alert(response.errors);
          } else {
            alert("Actualizado com sucesso");
            console.log("cadastro do colaborador ... ", response);
            this.toggleForms(idForm);
          }
        })
        .catch((err) => {
          console.log(`Erro ao cadastrar processo: `, err);
        });
    } else {
      const payload = {
        processoId: this.id.value,
        tarefas: [tarefa],
      };

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
            console.log(response);
            alert(response.errors);
          } else {
            alert("Salvo com sucesso");
            console.log("cadastro do colaborador ... ", response);
            this.toggleForms(idForm);
          }
        })
        .catch((err) => {
          console.log(`Erro ao cadastrar processo: `, err);
        });
    }
  }

  editProcesso(id) {
    const idProcesso = id == undefined ? this.id.value : id;
    console.log("here... ProcessoDetalhes ...", idProcesso);
    Router.goto("ProcessoForm", {
      data: idProcesso,
    });
  }

  /** toogle dos forms */
  toggleForms(id) {
    console.log(id);
    let form = document.getElementById(id);
    form.classList.toggle("showForm");
  }

  removerColaboradorProcesso(id) {
    console.log("removerColaboradorProcesso ", id);

    let payload = {
      type: "colaborador",
      valueId: id,
    };

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
        console.log("ver anexo processo response >> ", response);

        if (response.status === 200) {
          alert("Removido com Sucesso!");
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  editTarefaProcesso(id, descricao, idInput, idForm) {
    document.getElementById(idInput).value = descricao;
    document.getElementById(idInput).setAttribute("data-id", id);
    document.getElementById(idForm).classList.toggle("showForm");
  }

  removerTarefaProcesso(id) {
    console.log("removerTarefaProcesso ", id);

    let payload = {
      type: "tarefa",
      valueId: id,
    };

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
        console.log("ver anexo processo response >> ", response);

        if (response.status === 200) {
          alert("Removido com Sucesso!");
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  concluirTarefaProcesso(id) {
    console.log("concluirTarefaProcesso ", id);

    const payload = {
      status: 1,
    };

    $still.HTTPClient.put(
      `http://localhost:3000/api/v1/tarefas_processo/${id}`,
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
          console.log(response);
          alert(response.errors);
        } else {
          alert("Actualizado com sucesso a tarefa");
          console.log("cadastro do colaborador ... ", response);
          this.toggleForms(idForm);
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  removerPrecedenteProcesso(id) {
    console.log("removerPrecedenteProcesso ", id);
    let payload = {
      type: "precedente",
      valueId: id,
    };

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
        console.log("ver anexo processo response >> ", response);

        if (response.status === 200) {
          alert("Removido com Sucesso!");
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  downalodAnexoProcesso(id) {
    console.log("view_anexo_processo >>  ", id);

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/view_anexo_processo/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("ver anexo processo response >> ", response);

        if (response.status === 200) {
          let pathDownload = `http://localhost:3000/api/v1/preview_anexo`;
          const link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.href = `${pathDownload}/${response.data.fileName}`;
          link.download = "Processo Anexo"; // Define o nome do arquivo ao fazer o download
          document.body.appendChild(link);
          link.click(); // Simula o clique no link
          document.body.removeChild(link); // Remove o link após o download
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  visualizarAnexoProcesso(id) {
    console.log("visualizarAnexoProcesso ", id);

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/view_anexo_processo/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log("ver anexo processo response >> ", response);

        if (response.status === 200) {
          let pathDownload = `http://localhost:3000/api/v1/preview_anexo`;
          window.open(
            `${pathDownload}/${response.data.fileName}`,
            "_blank",
            "width=800,height=600"
          );
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }

  removerAnexoProcesso(id) {
    console.log("removerAnexoProcesso ", id);

    let payload = {
      type: "anexo",
      valueId: id,
    };

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
        console.log("ver anexo processo response >> ", response);

        if (response.status === 200) {
          alert("Removido com Sucesso!");
        }
      })
      .catch((err) => {
        console.log(`Erro ao cadastrar processo: `, err);
      });
  }
}
