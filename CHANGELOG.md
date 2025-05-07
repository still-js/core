
# Change Log
This log contains all the changes which takes place for StillJS Framework.



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

 
 
