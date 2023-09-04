import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
    </Fragment>
  );
};

export default Home;
