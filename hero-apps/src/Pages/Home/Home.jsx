import React, { useState, useEffect } from "react";
import Banner from "../../Components/Banner/Banner";
import TrendingApp from "../TrendingApp/TrendingApp";
import { useLoaderData } from "react-router";

const Home = () => {
  const data = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-[#632EE3] mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Welcome to HERO.IO
          </h2>
          <p className="text-gray-500">Loading amazing apps just for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center items-center mt-5 mx-auto">
      <Banner></Banner>
      <TrendingApp data={data}></TrendingApp>
    </div>
  );
};

export default Home;
