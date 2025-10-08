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
    <div className="min-h-screen bg-base-100 px-100">
      <div className="flex justify-center items-center gap-10 p-10">
        <div>
          <img
            src={image}
            alt={title}
            className="w-[350px] h-[350px] object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p>
            <span className="font-semibold text-gray-400">Developed By : </span>
            <span className="font-medium bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
              {companyName}
            </span>
          </p>
          <hr className="my-4 text-gray-300" />
          <div className="grid grid-cols-3 gap-5 my-5">
            <div className="items-center mx-auto">
              <img src={Downloads} alt="Downloads" />
              <p>Downloads</p>
              <h1 className="font-bold text-3xl">
                {formatDownloads(downloads)}
              </h1>
            </div>
            <div className="items-center mx-auto">
              <img src={Ratings} alt="Average Ratings" />
              <p>Average Ratings</p>
              <h1 className="font-bold text-3xl">{ratingAvg}</h1>
            </div>
            <div className="items-center mx-auto">
              <img src={Review} alt="Total Reviews" />
              <p>Total Reviews</p>
              <h1 className="font-bold text-3xl">{reviews}</h1>
            </div>
          </div>
          <button
            onClick={() => handleInstall(id)}
            disabled={installed}
            className={`btn ${
              installed
                ? "btn-disabled bg-gray-400 text-white"
                : "btn-outline btn-accent"
            }`}
          >
            {installed ? "Installed" : `Install Now (${size} MB)`}
          </button>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="container mx-auto my-5 px-4">
        <h1 className="font-bold text-xl mb-4">Ratings</h1>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={ratings}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 14 }}
                axisLine={{ stroke: "#e0e0e0" }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
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
      <div className="container mx-auto my-5 px-4">
        <h1 className="font-bold text-xl">Description</h1>
        <p className="text-justify mt-2 text-gray-600 mb-5">{description}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppDetails;
