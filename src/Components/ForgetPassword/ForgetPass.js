import React, { useRef,useState } from "react";
import { Link } from "react-router-dom";

const ForgetPass = () => {
  const emailRef = useRef(null);
  const[loader,setLoader]=useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSendLink = async () => {
    setLoader(true);
    let Email = emailRef.current.value;
    emailRef.current.value="";
    let URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`;
    try {
      const Response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: Email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoader(false)
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
    <div className="max-w-lg mx-auto mt-40 p-6 border rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
        Forgot Password
      </h2>
      <p className="mb-4 text-red-500 text-center">
        Enter your email address to receive a password reset link.
      </p>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Enter your email"
          ref={emailRef}
        />
      </div>
      <div className="text-center">
        {!loader && <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSendLink}
        >
          Send Link
        </button>}
        {loader && <p className="text-xl text-center text-green-600">{"Sending Link"}</p>}
        <p className="mt-1">
          Already a user?
          <Link to="/" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPass;
