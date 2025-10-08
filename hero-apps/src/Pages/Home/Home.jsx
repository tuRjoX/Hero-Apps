import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Apps from '../Apps/Apps';
import { useLoaderData } from 'react-router';

const Home = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className='text-center items-center mt-5 mx-auto'>
            <Banner></Banner>
            <Apps data={data}></Apps>
        </div>
    );
};

export default Home;