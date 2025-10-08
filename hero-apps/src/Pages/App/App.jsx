import React from "react";
import { GoDownload } from "react-icons/go";
import { FaStar } from "react-icons/fa6";

const App = ({ singleApp }) => {
  return (
    <div className="card bg-base-100shadow-sm hover:shadow-xl h-[435px] w-[350px]">
      <figure className="m-2 h-[315px] bg-gray-100 p-4 rounded-lg">
        <img src={singleApp.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{singleApp.title}</h2>
      </div>
      <div className="card-actions justify-between p-4 gap-4">
        <h1 className="flex items-center bg-[#F1F5E8] text-[#00D390] px-1 rounded-lg">
          <GoDownload className="mr-1" />
          {singleApp.downloads}{" "}
        </h1>
        <h1 className="flex items-center bg-[#FFF0E1] text-[#FF8811] px-1 rounded-lg">
          <FaStar className="mr-1" />
          {singleApp.ratingAvg}
        </h1>
      </div>
    </div>
  );
};

export default App;
