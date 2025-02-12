class UserService {
    getRolesByLoggedUser() {
          const userLogged = JSON.parse(localStorage.getItem("_user"));       
          return  userLogged.auth.roles;    
      }
      getLoggedUser() {
                return JSON.parse(localStorage.getItem("_user"));
      }
}