import React, { Fragment, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import LoginContext from "../Login/LoginContext";

const Home = () => {
  const ctxt = useContext(LoginContext);
  const navigate=useNavigate();
  const logoutHandler=()=>{
    ctxt.Logout();
    navigate("/")
  }
  const verifyHandler = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    let URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
    try {
      const Response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: ctxt.token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (Response.ok) {
        const Data = await Response.json();
        // console.log(Data);
      } else {
        const Data = await Response.json();
        let errMessage = "Auth Failed !!";
        if (Data && Data.error && Data.error.message) {
          errMessage = Data.error.message;
        }
        throw new Error(errMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-black p-2">
        <h2 className="text-2xl md:text-3xl">
          <i>Welcome to Expense Tracker !!</i>
        </h2>
        <p className="mt-2 md:mt-0 border-1 rounded bg-pink-200 px-1">
          <i>
            Your profile is incomplete.{" "}
            <span className="text-blue-500 cursor-pointer font-medium">
              <Link to="/updateProfile">Complete now</Link>
            </span>
          </i>
        </p>
      </div>
      <div className="flex item-center justify-center mt-10">
        <button
          className="border-2 border-red-400 rounded cursor-pointer p-1 hover:bg-red-200"
          onClick={verifyHandler}
        >
          Verify Email ID
        </button>
        <button
          className="border-2 border-red-400 rounded cursor-pointer p-1 hover:bg-red-200 ml-4"
          onClick={logoutHandler}
        >
          LogOut
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
