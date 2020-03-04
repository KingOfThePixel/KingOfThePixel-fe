import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';

import MainImage from '../Images/King of the pixel.png'
import Room from './components/Room'

import '../App.css';

const MainDashboard = () => {
    const [player, setPlayer] = useState({ name: "Tommy", hasGoblet: false, points: 0 })
    const [points, setPoints] = useState(0)
    const grabGoblet = () => {
        setPlayer({ ...player, hasGoblet: !player.hasGoblet })
    }

    useEffect(() => {
        if (player.hasGoblet == false) {
            return
        }
        const interval = setInterval(() => {
            setPoints(points => points + 1)
        }, 2000)
        return () => clearInterval(interval)

    }, [player.hasGoblet])
    return (
        <>
            <div className='main-dashboard-container'>
                <div className='main-dashboard-left-content'>
                    <img className='main-dashboard-logo' src={MainImage} alt='King of the pixel' />
                    <p>{player.name}</p>
                    <p>Points: {points}</p>
                </div>
                <div className='main-dashboard-center-content'>
                    <Room goblet={player.hasGoblet} grabGoblet={grabGoblet} />
                </div>
                <div className='main-dashboard-right-content'>
                    <Link className='logout-button' to="/" onClick={() => localStorage.clear()}>
                        LOGOUT
                </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MainDashboard;
