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

  useEffect(() => {
    setInstalled(isAppInstalled(id));
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
              <h1 className="font-bold text-3xl">{downloads}</h1>
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
        <p className="text-justify mt-2 text-gray-600 mb-5">
          {description}
          it builds a complete environment for deep work, minimizing
          distractions and maximizing concentration. Users can create custom
          work and break intervals, track how many sessions they complete each
          day, and review detailed statistics about their focus habits over
          time. The design is minimal and calming, reducing cognitive load so
          you can focus entirely on the task at hand. Notifications gently let
          you know when to pause and when to resume, helping you maintain a
          healthy rhythm between work and rest. A unique feature of this app is
          the integration of task lists with timers. You can assign each task to
          a specific Pomodoro session, making your schedule more structured. The
          built-in analytics show not only how much time you’ve worked but also
          which tasks consumed the most energy. This allows you to reflect on
          your efficiency and adjust your workflow accordingly. The app also
          includes optional background sounds such as white noise, nature
          sounds, or instrumental music to create a distraction-free atmosphere.
          For people who struggle with procrastination, the app provides
          motivational streaks and achievements. Completing multiple Pomodoro
          sessions unlocks milestones, giving a sense of accomplishment. This
          gamified approach makes focusing more engaging and less like a chore.
          Whether you’re studying for exams, coding, writing, or handling office
          work, the app adapts to your routine. By combining focus tracking,
          task management, and motivational tools, this Pomodoro app ensures
          that you not only work harder but also smarter. It is a personal
          trainer for your brain, keeping you disciplined, refreshed, and
          productive throughout the day.
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppDetails;
