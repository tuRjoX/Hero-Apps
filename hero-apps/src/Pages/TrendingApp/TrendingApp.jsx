import React from "react";
import { Link } from "react-router";
import App from "../App/App";

const TrendingApp = ({ data }) => {
  // Sort apps by downloads in descending order and get top 8
  const trendingApps = data
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8);

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent mb-4">
          Trending Apps
        </h1>
        <h2 className="text-gray-600 text-lg mb-2">
          Explore All Trending Apps on the Market developed by us
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center px-4">
        {trendingApps.map((singleApp, index) => (
          <div key={singleApp.id} className="relative">
            {index < 3 && (
              <div
                className={`absolute -top-2 -right-2 z-10 px-2 py-1 rounded-full text-xs font-bold text-white ${
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

      <div className="text-center mt-8">
        <Link
          to="/apps"
          onClick={() => {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 100);
          }}
        >
          <button className="btn btn-outline btn-primary mb-3">Show All</button>
        </Link>
      </div>
    </div>
  );
};

export default TrendingApp;
