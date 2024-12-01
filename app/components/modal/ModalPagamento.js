class ModalPagamento extends ViewComponent {

    itensPagamentos;
    template = `

        <div>
            <p> Modal Pagamento </p>
        </div>
    
    
    <style>

    </style>

    `;

    closeModal() {
        this.onCloseModal();
    }

    /**
     * Assinatura para o componente pai
     */
    onCloseModal() { }



}