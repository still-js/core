export class StillError {

    static setDevErrorContainer() {

        const errDiv = document.createElement('div');
        errDiv.id = "stillRunTimeErrDiv";
        document.body.insertAdjacentElement('beforebegin', errDiv);

    }

    static getDevErrorTraceContainer() {
        return document.getElementById('stillRunTimeErrDiv');
    }

    static checkTotalError() {
        return document
            .getElementById('stillRunTimeErrDiv')
            .childNodes.length;
    }

}