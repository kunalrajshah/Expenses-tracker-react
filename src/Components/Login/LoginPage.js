import React, { useRef, useContext, useState } from "react";
import LoginContext from "./LoginContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const ctxt = useContext(LoginContext);
  const [islogin, setLogin] = useState(true);
  const [isLoading,setLoading]=useState(false);
  const navigate=useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const toggletext = () => {
    if (islogin) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const Enteredemail = emailRef.current.value;
    const Enteredpassword = passwordRef.current.value;
    if (!islogin) {
      const confirmPassword = confirmPasswordRef.current.value;
      if (Enteredpassword !== confirmPassword) {
        alert("Password is Not Matched !!");
      }
    }

    const userDetails = {
      email: Enteredemail,
      password: Enteredpassword,
      returnSecureToken: true,
    };
    let URL;
    if (!islogin) {
      URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    } else {
      URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }

    try {
      const Response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
      if (Response.ok) {
        const Data = await Response.json();
        ctxt.Login(Data.idToken);
        navigate("/home")
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md">
        <div className="py-8 px-10">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {islogin ? "LogIn" : "SignUp"}
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  ref={emailRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
              {!islogin && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    ref={confirmPasswordRef}
                  />
                </div>
              )}
            </div>

            {!isLoading  && <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {islogin ? "Login" : "Create Account"}
              </button>
            </div>}
            {isLoading && <p className="text-green-700 text-xl text-center">Sending Request ... </p>}

          </form>
          <div className="text-center mt-2">
             <button
              className="text-blue-500 border-none hover:bg-white"
              onClick={toggletext}
            >
              {islogin ? "Create new account" : "Login With existing account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
