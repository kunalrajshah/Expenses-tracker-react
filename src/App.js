import { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Home from "./Components/HomePage/Home";
import UpdatePage from "./Components/UpdateProfile/updatePage";
import ForgetPass from "./Components/ForgetPassword/ForgetPass";
import LoginContext from "./Components/Login/LoginContext";
const App = () => {
  const ctxt = useContext(LoginContext);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {ctxt.isloggedin && <Route path="/home" element={<Home />} />}
        {ctxt.isloggedin && (
          <Route path="/updateProfile" element={<UpdatePage />} />
        )}
        {ctxt.isloggedin && (
          <Route path="/Forget Password?" element={<ForgetPass />} />
        )}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Fragment>
  );
};

export default App;
