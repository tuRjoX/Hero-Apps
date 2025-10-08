import React from "react";
import Hero from "../../assets/hero.png";
import AppStore from "../../assets/appstore.png";
import GooglePlay from "../../assets/playstore.png";

const Banner = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight">
        We Build <br />
        <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
          Productive
        </span>{" "}
        Apps
      </h1>
      <p className="mt-4 text-[#627382] text-center text-sm sm:text-base lg:text-lg max-w-4xl mx-auto px-4">
        At HERO.IO , we craft innovative apps designed to make everyday life
        simpler, smarter, and more exciting. <br className="hidden sm:block" />
        Our goal is to turn your ideas into digital experiences that truly make
        an impact.
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
        <a
          href="https://play.google.com/store/apps/details?id=learn.programming.courses&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="btn py-2 px-4 rounded flex items-center gap-2 hover:scale-105 transition-transform duration-200 w-full sm:w-auto justify-center"
        >
          <img src={GooglePlay} alt="Google Play" className="h-[20px]" />
          <span>Google Play</span>
        </a>
        <a
          href="https://apps.apple.com/us/app/neptune-by-programming-hero/id1639834172"
          target="_blank"
          rel="noopener noreferrer"
          className="btn py-2 px-4 rounded flex items-center gap-2 hover:scale-105 transition-transform duration-200 w-full sm:w-auto justify-center"
        >
          <img src={AppStore} alt="App Store" className="h-[20px]" />
          <span>App Store</span>
        </a>
      </div>
      <img
        src={Hero}
        alt="Hero Image"
        className="justify-center mx-auto mt-5 w-full max-w-2xl h-auto px-4"
      />
      <div className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] p-6 sm:p-8 md:p-12 lg:p-20 -mx-4 sm:-mx-6 lg:-mx-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-white mb-6">
          Trusted by Millions, Built for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 text-white text-center mt-6 sm:mt-10 pt-5">
          <div className="px-4">
            <p className="text-sm sm:text-base">Total Downloads</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-3 sm:my-4">
              29.6M
            </h1>
            <p className="text-xs sm:text-sm">21% more than last month</p>
          </div>
          <div className="px-4">
            <p className="text-sm sm:text-base">Total Reviews</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-3 sm:my-4">
              906K
            </h1>
            <p className="text-xs sm:text-sm">46% more than last month</p>
          </div>
          <div className="px-4">
            <p className="text-sm sm:text-base">Active Apps</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold my-3 sm:my-4">
              132+
            </h1>
            <p className="text-xs sm:text-sm">31 more will Launch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
