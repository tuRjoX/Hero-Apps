import React from "react";
import { GoDownload } from "react-icons/go";
import { FaStar, FaEye } from "react-icons/fa6";
import { Link } from "react-router";

const App = ({ singleApp }) => {
  const formatDownloads = (downloads) => {
    if (downloads >= 100000000) {
      return `${(downloads / 1000000000).toFixed(1)}B`;
    } else {
      return `${(downloads / 1000000).toFixed(1)}M`;
    }
  };

  return (
    <Link to={`/appDetails/${singleApp.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-[450px] sm:h-[400px] w-[280px] sm:w-[320px] mx-auto relative hover:shadow-[0_20px_50px_rgba(99,46,227,0.4),0_10px_25px_rgba(159,98,242,0.3)]">
        {/* App Icon Container */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 flex items-center justify-center h-[340px] sm:h-[280px]">
          <div className="relative">
            <img
              src={singleApp.image}
              alt={singleApp.title}
              className="w-50 h-50 sm:w-60 sm:h-60 object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>

        {/* App Information */}
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
            {singleApp.title}
          </h2>

          <div className="flex items-center justify-between gap-3 mt-5">
            {/* Downloads */}
            <div className="flex items-center bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-600 p-1 rounded-lg border border-emerald-100">
              <GoDownload className="mr-2" />
              <div className="flex flex-col">
                <span className="text-sm font-bold">
                  {formatDownloads(singleApp.downloads)}
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center bg-gradient-to-r from-amber-50 to-orange-50 text-orange-500 p-1 rounded-lg border border-orange-100 ">
              <FaStar className="mr-2" />
              <div className="flex flex-col">
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
