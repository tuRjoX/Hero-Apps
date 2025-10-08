import React, { Suspense, useState, useMemo, useEffect } from "react";
import { useLoaderData } from "react-router";
import App from "../App/App";
import AppNotFound from "../../assets/App-Error.png";

const Apps = () => {
  const data = useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredApps = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }
    return data.filter((app) =>
      app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-[#632EE3] mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Applications
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch all the amazing apps...
          </p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold ml-5">
            ({filteredApps.length}) Apps Found
          </h1>
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
            <input
              type="search"
              placeholder="Search apps..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input-bordered"
            />
          </label>
        </div>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {filteredApps.map((singleApp) => (
                <App key={singleApp.id} singleApp={singleApp}></App>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <img
                src={AppNotFound}
                alt="App Not Found"
                className="mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold">OPPS!! APP NOT FOUND</h1>
              <p className="text-gray-400">
                The App you are requesting is not found on our system. please
                try another apps
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn btn-outline btn-primary mt-4"
                >
                  Go Back!
                </button>
              )}
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Apps;
