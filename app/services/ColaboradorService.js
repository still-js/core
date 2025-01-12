class ColaboradorService {

    getDetalhesColaborador(idColaborador) {

        return new Promise((resolve) => {

            $still.HTTPClient.get(
                `/api/v1/colaborador/${idColaborador}`
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

    getTimesheetFacturaByColaboradorId(idColaborador) {

        return new Promise((resolve) => {

            $still.HTTPClient.get(
                `/api/v1/colaborador_timesheet_factura/${idColaborador}`
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


}