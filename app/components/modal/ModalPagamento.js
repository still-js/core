class ModalPagamento extends ViewComponent {

    ref;
    valor;
    modoPagamento;    
    modoPagamentoSelecionado;    
    valorPago;
    anexo;

    
   /** @type { STForm } */
    paymentForm;

    template = `
        <div class="julaw-card">
        
        <form id="client_wizard_with_validation" (formRef)="clientForm" onsubmit="javascript: return false;">
        <h3>Pagamento - Factura</h3>
        <fieldset>
            <div class="row clearfix">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-field col s12">
                            <span class="input-group-addon">
                                <i class="material-icons">person</i> Refência da Factura
                            </span>
                            <input 
                                class="form-control date" 
                                (value)="ref" 
                                type="text" 
                                readonly
                            >
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">money</i> Valor da Factura
                        </span>
                        <div class="form-line">
                        <input 
                            class="form-control date" 
                            (value)="valor" 
                            type="text" 
                            readonly
                        >
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row clearfix">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-field col s12">
                            <span class="input-group-addon">
                                <i class="material-icons">person</i> Modo de Pagamento
                            </span>
                            <select 
                                (required)="true"
                                (value)="modoPagamentoSelecionado"
                                (change)="updateModoPagamento($event)" 
                                (forEach)="modoPagamento">
                                <option each="item" value="">Selecione uma opção</option>
                                <option each="item" value="{item.id}">{item.descricao}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i> Valor Pago
                        </span>
                        <div class="form-line">
                            <input 
                                (required)="true"
                                (validator)="text"
                                type="numeric" 
                                class="form-control date" 
                                (value)="valorPago" 
                                placeholder="o valor pago">
                        </div>
                    </div>
                </div>

            </div>
            <div class="row clearfix">
                <div class="col-md-12">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">location_city</i> Anexo
                        </span>
                        <div class="form-line">
                            <input id="inputUploadAnexo" class="form-control" accept="image/*" type="file" />
                            <img style="display: none" id="inputUploadAnexoHidden" src="" />
                        </div>
                    </div>
                </div>
            </div>

        </fieldset>
   
        <button class="btn btn-primary julaw-submit-button" (click)="salvarPagamento()">Salvar</button>
    </form>

        </div>    
    
    <style>
        .julaw-card {
            padding: 20px;
            border: 1px solid #d3d3d3;
        }

    </style>
    `;

    onRender(){
        $still.HTTPClient.get("http://localhost:3000/api/v1/modo_pagamentos/").then(
            (r) => {
                if (r.data) {
                   this.modoPagamento = r.data
                }
            }
        );
    }

    stAfterInit(val) {
        
        document.getElementById('inputUploadAnexo').addEventListener('change', function (event) {
            const file = event.target.files[0];
      
            if (file) {
              const reader = new FileReader();
      
              reader.onload = function (e) {
                const base64String = e.target.result;
                console.log("base64 da modal ", base64String)
                this.anexo = base64String;
      
              };
              reader.readAsDataURL(file); // Converte o arquivo em base64
            }
          })
    }

    closeModal() {
        this.onCloseModal();
    }

    updateModoPagamento(evt) {

        console.log(evt)
        //this.modoPagamentoSelecionado
    }

    salvarPagamento() {
   
        console.log("payment", this.anexo)

        return 0

        /**
         * 
         * {
    "factura_id": 5,
    "colaborador_id": 1,
    "valor_factura": 20000,
    "valor_pago": 20000,
    "valor_restante": 0,
    "anexo": "anexo_01",
    "modo_pagamento_id": 1,
    "desconto": 10 , 
    "obs": "Observacao" 
}


         */

        if (isValidForm) {
            console.log("valido salvar os dados")

            return 0
            this.closeModal()
        }
    }

    /**
     * Assinatura para o componente pai
     */
    onCloseModal() { }

}