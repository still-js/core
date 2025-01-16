class ProcessoService {

    getTarefaByColaboradorId() {

        const userLogged = JSON.parse(localStorage.getItem("_user"));
        let userId = userLogged.id;

        return new Promise((resolve) => {

            $still.HTTPClient.get(
                `/api/v1/tarefas_processo/colaborador/${userId}`
            ).then((r) => {
                if (r.status === 200) {
                    try {
                        if (r.data?.length)
                            resolve(r.data);
                        else
                            AppTemplate.hideLoading();
                    } catch (e) {
                        AppTemplate.hideLoading();
                        console.log("Error on finding tarefas", e);
                    }
                }
            });

        });

    }

    getDetalhesProcesso(idProcesso) {

        return new Promise((resolve) => {

            $still.HTTPClient.get(
                `/api/v1/processo/${idProcesso}`
            ).then((r) => {
                if (r.status === 200) {
                    try {
                        if (r.data?.length)
                            resolve(r.data[0]);
                        else
                            AppTemplate.hideLoading();
                    } catch (e) {
                        AppTemplate.hideLoading();
                        console.log("Error on finding tarefas", e);
                    }
                }
            });

        });

    }

    getFacturasByProcesso(idProcesso) {

        return new Promise((resolve) => {

            $still.HTTPClient.get(
                `/api/v1/processo_factura/${idProcesso}`
            ).then((r) => {
                if (r.status === 200) {
                    try {
                        if (r.data)
                            resolve(r.data);
                        else
                            AppTemplate.hideLoading();
                    } catch (e) {
                        AppTemplate.hideLoading();
                        console.log("Error on finding tarefas", e);
                    }
                }
            });

        });

    }

    getPaymentsProcesso(idProcesso) {

        return new Promise((resolve) => {

            $still.HTTPClient.get(
                `/api/v1/pagamentos_facturas_by_id/${idProcesso}`
            ).then((r) => {
                if (r.status === 200) {
                    try {
                        if (r.data?.length)
                            resolve(r.data);
                        else
                            AppTemplate.hideLoading();
                    } catch (e) {
                        AppTemplate.hideLoading();
                        console.log("Error on finding tarefas", e);
                    }
                }
            });

        });

    }

    async getProcessoByColaborador(colaboradorId) {

        const response = await $still.HTTPClient.get(
            `/api/v1/processo_colaborador/${colaboradorId}`
        );

        return response?.data;
    }

    getListClientes() {
        return new Promise((resolve) => {

            $still.HTTPClient.get("/api/v1/cliente/").then((r) => {
                if (r.data) {
                    let clienteData = [];

                    for (let cliente of r.data) {
                        clienteData.push({
                            id: cliente.id,
                            descricao: `${cliente.tipo.description} - ${cliente.denominacao}`,
                        });
                    }

                    resolve(clienteData);
                }
                resolve(null);
            });

        })
    }

    async getProcessos() {
        const response = await $still.HTTPClient.get(
            `/api/v1/processo/processos/list`
        );

        return response?.data;
    }

    async getProcessosByCliente(idClient) {
        const response = await $still.HTTPClient.get(
            `/api/v1/cliente_processos/${idClient}`
        );
        return response?.data;
    }


    


}