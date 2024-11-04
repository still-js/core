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

  userLoggedIn;

  template = `<section class="content">
    <div class="block-header">

      <div class="row">
        <br />
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
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
            <li class="breadcrumb-item active">TimeSheet do Processo</li>
          </ul>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <h2>Registo das Actividades</h2>
          <p style="font-size: 12px">Registo das intervenções no Processo</p>
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

        <div class="card">
        <div class="body">
          <div id="mail-nav" style="background-color: #fafafa,">

            <div style="margin-bottom: 5px">
              <div style="font-weight: bold;">Colaborador</div>
              <div>
                <span id="colaboradorInputId"></span>
                <p style="font-size: 12px" id="colaboradorInputFuncao"></p>
              </div>
            </div>

            <div style="margin-bottom: 5px">
              <div style="font-weight: bold;">Total de Horas</div>
              <div>
               <i class="fas fa-clock"></i> <span id="horasInputId"> 0 </span> horas
              </div>
            </div>

            </div>

        </div>
      </div>

      </div>
         
      <div class="">
      <div style="background: #fff;
                  padding: 15px;
                  margin-left: 10px;
                  display: flex;
                  flex-direction: column;
                  min-width: 750px;
                  width: 1050px;
                  color: #555;
                  font-size: 14px
                  border: 1px solid #fafafa
                  ;
      ">
            <div style="positon: relative">
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

  populateCalendarDTO(data) {

    let totalHours = 0;
    // horasInputId

    if (data) {
      this.calendarProxy.addNewEvents(
        data.map((item) => {
          console.log(item);
          totalHours += parseFloat(item.horas)
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
    document.getElementById('horasInputId').innerHTML = totalHours;
  }

  stAfterInit(val) {

    this.userLoggedIn = JSON.parse(localStorage.getItem("_user"));

    console.log(this.userLoggedIn);

    document.getElementById('colaboradorInputId').innerHTML = this.userLoggedIn.value.nome_completo;
    document.getElementById('colaboradorInputFuncao').innerHTML = this.userLoggedIn.value.tipo.description;

    const routeData = Router.data("ProcessoTimeSheet");
    this.processoId = routeData

    $still.HTTPClient.get(
      `http://localhost:3000/api/v1/processo_time_sheets/${routeData}/${this.userLoggedIn.value.id}`
    ).then((r) => {
      if (r.status === 200) {
        try {
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

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>   ", this.userLoggedIn.value.id)

    if(this.userLoggedIn.value.id === "")
        alert("Nenhum Colaborador definido.")

    let horasCalculadas = (data.end.d.d - data.start.d.d) / 3600000

    let payload = {
      tipoEventoId: data.calendarId = 'entrevista' ? 1 : 2,
      processoId: parseInt(this.processoId.value),
      descricao: data.title,
      dadosImportantes: JSON.stringify(data),
      dataInicio: data.start.d.d,
      dataFim: data.end.d.d,
      horas: horasCalculadas.toFixed(2),
      colaboradorId: this.userLoggedIn.value.id
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

  async updateEvent(evt, data) {

    console.log("<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>    ",  evt)

    console.log("update >>>>>>>>>>> ", data)

    if(this.userLoggedIn.value.id === "")
        alert("Nenhum Colaborador definido.")

    /*

    let horasCalculadas = (data.end.d.d - data.start.d.d) / 3600000

    let payload = {
      tipoEventoId: data.calendarId = 'entrevista' ? 1 : 2,
      // processoId: parseInt(this.processoId.value),
      descricao: data.title,
      dadosImportantes: JSON.stringify(data),
      dataInicio: data.start.d.d,
      dataFim: data.end.d.d,
      horas: horasCalculadas.toFixed(2),
      // colaboradorId: this.userLoggedIn.value.id
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


    */

    /**
     * Pôr a regra de negócio e a chamada a BD,
     * retornar true apenas se for salvo com sucess
     * caso contrário retornar false
     */
    alert("Event update called from parent");
    return false;

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
  
}
