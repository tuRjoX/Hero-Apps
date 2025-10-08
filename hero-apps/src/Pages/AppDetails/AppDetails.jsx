import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router";
import Downloads from "../../assets/icon-downloads.png";
import Ratings from "../../assets/icon-ratings.png";
import Review from "../../assets/icon-review.png";
import AppNotFound from "../../assets/App-Error.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { addToStoredDB, isAppInstalled } from "../../Utility/addToDB";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppDetails = () => {
  const { id } = useParams();
  const data = useLoaderData();
  const singleApp = data.find((app) => app.id == parseInt(id));

  const [installed, setInstalled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInstalled(isAppInstalled(id));
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  const handleInstall = (appId) => {
    if (!installed) {
      const success = addToStoredDB(appId);
      if (success) {
        setInstalled(true);
        toast.success(`${singleApp.title} has been installed successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-[#632EE3] mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading App Details
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch the app information...
          </p>
        </div>
      </div>
    );
  }

  if (!singleApp) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src={AppNotFound}
            alt="App Not Found"
            className="w-64 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            App Not Found
          </h1>
          <p className="text-gray-500">
            The app you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const {
    title,
    image,
    description,
    ratingAvg,
    downloads,
    companyName,
    reviews,
    ratings,
    size,
  } = singleApp;

  // Helper function to format downloads
  const formatDownloads = (downloads) => {
    if (downloads >= 100000000) {
      return `${(downloads / 1000000000).toFixed(1)}B`;
    } else {
      return `${(downloads / 1000000).toFixed(1)}M`;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 px-4 sm:px-6 lg:px-20">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] object-cover rounded-2xl"
          />
        </div>
        <div className="w-full lg:w-auto text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            {title}
          </h1>
          <p className="text-sm sm:text-base">
            <span className="font-semibold text-gray-400">Developed By : </span>
            <span className="font-medium bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
              {companyName}
            </span>
          </p>
          <hr className="my-4 text-gray-300" />
          <div className="grid grid-cols-3 gap-2 sm:gap-5 my-5">
            <div className="items-center mx-auto text-center">
              <img
                src={Downloads}
                alt="Downloads"
                className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2"
              />
              <p className="text-xs sm:text-sm text-gray-600">Downloads</p>
              <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">
                {formatDownloads(downloads)}
              </h1>
            </div>
            <div className="items-center mx-auto text-center">
              <img
                src={Ratings}
                alt="Average Ratings"
                className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2"
              />
              <p className="text-xs sm:text-sm text-gray-600">
                Average Ratings
              </p>
              <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">
                {ratingAvg}
              </h1>
            </div>
            <div className="items-center mx-auto text-center">
              <img
                src={Review}
                alt="Total Reviews"
                className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2"
              />
              <p className="text-xs sm:text-sm text-gray-600">Total Reviews</p>
              <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">
                {reviews}
              </h1>
            </div>
          </div>
          <button
            onClick={() => handleInstall(id)}
            disabled={installed}
            className={`btn w-full sm:w-auto text-sm sm:text-base ${
              installed
                ? "btn-disabled bg-gray-400 text-white"
                : "btn-outline btn-accent hover:bg-gradient-to-r hover:from-[#632EE3] hover:to-[#9F62F2] hover:border-transparent hover:text-white transition-all duration-300"
            }`}
          >
            {installed ? "Installed" : `Install Now (${size} MB)`}
          </button>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="container mx-auto my-5 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-lg sm:text-xl mb-4 text-center lg:text-left">
          Ratings
        </h1>
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm overflow-x-auto">
          <ResponsiveContainer width="100%" height={250} minWidth={300}>
            <BarChart
              data={ratings}
              margin={{
                top: 20,
                right: 15,
                left: 15,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis
                tick={{ fontSize: 10 }}
                axisLine={{ stroke: "#e0e0e0" }}
                tickFormatter={(value) => `${value / 1000000}M`}
              />
              <Tooltip
                formatter={(value) => [value.toLocaleString(), "Count"]}
                labelStyle={{ color: "#333" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="count"
                fill="#FF8C00"
                radius={[4, 4, 0, 0]}
                stroke="#FF8C00"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="container mx-auto my-5 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-lg sm:text-xl mb-4">Description</h1>
        <p className="text-sm sm:text-base text-justify mt-2 text-gray-600 mb-5 leading-relaxed">
          {description}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppDetails;
