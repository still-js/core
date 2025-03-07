
# Change Log
This log contains all the changes which takes place for StillJS Framework.
 
 
## [Released] - 2025-03-07
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

 
 
