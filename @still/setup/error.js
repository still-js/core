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

            const { errorFrag, errCntr } = this.handleCntrVisibility();

            errorFrag.innerHTML = `
            <p>
            <br>
            <span class="sttypeErrorMessage">TypeError: ${err.message}</span> <br>
            &nbsp;&nbsp;&nbsp;Error while loading 
                <span class="nonExistingComponentSt">
                    &lt;st-element component="<b>${cmpName}</b>"&gt;&lt;/st-element&gt;
                </span> 
                reference in 
                <b><u>${parentCmp.constructor.name}.js</u></b>
                <br>&nbsp; &#x2192; check if the component and/or the route 
                                    ( <span class="nonExistingComponentSt"><b>${cmpName}</b></span> ) 
                                    exists and was spelled correctly
                <br>&nbsp; &#x2192; In the terminal type <span class="errorCmdSugestion">still route list</span>
            </p>
            `;
            errorFrag.style.lineHeight = 1.5;
            errCntr.insertAdjacentElement('beforeend', errorFrag);

        }

    }

    static handleInvalidTmplUrl(err, parentCmp, url) {

        if (err.toString().includes('TypeError')) {

            const { errorFrag, errCntr } = this.handleCntrVisibility();

            errorFrag.innerHTML = `
            <p>
            <br>
            <span class="sttypeErrorMessage">ReferenceError: Invalid component templateUrl</span> <br>
            &nbsp;&nbsp;&nbsp;Error while loading template from <span class="nonExistingTemplate">${url}</span>
            inside <b><u>${parentCmp.constructor.name}</u></b>
                <br>&nbsp; &#x2192; check if the template file exists in the referenced path/folder
            </p>
            `;
            errorFrag.style.lineHeight = 1.5;
            errCntr.insertAdjacentElement('beforeend', errorFrag);

        }

    }

    static addNotExistingBindingField(fieldName, parentCmp) {

        const { errorFrag, errCntr } = this.handleCntrVisibility();
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

        return { errorFrag, errCntr };

    }
}