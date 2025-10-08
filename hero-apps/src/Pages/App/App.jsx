import React from "react";
import { GoDownload } from "react-icons/go";
import { FaStar, FaEye } from "react-icons/fa6";
import { Link } from "react-router";

const App = ({ singleApp }) => {
  // Helper function to format downloads
  const formatDownloads = (downloads) => {
    if (downloads >= 100000000) {
      return `${(downloads / 1000000000).toFixed(1)}B`;
    } else {
      return `${(downloads / 1000000).toFixed(1)}M`;
    }
  };

  return (
    <Link to={`/appDetails/${singleApp.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-[480px] w-[320px] mx-auto">
        {/* App Icon Container */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center h-[280px]">
          <div className="relative">
            <img
              src={singleApp.image}
              alt={singleApp.title}
              className="w-24 h-24 object-cover rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
          <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20"></div>
        </div>

        {/* App Information */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
            {singleApp.title}
          </h2>
          <p className="text-sm text-gray-500 mb-4 font-medium">
            by {singleApp.companyName}
          </p>

          <div className="flex items-center justify-between gap-3">
            {/* Downloads */}
            <div className="flex items-center bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 px-3 py-2 rounded-xl border border-emerald-100 flex-1">
              <GoDownload className="mr-2 text-lg" />
              <div className="flex flex-col">
                <span className="text-xs font-medium opacity-75">
                  Downloads
                </span>
                <span className="text-sm font-bold">
                  {formatDownloads(singleApp.downloads)}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 text-orange-500 px-3 py-2 rounded-xl border border-orange-100 flex-1">
              <FaStar className="mr-2 text-lg" />
              <div className="flex flex-col">
                <span className="text-xs font-medium opacity-75">Rating</span>
                <span className="text-sm font-bold">{singleApp.ratingAvg}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default App;
