class ModalDetalhesFactura extends ViewComponent {

        idFactura;
        itensFactura;           
    
        template = `
            <div class="julaw-card">
            
            <form id="client_wizard_with_validation" (formRef)="clientForm" onsubmit="javascript: return false;">
            <div style="height: 60px;
                        background-color: #000;
                        color: #fff;
                        margin-bottom: 30px;
                        display: flex;
                        padding: 15px;"
            >
                <h3 style="color: #fff">Items da Factura</h3>
            </div>
            <fieldset>  

            <table>
            <thead>
                <tr style="text-align: center;">
                    <th>Id Registo</th>
                    <th>Horas</th>
                    <th>Custo</th>
                    <th>Data registo</th>
                </tr>
            </thead>
            <tbody (forEach)="itensFactura">
                <tr each="item" style="text-align: center">
                    <td class="">{item.id}</td>
                    <td class="">{item.horas}</td>
                    <td class="">{item.custo}</td>
                    <td class="">{item.created_at}</td>
                </tr>
            </tbody>
        </table>
                

            </fieldset>
    
            <div>
                <button class="btn btn-defult" (click)="closeModal()">Fechar</button>
            </div>
       
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
            console.log("fez o render ... ")
        }
    
        stAfterInit(val) {
            console.log("item da modal", this.items)           
        }
    
        closeModal() {
            this.onCloseModal();
        }
    
        updateModoPagamento(evt) {
    
            console.log(evt)
            //this.modoPagamentoSelecionado
        }
    
        salvarPagamento() {
       
    
        
        }
    
        /**
         * Assinatura para o componente pai
         */
        onCloseModal() { }
    
    }
