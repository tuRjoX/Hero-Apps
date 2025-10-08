import React from 'react';
import Navbar from '../../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Footer/Footer';
import Error from '../Error/Error';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet>
                <Error></Error>
            </Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;