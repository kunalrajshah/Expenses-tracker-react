import { Fragment } from "react";
import { Routes,Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Home from "./Components/HomePage/Home";
const App = () => {
  return (
    <Fragment>
     <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
     </Routes>
    </Fragment>
  );
}

export default App;
