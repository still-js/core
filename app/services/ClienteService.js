class ClienteService {

    getDetalhesCliente(idCliente) {

        return new Promise((resolve) => {

            $still.HTTPClient.get(
                `http://localhost:3000/api/v1/cliente/${idCliente}`
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


}