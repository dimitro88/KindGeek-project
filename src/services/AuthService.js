class AuthServiceClass {

  login(token, user_id){
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user_id);
  }

  isAuth(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  logOut(){
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
  }

}

const AuthService = new AuthServiceClass();
export default AuthService;