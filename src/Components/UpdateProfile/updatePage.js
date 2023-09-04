import React, {
  Fragment,
  useRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";
import LoginContext from "../Login/LoginContext";

const UpdatePage = () => {
  // Create state variables for Name and PhotoURL
  const [Name, setName] = useState("Kunal Raj Shah");
  const [PhotoURL, setPhotoURL] = useState(
    "https://wallpapercave.com/wp/wp9321177.jpg"
  );

  const ctxt = useContext(LoginContext);
  const fullNameRef = useRef(null);
  const profilePhotoURLRef = useRef(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  // Get user Data
  useEffect(() => {
    const fetchData = async () => {
      let URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
      try {
        const Response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({ idToken: ctxt.token }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (Response.ok) {
          const Data = await Response.json();
          // console.log(Data.users[0]);
          setName(Data.users[0].displayName);
          setPhotoURL(Data.users[0].photoUrl);
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

    // Call the fetchData function immediately
    fetchData();
  }, []);

  const handleUpdateClick = async (event) => {
    event.preventDefault();
    const fullName = fullNameRef.current.value;
    const profilePhotoURL = profilePhotoURLRef.current.value;
    const updateDetails = {
      idToken: ctxt.token,
      displayName: fullName,
      photoUrl: profilePhotoURL,
      returnSecureToken: true,
    };
    let URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;

    try {
      const Response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(updateDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (Response.ok) {
        const Data = await Response.json();
        setName(Data.displayName);
        setPhotoURL(Data.photoUrl);
        fullNameRef.current.value = "";
        profilePhotoURLRef.current.value = "";
        // console.log("updated Data",Data);
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

  const handleCancelClick = () => {};

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-black p-2">
        <h1 className="text-2xl md:text-3xl italic">
          Winners never quit, Quitters never win.
        </h1>
        <p className="mt-2 md:mt-0 border-1 rounded bg-pink-200 px-1 md:flex-wrap">
          <i>
            Your Profile is <span className="font-bold">64%</span> Completed. A
            complete Profile has higher chances of landing a job.{" "}
            <span className="text-blue-600 font-semibold cursor-pointer">
              Complete now
            </span>
          </i>
        </p>
      </div>
      {/* Display name and photo */}
      <div className="md:fixed md:top-10 right-0 md:m-4 p-4 bg-white rounded-lg shadow-lg">
        <img
          src={PhotoURL}
          alt="dp"
          className="w-16 h-16 md:w-24 md:h-24 rounded-full mx-auto mb-2"
        />
        <h2 className="text-center text-xs md:text-sm">{Name}</h2>
      </div>

      <div className="w-full max-w-lg mx-auto border-b-2 pb-4 mt-10 md:mt-40">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faGithub}
                className="w-6 h-6 mr-2 text-gray-700"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Full Name"
                ref={fullNameRef}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="profilePhotoURL"
            >
              Profile Photo URL
            </label>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faInternetExplorer}
                className="w-6 h-6 mr-2 text-gray-700"
              />
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="profilePhotoURL"
                type="text"
                placeholder="Profile Photo URL"
                ref={profilePhotoURLRef}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-pink-400 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleUpdateClick}
            >
              Update
            </button>
            <button
              className="bg-white hover:bg-red-100 text-red-600 font-bold py-2 px-4 border-2 border-red-400 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCancelClick}
            >
              <Link to="/home">Cancel</Link>
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default UpdatePage;
