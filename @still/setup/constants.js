export let $stillconst = { MSG: { CUSTOM_PRIVATE_CMP: null } };

export const authErrorMessage = () => `
        <div class="st-unauthorized-access" id="${ST_UNAUTHOR_ID}">
            ${!$stillconst.MSG.CUSTOM_PRIVATE_CMP
        ? `<h3 style='color:red;'>
                    <b>Unauthorized Access:</b> You're trying to access a  a private component or View/Page, 
                    <br>in case you need to access it without making log-in please make isPublic flag true
                </h3>`
        : $stillconst.MSG.CUSTOM_PRIVATE_CMP}
            <a href="#" onclick="Router.escape()">Go back<button>
        </div>
    `;

export const ST_UNAUTHOR_ID = `stillAppUnauthorizedPage`;
$stillconst = {
    ...$stillconst,
    //This is a main/principal/first component CSS class only
    TOP_LEVEL_CMP: 'still-toplevel-and-root-app',
    ST_HOME_CMP: 'still-toplevel-and-home-app',
    ST_HOME_CMP1: 'still-toplevel-and-home-app1',
    /**
     * This is a CSS class for any component used to handle which component 
     * to load/hide and unload/show through the router
     */
    ANY_COMPONT_LOADED: 'still-any-component-loaded',
    CMP_FORM_PREFIX: '<form',
    DYNAMIC_CMP_PREFIX: 'dynamic-',
    STILL_PREFIX: '$still',
    SUBSCRIBE_LOADED: 'still-subscription-dynamic-loaded',

    /* TAGS: {
        TBODY: () => document.createElement('tbody')
    }, */
    STILL_COMPONENT: `<still-component/>`,
    APP_PLACEHOLDER: 'stillAppPlaceholder',
    UI_PLACEHOLDER: 'stillUiPlaceholder',
    PART_HIDE_CSS: 'still-hide-view-part',
    PART_REMOVE_CSS: 'still-del-view-part',
    SUBSEQUENT_NO_PARSE: 'please-do-not-parse-me-still',
    VALID_TRIGGER_ONTYPE: 'still-validation-on-type',
    MIN_VALID_MSG_PT: 'O valor deve ser maior ou igual à {{}}',
    MAX_VALID_MSG_PT: 'O valor deve ser menor ou igual à {{}}',
    PROP_TYPE_IGNORE: ['STForm'],
    A_STATUS: {
        PENDING: 'pending',
        DONE: 'done'
    },

    /**
     * Bellow constants for error messages are assigned
     */
    MSG: {
        PRIVATE_CMP: ``,
        INVALID_INJECTION: `Invalid type injection {type} inside {cmp}. Injection is valid for Services and Controllers only`,
        UNKNOWN_ROUTE: `<h3 style='color:red;' id="${ST_UNAUTHOR_ID}">
                        <b>Invalid Route:</b> You're trying to access a non existing route {{}}.
                           <br>Make sure you're spelling it correctly
                     </h3>`,
    },
    NO_TEMPLATE: `<div style="
                        margin: 0 auto; 
                        color: red; 
                        width:100%; 
                        margin-top: 10%;
                        font-size: 2em;
                        text-align: center">
                    There is no template defined for the specified component "<b style="text-decoration: underline;">{{}}</b>"
                </div>`,
    importedCmpMap: {},
    /** Routing Data Prefix */
    RT_DT_PREFIX: `$@data$`,
    ST_FIXE_CLS: 'st-fixed-part',
    EVT: {
        LONE_LOADED: 'LONE_LOADED'
    },
    NEGATE_FLAG: 'negate-flag',
    FLAG: 'flag-',
    LOOP_PREV_LOAD: 'loop-prev-loaded',


}

export const WORKER_EVT = {
    OFFLOAD: 'offloadCmpParsing'
}

export const STATUS = {
    START: 'start', PROGRESS: 'progress', DONE: 'done', PAUSE: 'pause'
}

export const ST_RE = {
    st_element: /\<st-element[\>\@\/\.\"\,\w\s\=\-\( \)\[\]\{\}\:\;\'\*\&\^\%\#\!\+\_\%\$\`\~]{0,}]{0,}/g,
    st_fixed: /\<st-fixed[\> \. \" \, \w \s \= \- \ \( \)]{0,}[\/\>]{0,}/g,
    bind_css: /(style\=\"(.*)\")/,
    at_delay_annot: /\/[\*\s\t\n]*?\@Delayed[\s]{0,}([0-9]{0,}[smh]{0,1})[\*\s\t\n]*?\/([A-Z\$\#\_\t\s\n]*?)\(/ig,
    at_delay_annot_constr: /\/[\*\s\t\n]*?\@Delayed[\s]{0,}([0-9]{0,}[smh]{0,1})[\*\s\t\n]*?\/[\s\t\n]{0,}(constructor|stAfterInit)/
}
