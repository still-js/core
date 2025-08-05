
# Change Log
This log contains all the changes which takes place for StillJS Framework.


## [Released] - 2025-08-04
## [Version] - 1.3.4
Small Improvements in to allow seamless integration with Next.js framework in the Microfrontend context.

- <b>MINOR</b> - Adding STILL_HOME_PREXI env variable to match with PATH_PREFIX from StillApploader

### Fixed
- Setup of Service workes loading in the context of microservice.
- BaseComponent internalId checking.

<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>


















## [Released] - 2025-08-03
## [Version] - 1.3.2
Improvements in Component reference capabilities, small bug fixes.
 
- <b>MEDIUM</b> - Annotation `@Delayed` added for be used in the method level
    <br>

    - <b>Example 1:</b>

        <b>In the component (.js file)</b>
        When you're embedding a heavy component inside another and want to defer its load to let higher-priority components render first.
        ```{.js .numberLines .lineAnchors}

        export class Discord extends ViewComponent {

            isPublic = true;

            totalChannels = 0;

            template = `
                <div>Footer content</div>
            `;

            /** @Delayed 5s */
            constructor(){
                super();
            }

        }
        ```

        <br>
        <br>

    - <b>Example 2:</b>
        <b>In the component (.js file)</b>
        Consider the bellow template code (.html or embedded in the component). 
        We're defining a reference for the Footer embeding.
        ```{.html .numberLines .lineAnchors}
        <div>
            <div>
                <st-element component="Widget"></st-element>
                <st-element component="Article"></st-element>
            </div>
            <st-element component="DataTable"></st-element>
            <!-- Every ref needs to be unique through the App -->
            <st-element component="Footer" ref="HomeFooter"></st-element>
        </div>
        ```

        <b>In the component (.js file)</b>
        Any other component in the application can subscribe or talk to Footer through its reference.
        ```{.js .numberLines .lineAnchors}

        stAfterInit(){
            this.subscribeToExtarnalProp();
        }

        // Here the annotation ensures the referenced component is fully loaded before 
        // running the method is ran, while other code in stAfterInit() runs immediately.
        /**  
        * @Delayed 
        */
        subscribeToExtarnalProp(){ 
            Components.ref('HomeFooter').totalChannels.onChange(value => {
                console.log(`Total channeld in discord updated: `, value);
            });
        }
        ```

        <br><br>
    - <b>Example 3:</b>

        Consider the bellow template code (.html or embedded in the component).
        The delay set during embedding will override the one from the component's constructor.
        ```{.html .numberLines .lineAnchors}
        <div style="margin: 20px;">
            <div>
                <!-- 
                    We're annotating the embedding, it'll delay 5s to load
                    we can also specify m (minutes) and h (hours)
                -->
                <st-element component="Widget" @delayed="5s"></st-element>
                <st-element component="Article"></st-element>
            </div>
            <st-element component="DataTable" ref="SecRef"></st-element>
            <st-element component="Footer"></st-element>
        </div>
        ```

<br><br>



### Fixed
- Making the scroll enabled by default.
- Putting back the default margin according to the browser.

<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>


















## [Released] - 2025-07-29
## [Version] - 1.3.0
Enabling template business logic capabilities trough @for, @if and inline (${\`expression\`}) expression.
 
- <b>MAJOR</b> - `@for` Multi-level/Nesting iteration following regular for loop approach
    <br>
    - Example:

        <b>In the template (.html or embedded in the component)</b>
        ```{.html .numberLines .lineAnchors}
        <ul (showIf)="self.hasPermission">
            @for(role in this.rolesList)
            <li>
            {role.title}
                <ul style="margin-left: 15px;">
                @for(subRole in role.children)
                    <li>{subRole.title}</li>  
                @endfor
                </ul>
            </li>
            @endfor
        </ul>
        ```

        <br>

        <b>In the component (.js)</b>
        ```{.javascript .numberLines .lineAnchors}
        // .... In the component (.js) data assignment
        
        // Data is statically assigned, but could be API
        // ListState type is convinient for better experience
        /** @type { ListState<Array> } */
        rolesList = [{
             "title": "Chief Executive Officer",
             "children": [
                {
                  "title": "Vice President of Marketing",
                  "children": [
                    {
                      "title": "Marketing Manager",
                      "children": [
                          {
                          "title": "Marketing Specialist"
                          }
                      ]
                    }
                  ]
                }
             ]
        }];
        ```
<br>  


- <b>MAJOR</b> - `@if` to be used straight in the template without else statement. Behaves reactively in general except when wrapping `@for`
    <br>
    - Example:

        <b>In the template (.html or embedded in the component)</b>
        ```{.html .numberLines .lineAnchors}
        @if(this.userPermission === 'Admin')
          <div>Full User Privileges</div>
        @endif
    
        @if(this.userPermission !== 'Admin')
          <div>Limitted User Privileges</div>
        @endif
        ```

        <br>

        <b>In the component (.js)</b>
        ```{.javascript .numberLines .lineAnchors}
        // .... In the component (.js) data assignment

        userPermission = 'regular';
        ```
<br>

- <b>MAJOR</b> - `inline expression` for conditional scenario.
    <br>
    - Example:

        <b>In the template (.html or embedded in the component)</b>
        ```{.html .numberLines .lineAnchors}
        ${ this.userPermission === 'Admin' ? 'Full User Privileges' : 'Limitted User Privileges' }
        ```

        <br>

        <b>In the component (.js)</b>
        ```{.javascript .numberLines .lineAnchors}
        // .... In the component (.js) data assignment

        userPermission = 'regular';
        ```
<br>


### Fixed
- Text area binding changes detection console error.
- Dynamic input generation type definition.

<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>
















## [Released] - 2025-07-13
## [Version] - 1.2.13
Diferent improvements and bugfixes.
 
- <b>MINOR</b> - `stAfterInit()` to allow identifying when there is node update in the DOM tree
    <br>

    -  This is a contrast to the stOnUpdate() but only works for DOM tree update, as updated node optimally gets recreated with the new state.
    <br>
    Example:

        <br/>

        ```{.javascript .numberLines .lineAnchors}
        // .... import statements above
        export class HomeComponent extends ViewComponent {

            stAfterInit({ nodeUpdate }){
                if(nodeUpdate){
                    //DO SOMETHING
                }
            }
        }
        ```
<br>  


### Fixed
- Text area binding changes detection console error.
- Dynamic input generation type definition.

<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>
















## [Released] - 2025-07-06
## [Version] - 1.2.12
Diferent improvements and bugfixes.
 
- <b>MIDDLE</b> - List rerender capabilities by using ListState type of state variable
    <br>

    -  When it comes a a large list, you can define it as a ListState thereby being provided with `update` and `delete` methods which are more performant in the rerender perspective:

        <br/>

        In the AppTemplate (line 16 to 18) one fixed part is being added.
        ```{.javascript .numberLines .lineAnchors}
        // .... import statements above
        export class TodoApp extends ViewComponent {

            //Declaration, the id is mandatory and needs to be unique
            /**
            * @type { ListState<Array<{ id, status, title }>> }
            */
            taskList = [
                { id: 1, title: "Do something", status: "todo"},
                { id: 5, title: "Do another thing", status: "todo"},
                { id: 20, title: "Last thing", status: "todo"},
            ];

            updateStatus(){
                const data = this.taskList.value;
                //Updates first and last task
                data[0].status = "done";
                data[2].status = "done";
                // Updates last and first tasks
                this.taskList.update(data);
            }

            deleteTask(){
                // Receives a list of objects with the id field
                this.taskList.update([{ id: 1 }, { id: 20 }]);
            }

        }
        ```
<br>  

- <b>MINOR</b> - Dynamic Form field removal. 

### Fixed
- Dynamic Form Field validator, removed the required as default.

<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>















## [Released] - 2025-06-29
## [Version] - 1.2.11
Improvements on the (showIf) and validator. Fixing `stAfterInit()` in looping.
 
- <b>MINOR</b> - (showIf) flag multi value tracking (`<st-element>`) 
<br>  

- <b>MINOR</b> - Moved (formRef) id to component internal id. 

### Fixed
- `stAfterInit()` in the `(forEach)` context.

<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>














## [Released] - 2025-06-15
## [Version] - 1.2.10
Adjustments on the Lone component/Microfrotend loading and event handling in the integration with React.
 
- <b>MINOR</b> - Value passing from React to Still component through (`<st-element>`) 
<br>  

- <b>MINOR</b> - `stRef` for providing a reference to allow comunication from external app (e.g. React). 


<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>














## [Released] - 2025-05-30
## [Version] - 1.2.5
This version releases some of no-breaking features that had be on hold, also some clean up and fixes are part of it.
 

- <b>MEDIUM</b> - Programatically loading `app-template.js` fixed element (`<st-fixed>`) from the `app-setup.js` 
    <br>

    -  You can load specific template fixed part from the app-setup, allowing it to be done conditionally:

        <br/>

        In the AppTemplate (line 16 to 18) one fixed part is being added.
        ```{.javascript .numberLines .lineAnchors}

        export class AppTemplate extends Template {

            /**
            * <still-component> is the placeholder where components 
            * should be render both when loading or routing to the component
            * 
            * <still-fixed> is the specification of a specific component part from the 
            * User interface that needs to be fiexed (e.g. Header, Footer, Menu, Navigation, etc.)
            * 
            * THIS SHOULD BE CHANGED ACCORDING TO MY LAYOUT WHERE I'M HAVING COMPONENTS FOR
            * EACH PART AND THE FIXED ONES WIIL BE REFERENCED AS <st-fixed> AND THE COMPONENT
            * TO BE RENDERED WILL BE PASSED AS THE VALUES OF component PROPERTY OF <st-fixed>
            * e.g. <st-fixed component="AppHeader">
            */
            template = `
                <st-fixed 
                    component="TopMenu" spot="app.topMenuSpot">
                </st-fixed>
                <still-component/>
            `;
        }
        ```  

        <br/>

        In the StillAppSetup (line 14)
        ```{.javascript .numberLines .lineAnchors}
        import { StillAppMixin } from "../@still/component/super/AppMixin.js";
        import { Components, SpotValue } from "../@still/setup/components.js";
        import { AlternateTopMenu } from "../app/components/menu/AlternateTopMenu.js";
        import { HomeComponent } from "../app/home/HomeComponent.js";
        import { AppTemplate } from "./app-template.js";

        export class StillAppSetup extends StillAppMixin(Components) {

            constructor() {
                super();
                this.setHomeComponent(HomeComponent);
                // this.topMenuSpot points to the AppTeamplte spot="app.topMenuSpot"
                this.topMenuSpot = new SpotValue(AlternateTopMenu, { anyProp: 'Updated prop value' })
            }

            async init() {
                return await AppTemplate.newApp();
            }

        }

        ```
<br>  


- <b>MEDIUM</b> - Condiguration file for setting up specific variables to be used in in the runtime. logs can be disabled form there, HttpClient base url also can be set from there. In addition we can set our custom properties. 
    <br>

    -  You can load specific template fixed part from the app-setup, allowing it to be done conditionally:

        <br/>

        The config file, the default is `config/settings/default.json`.
        ```{.json .numberLines .lineAnchors}
        {
            "httpClient": {
                "baseUrl": ""
            },
            "logs": {
                "default": true,
                "error": true,
                "warning": true
            },
            "path": {
                "service": "",
                "controller": ""
            },
            "my": {
                "custom": { "prop": "My defined value" }
            }
        }
        ```  

        <br/>

        In the StillAppSetup (lines 12 and 15)
        ```{.javascript .numberLines .lineAnchors}
        import { StillAppMixin } from "../@still/component/super/AppMixin.js";
        import { Components } from "../@still/setup/components.js";
        import { HomeComponent } from "../app/home/HomeComponent.js";
        import { AppTemplate } from "./app-template.js";

        export class StillAppSetup extends StillAppMixin(Components) {

            constructor() {
                super();
                this.setHomeComponent(HomeComponent);
                // we can override the config file to anotehr one in the same path
                this.setConfigFile('production.json');

                // We can retrieve the value of a specific confi property any where throughout the application
                const customProp = StillAppSetup.config.get('my.custom.prop');
            }

            async init() {
                return await AppTemplate.newApp();
            }

        }

        ```
<br>  
 
### Fixed
- template fixed part parametr passing.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>














## [Released] - 2025-05-24
## [Version] - 1.2.2
New minor no-breaking feature, clean up, improvements and bug fix.
 

- <b>MINOR</b> - Loader component to be used locally in the component.
    <br>

    -  If we want a loading to be displayed in a component while loading we can do it as follow:

        <br/>

        Template part
        ```{.html .numberLines .lineAnchors}
        <!-- In the template -->
		<st-loader (showIf)="self.showLoader">
        <table>
            <!-- Heare goes the Datatable code -->
        </table>
        ```  

        <br/>

        Component part
        ```{.javascript .numberLines .lineAnchors}
        // .... above coding (e.g. imports)
        class InvoicesComponent extends ViewComponent {

            /** @Prop */
            showLoader = true;

            stAfterInit(){
                //Fetch Data in the API
                //Parse and display data in the UI

                //remove the loader
                this.showLoader = false;
            }

        }

        ```  
<br>  
 
### Fixed
- gets and sets parsing for child component when embeded in the parent.
- prop parsing when passing form Parent component.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>













# Change Log
This log contains all the changes which takes place for StillJS Framework.


## [Released] - 2025-05-11
## [Version] - 1.2.0
New Major no-breaking feature, clean up, improvements and bug fix.
 

- <b>MAJOR</b> - FormHelper for dynamic field creation in the runtime.
    <br>

    -  We can add as many new inpts as needed in the form in the run time, some properties are also available:

        <br/>

        Template part
        ```{.html .numberLines .lineAnchors}
        <!-- In the template -->
		<form (formRef)="personFormRef" onsubmit="return false;">
            <div class="field-group">
                <p>First Name:</p>
                <input type="text" (value)="firstName">
            </div>
            <!-- Dynamic field will be added bellow -->
		</form>
        <button (click)="addNewField()">Add Field</button>
        ```  

        <br/>

        Component part
        ```{.javascript .numberLines .lineAnchors}
        // .... above coding (e.g. imports)
        class PersonComponent extends ViewComponent {

            /** @Prop */
            personFormRef;

            firstName;

            addNewField(){

                const placeholder = 'Enter your nick name';
                FormHelper
                    .newField(this, this.personFormRef, 'nickName')
                    .getInput({ required: true, placeholder, validator: 'alhpanumeric' })
                    //Add will add in the form which reference was specified (2nd param of newField)
                    // .add() recieves the generated input element, in case we need to wrap it can do as bellow
                    .add((inpt) => 
                        `<div class="field-group">
                            <p>First Name:</p>
                            ${inpt}
                        </div>`
                    );	
            }

        }

        ```  
<br>  
 
### Changed
- Restrcture of the folder structure adding config/ in the root.
<br>


### Fixed
- Validation for combobox component.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>













## [Released] - 2025-04-29
## [Version] - 1.1.0
New Features.
 

### Added
- <b>MEDIUM</b> - Added visual <st-divider> tag.
<br>

    -  This tag automatically provides with a component which is adivider that can be either horizontal or vertical:

        ```{.javascript .numberLines .lineAnchors}
        // In the template
        // Divids the page vertically (e.g. top and bottom) allowinf resize by dragging the divder
        <st-divider 
            type="vertical"
            minHeight="0"
            maxHeight="300"
            (onResize)="myMethod(params)"
            />

        // In the component class
        myMethod({bottomHeight, topHeight}){
            //My method implementation
        }
        ```


<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>


















# Change Log
This log contains all the changes which takes place for StillJS Framework.

## [Released] - 2025-04-29
## [Version] - 1.0.0
New Features, improvements and Bug fixes transversally.
 

### Added
- <b>MAJOR</b> - Controllers and @Controller annotation to help offloading the component for UI and DOM feature implementation.
<br>
- <b>MINOR</b> - Service exposure for Lone Components.
<br>
- <b>MINOR</b> - Allow binding of cmpInternal

<br>
<br>

### Changed
- Dynamic new component generation moved Components.new.


    -  template `represents` the UI template, `component` represents the generated component instance, follow the example:

        ```{.javascript .numberLines .lineAnchors}
        const { template, component } = await Components.new(MenuComponent);
        ```

<br>

- HTTPClient not to return specific type on Get and Post methods.
<br>

- @ServicePath renamed to @Path so to be used with both controllers and services.
<br>


### Fixed
- First propagation check validation.
- Form validation when creating several instances of same component in the same area.
<br>


### Removed
- `Component.getFromRef()` method.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>















# Change Log
This log contains all the changes which takes place for StillJS Framework.

## [Released] - 2025-04-15
## [Version] - 0.0.14
New Features, improvements and Bug fixes transversally.
 

### Added
- <b>MINOR</b> - Error handling for invalid component Route Name or URL call.
<br>
- <b>MINOR</b> - Service exposure for Lone Components.
<br>
- <b>MEDIUM</b> - Custom Validator capabilities.

    -  Defining custom validatior inside the component

        ```{.javascript .numberLines .lineAnchors}
        //Inside the component
        stOnRender() {
            StillAppSetup.addValidator('validWeekendDays', (value) => {
                if (value === 'Sat' || value === 'Sun')
                    return true;
                return false;
            });
        }

        //Using in the template
        <input (value)="weekendShift" (validator)="validWeekendDays" placeholder="Enter you weekend shift day">
        ```

    <br>
    
    -  Defining in the <b>StillAppSetup</b>        
        ```{.javascript .numberLines .lineAnchors}
        
        constructor() {
            super();
            StillAppSetup.addValidator('validWeekendDays', (value) => {
                if (value === 'Sat' || value === 'Sun')
                    return true;
                return false;
            });
        }
        ```

<br>

### Changed
- `Router.data()` to receive object instance instead of name.


    -  Getting data from navigation sent by another component

        ```{.javascript .numberLines .lineAnchors}
        Route.data(this);
        ```

<br>

- Moved `Component.getFromRef()` to `Component.ref()`.
<br>


### Fixed
- Component notification from Service when it get loaded and ready.
- `stOnUpdate()` hook call.
- Lifecycle method call for public and defined home Component.
- Container id parsing for Lone component.
- <b>(renderIf)</b> directive for embeded component.
- Service injection for embeded component.
<br>


### Removed
- `Component.getFromRef()` method.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>















## [Released] - 2025-04-06
## [Version] - 0.0.13
Improvements and bug fixes.
<br>

- <b>MEDIUM</b> - implemented error handling for invalid component route Name or URL call.
        

### Fixed
- Component loading/unloading in the reloading flow.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>














## [Released] - 2025-04-06
## [Version] - 0.0.12
Improvements and bug fixes.
<br>

- <b>MEDIUM</b> - implemented error handling for invalid component route Name or URL call.
        

### Fixed
- fixed component loading/unloading logic when in the reloading flow.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>













## [Released] - 2025-04-06
## [Version] - 0.0.11
Clean up, improvements and bug fixes.
 

- <b>MEDIUM</b> - Blacklist and Whitelist to make components public and vice-versa.
        

- <b>MINOR</b> - App Config method to allow setting a customized warning message for private Components.
- <b>MINOR</b> - escape method in the Router which is used in the private component warning message to go back the previous component.
<br>  
 
### Changed
- Singleton instance from Components to AppMixin.
<br>
- AuthN flag to store in the App variable instead of localStorage.
<br>


### Fixed
- `setServicePath` which is called in the `StillAppSetup`.
- Service routing path generation from route.js util.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>











This log contains all the changes which takes place for StillJS Framework.

## [Released] - 2025-04-02
## [Version] - 0.0.10
Clean up, improvements and bug fixes.
 

### Fixed
- Gets and Set parsing in both component first load and reload.
- Garbage collector.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>











# Change Log
This log contains all the changes which takes place for StillJS Framework.

## [Released] - 2025-04-01
## [Version] - 0.0.9
New Features, improvements and Bug fixes transversally.
 

### Added
- <b>MAJOR</b> - `Base Service` super class and `Service Event` feature to allow global state management reactivelly.
        

- <b>MINOR</b> - `onRender` and `stAfterInit` hooks call for Lone entry component.
- <b>MINOR</b> - `@ServicePath` annotation to allow to specify the service path specifically.
<br>  
 
### Changed
- Definition of the temporary proxy when parsing `@Proxy` annotation.
<br>

- Moved `Component.getFromRef()` to `Component.ref()`.
<br>

- README.md for adding proper orientation for initial documentation access.
<br>


### Fixed
- Component notification from Service when it get loaded and ready.
- Component notification from Proxy when it get loaded and ready.
<br>


### Removed
- `Component.getFromRef()` method.
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>











# Change Log
This log contains all the changes which takes place for StillJS Framework.

## [Released] - 2025-03-29
## [Version] - 0.0.8
Fixed issued with component rendering and registraction.
 

### Fixed
- ViewComponent reference for Template.
<br>

- Public component registraction
<br>
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>










# Change Log
This log contains all the changes which takes place for StillJS Framework.

## [Released] - 2025-03-29
## [Version] - 0.0.7
Adjustments on the Lone Component implementation.
 
### Added
- <b>MINOR</b> - Routing (route.map.js) file definition according to STILL_HOME env variable.

- <b>MINOR</b> - Router (router.js) file definition according to STILL_HOME env variable.

### Changed
- Page readiness checking for parsing Lone Component.
<br>


<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>










## [Released] - 2025-03-28
## [Version] - 0.0.6
Major features implementation and Bug fixes.
 
### Added
- <b>MAJOR</b> - Lone component to allow using Still in an existing web site as well as Microfrontend implementation.
        

- <b>MINOR</b> - Moving HTTP Util to ESModule.
<br>  
 
### Changed
- Merging of all CSS files to a single one (still.css).
<br>

- Moved Routes handling from StillApp to AppTemplate.
<br>

- Changed the was AppTemplate + Component is declared in the StillApp init() method.
<br>

- Pointing public component class path to the ```ComponentRegistror```.
<br>

- Made all special methods/Hooks to support async call.
<br>

- Click event parsing to allow proper navigation for Lone Component.
<br>


### Fixed
- Component lifecycle calls.
<br>


### Removed
- still-fundamental.css
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>










## [Released] - 2025-03-08
## [Version] - 0.0.3
Some improvements and new features implementation are taking place in this version.
 
### Added
- <b>MIDIUM</b> - goto method to be called through the ```(click)``` event making to navigate from a page/component to another
    e.g.:
    - 1 - Navigate from current component to PersonForm component
        ```js
        <a (click)="goto('PersonForm')">Create Person</a>
        ```
        
    - 2 - Navigate from current component to PersonForm component and send some string as Data
        ```js
        <a (click)="goto('PersonForm', 'Any string')">Create Person</a>
        ```

    - 3 - Bind a state from my current component to the navigation and send it to PersonForm component once clicked

        ```{.javascript .numberLines .lineAnchors}
        //import code snippets in the top
        class UserManagement extends ViewComponent {
            
            //state variable reference as second parameter of goto (line 8)
            userPermission = { role: 'super', group: 'admin' };

            template = `
                <a (click)="goto('PersonForm', self.userPermission)">Create Person</a>
            `;

            //rest of code (e.g. constructor) bellow
            
        }
        ```
        

- <b>MAJOR</b> - Error handling for when referenging unexisting route
<br>  
 
### Changed
- Timing for debounce of the still special method/hooks when parsing st-element
<br>

- ```<st-element>``` properties parsing implementation allowing better coding structure and parsing speed by using once level parsing
<br>

- deprecated old parsing approach which considered two levels parsing
<br>

- Routable flag moved to a global/static class property ```Router.importedMap```
<br>


### Fixed
- Route parsing thereby making it to handle paths with or without slash ```(/)``` at the end
<br>

- Routing implementation when it comes to handle public/ptivate components to show/hide in case used is not authenticated
<br>

- Component registration when routing for the first time
<br>

- Dynamic import on reloading
<br>

### Removed
- Removed vendors from the default stilljs project setup
<br>
<hr>
<p>&nbsp;</p>
<p>&nbsp;</p>
 










## [Released] - 2025-03-05
## [Version] - 0.0.2
Some improvements and new features implementation are taking place in this version.
 
### Added
- <b>MIDIUM</b> - Bound state change auto-subscribing

- <b>MIDIUM</b> - State change event/value propagation to update UI bound component

- <b>MINOR</b> - overrided register method under AppSetup class to allow calling in the object scope in addition to the class/util/static scope
  
- <b>MINOR</b> - added both class and object scope method to AppSetup to allow to register user authentication status
  
- <b>MINOR</b> - added getHomeCmpTemplate for getting the template of Home component on loading the app
  
 
### Changed
- Adjust the app-setup to setup the default home component when Still project is generated/created
<br>

- changed component retrieving for home whenever the app is being loaded
<br>

- adjust the app-setup to setup the home component as default
<br>


### Fixed
- State and property binding for when there might be conflict like variables having similar names in the begining (e.g. name and name1)
<br>

### Removed
- Removed vendors from the default stilljs project setup
<br>

 
 
