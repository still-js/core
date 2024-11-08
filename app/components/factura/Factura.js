class Factura extends ViewComponent {

    itensFactura;
    template = `

    <div>

        <table>
            <tr>
                <td 
                    colspan="2" 
                    style="
                        background: black;
                        text-align: center;
                        color: white;
                        font-weight: bold;
                        border: 20px solid white;
                    ">
                    FACTURA
                    <span class="invoice-close-btn" (click)="onCloseFactura()">
                        x
                    </span>
                </td>
            </tr>
             <tr>
                <td 
                    colspan="2" 
                    style="
                        text-align: left;
                        padding-left: 25px;
                    ">
                    Julaw Soft Company
                    <br>Rua tal, numero xxx, Baiiro Taltal
                    <br>+244 000 111
                </td>
            </tr>
            <tr>
                <td
                    style="
                        text-align: left;
                        padding-left: 25px;
                        vertical-align: top;
                    ">
                    <span class="invoice-top-lbl">Cliente:</span>
                    <p>
                        <span id="nomeDocliente"></span>
                    </p>
                </td>
                <td
                    style="
                        text-align: right;
                        padding-right: 25px;
                    ">
                    <div>
                        <span class="invoice-top-lbl">Factura número: </span>
                        <span class="invoice-top-value" id="numeroDaFacturaPlace"><span>
                    </div>
                    <div>
                        <span class="invoice-top-lbl">Data: </span>
                        <span class="invoice-top-value" id="dataDaFacturaPlace"><span>
                    </div>
                    <div>
                        <span class="invoice-top-lbl">Total:</span>
                        <span class="invoice-top-value" id="totalDaFacturaPlace"><span>
                    </div>
                </td>
            </tr>
        </table>

        <table>
            <thead>
                <tr style="text-align: center;">
                    <th>Item</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody (forEach)="itensFactura">
                <tr each="item" style="text-align: center">
                    <td class="invoice-item-description">{item.name}</td>
                    <td class="invoice-align-to-center">{item.qtd}</td>
                    <td class="invoice-align-to-center">{item.custo}</td>
                    <td class="invoice-align-to-center">{item.total}</td>
                </tr>
            </tbody>
        </table>

    </div>
    
    
    <style>

        .invoice-item-description{
            width: 50%;
            padding-left: 20px;
        }

        .invoice-align-to-center{ text-align: center; }

        .invoice-top-lbl{
            font-weight: bold;
            color: black;
        }

        .invoice-top-value{
            font-weight: none;
        }

        .invoice-close-btn{
            position: absolute;
            right: 35px;
            cursor: pointer;
            font-size: 13px;
            background: white;
            color: black;
            padding: 9px;
            padding-bottom: 1px;
            padding-top: 1px;
            border-radius: 6px;
        }
    </style>

    `;

    setFacturaType(type) {
        document.getElementById('facturaModoPagamento').innerHTML = type;
    }

    setNumeroFactura(numero) {
        document.getElementById('numeroDaFacturaPlace').innerHTML = numero;
        this.setDataFactura();
    }

    setDataFactura() {
        document.getElementById('dataDaFacturaPlace').innerHTML = new Date().toLocaleDateString();
    }

    setTotalFactura(total) {
        const formatter = new Intl.NumberFormat('ao-AO',
            {
                style: 'currency', currency: 'AKZ',
                maximumFractionDigits: 2, minimumFractionDigits: 2
            });
        document.getElementById('totalDaFacturaPlace').innerHTML = formatter.format(total);
    }

    setNomeDocliente(nome) {
        document.getElementById('nomeDocliente').innerHTML = nome;
    }

    closeFactura() {
        this.onCloseFactura();
    }

    /**
     * Assinatura para o componente pai
     */
    onCloseFactura() { }



}