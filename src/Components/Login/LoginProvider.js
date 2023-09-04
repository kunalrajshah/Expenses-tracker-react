import React,{useState} from 'react';
import LoginContext from './LoginContext';

const LoginProvider = (props) => {
  const initialToken=localStorage.getItem("token");
  const [token,setToken]=useState(initialToken);
  const loginHandler=(token)=>{
    setToken(token);
    localStorage.setItem('token',token)
  }
  const logoutHandler=()=>{
    setToken(null);
    localStorage.removeItem('token')
  }
  const userLoggedIn=!!token;
  const contextValue={
    token:token,
    isloggedin:userLoggedIn,
    Login:loginHandler,
    Logout:logoutHandler
  }
  return (
   <LoginContext.Provider value={contextValue}>
    {props.children}
   </LoginContext.Provider>
  )
}

export default LoginProvider;