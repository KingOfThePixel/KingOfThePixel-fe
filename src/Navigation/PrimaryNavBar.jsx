import React from 'react';
import { Link } from "react-router-dom";

import Logo from '../Images/Logo.png'
import MeetTheTeam from '../Images/Meet the team.png'
import '../App.css';

const PrimaryNavBar = () => {
    return (
        <div className='PrimaryNavigation'>
            <Link className='primary-navigation-left-content' to='/'>
                <img className='logo' src={Logo} alt='king of the pixel logo'/>
                <h1 className='game-title'>King Of The Pixel</h1>
            </Link>
            <div className='primary-navigation-right-content'>
                <img className='meet-the-team-icon' src={MeetTheTeam} alt='Meet the team' />
                <Link className='meet-the-team-link' to='/project-team'> Meet The Team </Link>
                <Link className='login-button' to='/login'> Login </Link>
            </div>
        </div>
    );
}

export default PrimaryNavBar;
