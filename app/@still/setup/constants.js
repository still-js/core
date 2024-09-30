const $stillconst = {
    //This is a main/principal/first component CSS class only
    TOP_LEVEL_CMP: 'still-toplevel-and-root-app',
    /**
     * This is a CSS class for any component used to handle which component 
     * to load/hide and unload/show through the router
     */
    ANY_COMPONT_LOADED: 'still-any-component-loaded',
    CMP_FORM_PREFIX: '<form',
    DYNAMIC_CMP_PREFIX: 'dynamic-',
    STILL_PREFIX: '$still',
    SUBSCRIBE_LOADED: 'still-subscription-dynamic-loaded',

    TAGS: {
        TBODY: () => document.createElement('tbody')
    },
    'STILL_COMPONENT': `<still-component/>`,




    /**
     * Bellow constants for error messages are assigned
     */
    MSG : {
        PRIVATE_CMP: `<h3 style='color:red;'>
                        You're trying to access a private component, assign true to isPublic class property if you which to access it
                     </h3>`
    }
}