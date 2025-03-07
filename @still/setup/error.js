export class StillError {

    static setDevErrorContainer() {

        const errDiv = document.createElement('div');
        errDiv.id = "stillRunTimeErrDiv";
        errDiv.style.display = "none";
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

    static getErrorCtnrVisibility() {
        return document
            .getElementById('stillRunTimeErrDiv')
            .style.display;
    }

    static handleStComponentNotFound(err, parentCmp, cmpName) {

        if (err.toString().includes('TypeError')) {

            const errorFrag = this.handleCntrVisibility();

            errorFrag.innerHTML = `
            <p>
            <br>
            <span class="sttypeErrorMessage">TypeError: ${err.message}</span> <br>
            &nbsp;&nbsp;&nbsp;Error while loading <span class="nonExistingComponentSt">${cmpName}</span> st-element reference in 
                <b><u>${parentCmp.constructor.name}.js</u></b>
                <st-element component="${cmpName}"></st-element>
                <br>&nbsp; &#x2192; check if the component and/or the route exists and was spelled correctly
                <br>&nbsp; &#x2192; In the terminal type <span class="errorCmdSugestion">still route list</span>
            </p>
            `;
            errorFrag.style.lineHeight = 1.5;
            errCntr.insertAdjacentElement('beforeend', errorFrag);

        }

    }

    static addNotExistingBindingField(fieldName, parentCmp) {

        const errorFrag = this.handleCntrVisibility();
        const cmpName = parentCmp.constructor.name;

        errorFrag.innerHTML = `
            <p>
            <br>
            <span class="sttypeErrorMessage">ReferenceError: ${fieldName} is not define for ${cmpName} component</span> <br>
            &nbsp;&nbsp;&nbsp;Error while parsing <span class="nonExistingFieldSt">${fieldName}</span> st-element reference in 
                <b><u>${cmpName}.js</u></b>
            </p>
            `;
        errorFrag.style.lineHeight = 1.5;
        errCntr.insertAdjacentElement('beforeend', errorFrag);

    }

    static handleCntrVisibility() {
        const errCntr = StillError.getDevErrorTraceContainer();
        const errorFrag = document.createElement('div');
        const errVisibility = StillError.getErrorCtnrVisibility();

        if (errVisibility == 'none') errCntr.style.display = '';

        return errorFrag;

    }
}