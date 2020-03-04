import React from 'react';
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';

import MainImage from '../Images/King of the pixel.png';
import Room from './components/Room'

import '../App.css';
import ChatRoom from './ChatRoom';

const MainDashboard = () => {
    return (
        <>
            <div className='main-dashboard-container'>
                <div className='main-dashboard-left-content'>
                    <img className='main-dashboard-logo' src={MainImage} alt='King of the pixel' />
                </div>
                <div className='main-dashboard-center-content'>
                    <Room />
                </div>
                <div className='main-dashboard-right-content'>
                    <div className='game-logout-button'>
                        <Link className='logout-button' to="/" onClick={() => localStorage.clear()}>
                            LOGOUT
                        </Link>
                    </div>
                    <ChatRoom />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MainDashboard;
