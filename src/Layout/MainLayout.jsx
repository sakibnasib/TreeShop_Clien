import React from 'react';
import Navbar from '../components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='bg-white'>
            <Navbar></Navbar>
            <div className="pt-24 min-h-[calc(100vh-68px)]">
<Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;