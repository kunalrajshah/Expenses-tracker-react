import { Fragment } from "react";
import { Routes,Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Home from "./Components/HomePage/Home";
import UpdatePage from "./Components/UpdateProfile/updatePage";
import ForgetPass from "./Components/ForgetPassword/ForgetPass";
const App = () => {
  return (
    <Fragment>
     <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/updateProfile" element={<UpdatePage />} />
      <Route path="/Forget Password?" element={<ForgetPass/>} />
     </Routes>
    </Fragment>
  );
}

export default App;
