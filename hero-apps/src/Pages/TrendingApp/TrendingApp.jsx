import React from "react";
import { Link } from "react-router";
import App from "../App/App";

const TrendingApp = ({ data }) => {
  const trendingApps = data
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8);

  return (
    <div className="my-6 sm:my-8 lg:my-10 px-4 sm:px-6 lg:px-20 bg-[#FFF0E18]">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent mb-4">
          Trending Apps
        </h1>
        <h2 className="text-gray-600 text-sm sm:text-base lg:text-lg mb-2 px-2">
          Explore All Trending Apps on the Market developed by us
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center px-2 sm:px-4">
        {trendingApps.map((singleApp, index) => (
          <div key={singleApp.id} className="relative">
            {index < 3 && (
              <div
                className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-10 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold text-white ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                    ? "bg-gray-400"
                    : "bg-orange-500"
                }`}
              >
                #{index + 1}
              </div>
            )}
            <App singleApp={singleApp} />
          </div>
        ))}
      </div>

      <div className="text-center mt-6 sm:mt-8">
        <Link
          to="/apps"
          onClick={() => {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
          }}
        >
          <button className="btn btn-outline btn-primary mb-3 text-sm sm:text-base hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2] hover:border-transparent hover:text-white transition-all duration-300">
            Show All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingApp;
