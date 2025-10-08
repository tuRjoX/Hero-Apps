import React, { useState, useEffect } from "react";
import { getInstalledApps, removeFromDB } from "../../Utility/addToDB";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Installation = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [allAppsData, setAllAppsData] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

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
        // Keep original order
        break;
    }

    setInstalledApps(sortedApps);
  };

  if (loading) {
    return (
      <div className="text-center mt-20">
        <div className="loading loading-spinner loading-lg"></div>
        <p className="mt-4">Loading your installed apps...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">Your Installed Apps</h1>
          <p className="text-gray-600">Explore All Trending Apps on the Market developed by us</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">
            {installedApps.length} App{installedApps.length !== 1 ? "s" : ""}{" "}
            Installed
          </h2>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-outline">
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
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Apps Installed
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't installed any apps yet.
            </p>
            <a href="/apps" className="btn btn-primary">
              Browse Apps
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {installedApps.map((app) => (
              <div
                key={app.id}
                className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center p-6">
                  <h3 className="card-title text-lg mb-2">{app.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    by {app.companyName}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">{app.size} MB</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
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
                      <span>{(app.downloads / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>

                  <div className="card-actions w-full">
                    <button
                      onClick={() => handleUninstall(app.id, app.title)}
                      className="btn btn-error btn-outline w-full"
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
