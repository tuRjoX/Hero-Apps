import React from 'react';
import Hero from '../../assets/hero.png';
import AppStore from '../../assets/appstore.png';
import GooglePlay from '../../assets/playstore.png';

const Banner = () => {
    return (
        <div>
            <h1 className='text-7xl font-bold'>We Build <br /><span className='bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent'>Productive</span> Apps</h1>
            <p className='mt-4 text-[#627382]'>At HERO.IO , we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. <br />Our goal is to turn your ideas into digital experiences that truly make an impact.</p>
            <div className='mt-5 flex gap-4 justify-center'>
                <button className='btn py-2 px-4 rounded'><img src={GooglePlay} alt="Google Play" className='h-[20px]' /> <span>Google Play</span></button>
                <button className='btn py-2 px-4 rounded'><img src={AppStore} alt="App Store" className='h-[20px]' /> <span>App Store</span></button>
            </div>
            <img src={Hero} alt="Hero Image" className='justify-center mx-auto mt-5' />
            <div className=' bg-gradient-to-r from-[#632EE3] to-[#9F62F2] p-[80px]'>
                <h2 className='text-4xl font-semibold text-center text-white'>Trusted by Millions, Built for You</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-white text-center mt-10 pt-5'>
                    <div>
                        <p>Total Downloads</p>
                        <h1 className='text-5xl font-bold'>29.6M</h1>
                        <p>21% more than last month</p>
                    </div>
                    <div>
                        <p>Total Reviews</p>
                        <h1 className='text-5xl font-bold'>906K</h1>
                        <p>46% more than last month</p>
                    </div>
                    <div>
                        <p>Active Apps</p>
                        <h1 className='text-5xl font-bold'>132+</h1>
                        <p>31 more will Launch46% more than last month</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;