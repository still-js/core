
# Change Log
This log contains all the changes which takes place for StillJS Framework.
 
 
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
- State and property binding for when there might be conflict like v
ariables having similar names in the begining (e.g. name and name1)
<br>

### Removed
- Removed vendors from the default stilljs project setup
<br>

 
 
