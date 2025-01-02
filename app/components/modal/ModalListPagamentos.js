    class ModalListPagamentos extends ViewComponent {

        idFactura;
        estado;
        ref;
        horas;
        custo;
        dataRegisto;

        listPagamentos;
           
        
       /** @type { STForm } */
        paymentForm;
    
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
                <h3 style="color: #fff">Detalhes pagamentos da Factura</h3>
            </div>
            <fieldset>  

            <table>
            <thead>
                <tr>
                    <th>Referência</th>
                    <th>Horas</th>
                    <th>Custo</th>
                    <th>Data registo</th>
                </tr>
            </thead>
            <tbody>
                <tr style="text-align: center">
                    <td class="invoice-item-description">
                        <input id="input_referencia" (value)="ref" style="border: none; background-color: #d3d3d3;" readonly="true" />
                    </td>
                    <td class="invoice-align-to-center">
                        <input id="input_referencia" (value)="horas" style="border: none; background-color: #d3d3d3;" readonly="true" />
                    </td>
                    <td class="invoice-align-to-center">
                        <input id="input_referencia" (value)="custo" style="border: none; background-color: #d3d3d3;" readonly="true" />
                    </td>
                    <td class="invoice-align-to-center">
                        <input id="input_referencia" (value)="dataRegisto" style="border: none; background-color: #d3d3d3;" readonly="true" />
                    </td>
                </tr>
            </tbody>
        </table>

        <div style="margin-bottom: 10px">

        <h4>Lista dos Pagamentos</h4>
        <div class="modal-list-pagamentos">
        <table>
        <thead>
            <tr>
                <th>Id registo</th>
                <th>valor Pago</th>
                <th>Modo Pagamento</th>
                <th>Colaborador</th>
                <th>Data registo</th>
            </tr>
        </thead>
        <tbody (forEach)="listPagamentos">
            <tr each="item">
                <td class="invoice-item-description">{item.id}</td>
                <td class="invoice-align-to-center">{item.valor_pago}</td>
                <td class="invoice-align-to-center">{item.modo_pagamento}</td>
                <td class="invoice-align-to-center">{item.colaborador}</td>
                <td class="invoice-align-to-center">{item.created_at}</td>
            </tr>
        </tbody>
    </table> 
       
        </div>

        </div>

       
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

            .modal-list-pagamentos {
                margin-top: 15px;
                background-color: #f5f5f5;
                padding: 15px;
                height: 300px;
                overflow-y: scroll;
                margin-bottom: 30px;
                border: 1px solid #c3c3c3;}
    
        </style>
        `;
    
        onRender(){}
    
        stAfterInit(val) {}
    
        closeModal() {
            this.onCloseModal();
        }
    
        /**
         * Assinatura para o componente pai
         */
        onCloseModal() { }
    
    }
