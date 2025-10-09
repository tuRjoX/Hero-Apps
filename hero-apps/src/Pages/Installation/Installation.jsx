import React, { useState, useEffect } from "react";
import { getInstalledApps, removeFromDB } from "../../Utility/addToDB";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Installation = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [allAppsData, setAllAppsData] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

  const formatDownloads = (downloads) => {
    if (downloads >= 100000000) {
      return `${(downloads / 1000000000).toFixed(1)}B`;
    } else {
      return `${(downloads / 1000000).toFixed(1)}M`;
    }
  };

  useEffect(() => {
    fetch("/appData.json")
      .then((response) => response.json())
      .then((data) => {
        setAllAppsData(data);
        const installedIds = getInstalledApps();
        const installedAppsDetails = data.filter((app) =>
          installedIds.includes(app.id)
        );
        setInstalledApps(installedAppsDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching apps data:", error);
        setLoading(false);
      });
  }, []);

  const loadInstalledApps = (appsData = allAppsData) => {
    const installedIds = getInstalledApps();
    const installedAppsDetails = appsData.filter((app) =>
      installedIds.includes(app.id)
    );
    setInstalledApps(installedAppsDetails);
  };

  const handleUninstall = (appId, appTitle) => {
    const success = removeFromDB(appId);
    if (success) {
      loadInstalledApps();
      toast.error(`${appTitle} has been uninstalled successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    let sortedApps = [...installedApps];

    switch (order) {
      case "highToLow":
        sortedApps.sort((a, b) => b.downloads - a.downloads);
        break;
      case "lowToHigh":
        sortedApps.sort((a, b) => a.downloads - b.downloads);
        break;
      default:
        break;
    }

    setInstalledApps(sortedApps);
    document.activeElement.blur();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-[#632EE3] mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Installed Apps
          </h2>
          <p className="text-gray-500">
            Please wait while we fetch your installed applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Your Installed Apps
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
            {installedApps.length} App{installedApps.length !== 1 ? "s" : ""}{" "}
            Installed
          </h2>

          <div className="dropdown dropdown-end w-full sm:w-auto flex justify-center sm:justify-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline text-sm sm:text-base"
            >
              Sort by Downloads
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg border"
            >
              <li>
                <a
                  onClick={() => handleSort("highToLow")}
                  className={sortOrder === "highToLow" ? "active" : ""}
                >
                  High to Low
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleSort("lowToHigh")}
                  className={sortOrder === "lowToHigh" ? "active" : ""}
                >
                  Low to High
                </a>
              </li>
            </ul>
          </div>
        </div>

        {installedApps.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg
                className="w-24 h-24 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">
              No Apps Installed
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6 px-4">
              You haven't installed any apps yet.
            </p>
            <a href="/apps" className="btn btn-primary text-sm sm:text-base">
              Browse Apps
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {installedApps.map((app) => (
              <div
                key={app.id}
                className="card bg-white shadow-lg transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,46,227,0.4),0_10px_25px_rgba(159,98,242,0.3)]"
              >
                <div className="flex items-center p-4 sm:p-6">
                  {/* App Icon */}
                  <div className="flex-shrink-0 mr-3 sm:mr-4">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-xl"
                    />
                  </div>

                  {/* App Info */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      {app.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{formatDownloads(app.downloads)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{app.ratingAvg}</span>
                      </div>
                      <span className="text-gray-400">{app.size} MB</span>
                    </div>
                  </div>

                  {/* Uninstall Button */}
                  <div className="flex-shrink-0 ml-2 sm:ml-4">
                    <button
                      onClick={() => handleUninstall(app.id, app.title)}
                      className="btn btn-error btn-outline btn-sm sm:btn-base text-xs sm:text-sm hover:bg-red-500 hover:border-red-500 transition-all duration-300"
                    >
                      Uninstall
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default Installation;
