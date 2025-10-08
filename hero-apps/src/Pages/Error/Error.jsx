import React from "react";
import Error404 from "../../assets/error-404.png";

const Error = () => {
  return (
    <div className="text-center mt-5 items-center my-auto px-4">
      <img
        src={Error404}
        alt="Error 404"
        className="mx-auto my-auto w-64 sm:w-80 lg:w-96"
      />
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-5">
        Oops, page not found!
      </h2>
      <p className="text-base sm:text-lg mt-5 px-4">
        The page you are looking for is not available.
      </p>
      <a
        href="/"
        className="btn btn-dash btn-primary mt-5 text-sm sm:text-base"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default Error;
