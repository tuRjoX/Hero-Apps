import React, { Suspense } from "react";
import { useLoaderData } from "react-router";
import App from "../App/App";

const Apps = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent mb-4">
            Our All Applications
          </h1>
          <p className="text-gray-600 text-lg">
            Explore All Apps on the Market developed by us. We code for Millions
          </p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold ml-5">(132) Apps Found</h1>
          <label className="input mr-6">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" required placeholder="Search" />
          </label>
        </div>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {data.map((singleApp) => (
              <App key={singleApp.id} singleApp={singleApp}></App>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Apps;
