import { StillAppSetup } from "../../app-setup.js";

/**
 * 
 * Function to load JQuery Step/Wizard which is 
 * called in the calss component 
 */
window.loadWizard = loadWizard;
export function loadWizard({ enableAllSteps = false } = {}) {

    var form = $('#client_wizard_with_validation').show();
    const [finish, next, previous] = ["Submeter", "Próximo", "Voltar"]
    form.steps({
        showFinishButtonAlways: false,
        enableFinishButton: false,
        enableAllSteps,
        labels: { finish, next, previous },
        headerTag: 'h3',
        bodyTag: 'fieldset',
        transitionEffect: 'slideLeft',
        onInit: function (event, currentIndex) {

            //Set tab width
            var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
            var tabCount = $tab.length;
            $tab.css('width', (100 / tabCount) + '%');

            //set button waves effect
            setButtonWavesEffect(event);
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; }

            if (currentIndex < newIndex) {
                form.find('.body:eq(' + newIndex + ') label.error').remove();
                form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
            }
            return form//.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            setButtonWavesEffect(event);
        },
        onFinishing: function (event, currentIndex) {
            return form//.valid();
        },
        onFinished: function (event, currentIndex) {
            swal("Good job!", "Submitted!", "success");
        }
    });
}


window.loadWizardColaborador = loadWizardColaborador;
export function loadWizardColaborador({ enableAllSteps = false } = {}) {

    var form = $('#col_wizard_with_validation').show();
    const [finish, next, previous] = ["Submeter", "Próximo", "Voltar"]
    form.steps({
        showFinishButtonAlways: false,
        enableFinishButton: false,
        enableAllSteps,
        labels: { finish, next, previous },
        headerTag: 'h3',
        bodyTag: 'fieldset',
        transitionEffect: 'slideLeft',
        onInit: function (event, currentIndex) {

            //Set tab width
            var $tab = $(event.currentTarget).find('ul[role="tablist"] li');
            var tabCount = $tab.length;
            $tab.css('width', (100 / tabCount) + '%');

            //set button waves effect
            setButtonWavesEffect(event);
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) { return true; }

            if (currentIndex < newIndex) {
                form.find('.body:eq(' + newIndex + ') label.error').remove();
                form.find('.body:eq(' + newIndex + ') .error').removeClass('error');
            }
            return form//.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            setButtonWavesEffect(event);
        },
        onFinishing: function (event, currentIndex) {
            return form//.valid();
        },
        onFinished: function (event, currentIndex) {
            swal("Good job!", "Submitted!", "success");
        }
    });
}

window.setButtonWavesEffect = setButtonWavesEffect;
export function setButtonWavesEffect(event) {
    $(event.currentTarget).find('[role="menu"] li a').removeClass("waves-effect");
    $(event.currentTarget)
        .find('[role="menu"] li:not(.disabled) a')
        .addClass("waves-effect");
}

window.disabledTaxaHoraria = disabledTaxaHoraria;
export function disabledTaxaHoraria() {
    var e = document.getElementById("select-tipo-colaborador");
    var typeCollaborator = e.options[e.selectedIndex].text;
    console.log('o valor do select é', typeCollaborator);

    if (typeCollaborator == "Administrativo") {
        document.getElementById("input-taxa-horaria").disabled = true;
    }
    else {
        document.getElementById("input-taxa-horaria").disabled = false;
    }

}


export function MyNewFunction() {
    console.log(`MY FUNC CALLED`);
}

StillAppSetup.register(MyNewFunction)
