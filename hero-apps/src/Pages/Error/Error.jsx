import React from 'react';
import Error404 from '../../assets/error-404.png';

const Error = () => {
    return (
        <div className='text-center mt-5 items-center my-auto'>
            <img src={Error404} alt="Error 404" className='mx-auto my-auto' />
            <h2 className='text-5xl font-bold mt-5'>Oops, page not found!</h2>
            <p className='text-lg mt-5'>The page you are looking for is not available.</p>
            <a href="/" className='btn btn-dash btn-primary mt-5'>Go back to Home</a>
        </div>
    );
};

export default Error;