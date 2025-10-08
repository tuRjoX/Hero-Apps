import React from "react";
import Banner from "../../Components/Banner/Banner";
import TrendingApp from "../TrendingApp/TrendingApp";
import { useLoaderData } from "react-router";

const Home = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="text-center items-center mt-5 mx-auto">
      <Banner></Banner>
      <TrendingApp data={data}></TrendingApp>
      
    </div>
  );
};

export default Home;
