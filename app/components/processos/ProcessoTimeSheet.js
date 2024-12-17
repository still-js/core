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
                  font-size: 14px;
                  border: 1px solid #e1e0e0;
            ">
            <div style="positon: relative">
            <st-element
              component="TUICalendarComponent"
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

  async init() {

    this.userLoggedIn
    this.processoId

    $still.HTTPClient.get(
      `/api/v1/processo_time_sheets/${this.processoId.value}/${this.userLoggedIn.value.id}`
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
      `/api/v1/processo/${this.processoId.value}`
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

  stAfterInit(val) {

    try {

      this.userLoggedIn = JSON.parse(localStorage.getItem("_user"));
      console.log(this.userLoggedIn);

      document.getElementById('colaboradorInputId').innerHTML = this.userLoggedIn.value.nome_completo;
      document.getElementById('colaboradorInputFuncao').innerHTML = this.userLoggedIn.value.tipo.description;

      const routeData = Router.data("ProcessoTimeSheet");
      this.processoId = routeData

      this.init()
    } catch (e) {
      console.log("fn populates attributes", e);
    }


  }

  populateAttributes(data) {
    try {
      this.referencia = data.ref
        ? data.ref
        : "";
      this.assunto = data.assunto ? data.assunto : "";
      this.cliente = data.cliente ? data.cliente : "";
      this.tipoCliente = data.tipo_cliente ? data.tipo_cliente : "";
      this.gestor = data.colaborador ? data.colaborador : "";
      this.modo_facturacao = data.modo_facturacao
        ? data.modo_facturacao
        : "";

      /** details */
      this.setValueById("input_referencia", this.referencia.value);
      this.setValueById("input_assunto", this.assunto.value);
      this.setValueById("input_modo_facturacao", this.modo_facturacao.value);
      this.setValueById("input_cliente", this.cliente.value);
      this.setValueById("input_gestor", this.gestor.value);
    } catch (e) {
      console.log(e);
    }
  }

  async saveEvent(data) {

    if (this.userLoggedIn.value.id === "")
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
      "/api/v1/processo_time_sheets",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      return false
    } else {

      const eventData = {
        ...data,
        start: data.start.d.d,
        end: data.end.d.d,
      };

      this.calendarProxy.addNewEvents(eventData);
      //this.init()
      this.updateHorasColaborador(true, horasCalculadas)
      return true
    }

  }

  updateHorasColaborador(isPlus, time) {

    let currentTime = eval(document.getElementById('horasInputId').innerHTML)
    let calculateTime = isPlus ? currentTime + time : currentTime - time
    document.getElementById('horasInputId').innerHTML = calculateTime

  }

  async updateEvent(evt, changes) {

    if (!changes)
      return true;

    if (evt.id === "")
      alert("Evento sem ID")

    let startDate = changes.start ? changes.start.d.d : evt.start.d.d
    let endDate = changes.end ? changes.end.d.d : evt.end.d.d
    let tipoEventoId = changes.calendarId ? changes.calendarId : evt.calendarId
    let horasCalculadas = (endDate - startDate) / 3600000
    let horasCalculadasEvt = (evt.end.d.d - evt.start.d.d) / 3600000

    let isChanged = false
    let isPlus = false
    let horasPlus = 0

    if (horasCalculadas == horasCalculadasEvt) {
      isChanged = false
    }

    if (horasCalculadas > horasCalculadasEvt) {
      isChanged = true
      isPlus = true
      horasPlus = horasCalculadas - horasCalculadasEvt
    }

    if (horasCalculadas < horasCalculadasEvt) {
      isChanged = true
      isPlus = false
      horasPlus = horasCalculadasEvt - horasCalculadas
    }

    let payload = {
      tipoEventoId: tipoEventoId = 'entrevista' ? 1 : 2,
      descricao: changes.title ?? evt.descricao,
      dadosImportantes: JSON.stringify(evt, changes),
      dataInicio: startDate,
      dataFim: endDate,
      horas: horasCalculadas.toFixed(2),
    };

    let response = await $still.HTTPClient.put(
      `/api/v1/processo_time_sheets/${evt.id}`,
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    console.log("save response", response);

    if (response.status !== 200) {
      console.log(response.errors);
      return false
    } else {
      console.log("Alterações feita com sucesso");
      //this.calendarProxy.clearGrid()
      //this.init()
      if (isChanged)
        this.updateHorasColaborador(isPlus, horasPlus)
      return true
    }

  }

  async deleteEvent(evt) {

    if (evt.id === undefined) return false;

    let startDate = evt.start.d.d
    let endDate = evt.end.d.d
    let horasCalculadas = (endDate - startDate) / 3600000

    let response = await $still.HTTPClient.delete(
      `/api/v1/processo_time_sheets/${evt.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (response.status !== 200) {
      console.log(response.errors);
      return false
    } else {
      console.log("Alterações feita com sucesso");
      this.updateHorasColaborador(false, horasCalculadas)
      return true
    }

  }

  setValueById(id, value) {
    console.log(id, value);
    document.getElementById(id).value = value;
  }

  getValueById(id) {
    return document.getElementById(id).value;
  }

}
