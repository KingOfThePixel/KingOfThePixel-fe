import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';

import MainImage from '../Images/King of the pixel.png';
import Room from './components/Room'

import '../App.css';
import ChatRoom from './ChatRoom';

const MainDashboard = () => {
    const [player, setPlayer] = useState({ name: "Tommy", hasGoblet: false })

    const grabGoblet = () => {
        setPlayer({ ...player, hasGoblet: !player.hasGoblet })
    }
    return (
        <>
            <div className='main-dashboard-container'>
                <div className='main-dashboard-left-content'>
                    <img className='main-dashboard-logo' src={MainImage} alt='King of the pixel' />
                </div>
                <div className='main-dashboard-center-content'>
                    <p>Center Content</p>
                    <Room goblet={player.hasGoblet} grabGoblet={grabGoblet} />
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
