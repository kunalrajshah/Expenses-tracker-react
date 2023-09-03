import React,{useState} from 'react';
import LoginContext from './LoginContext';

const LoginProvider = (props) => {
  const [token,setToken]=useState(null);
  const loginHandler=(token)=>{
    setToken(token)
  }
  const logoutHandler=()=>{
    setToken(null)
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