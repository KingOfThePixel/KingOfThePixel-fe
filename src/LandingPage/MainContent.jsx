import React from 'react';
import { Link } from "react-router-dom";

import GameImage from '../Images/King of the pixel.png';

import '../App.css';

const MainLandingContent = () => {
  return (
    <div className='MainLandingContent'>
      <img className='main-content-game-image' src={GameImage} alt='King of the pixel'/> 
      <Link className='main-content-register' to='/login'>PLAY NOW</Link>
    </div>
  )
}

export default MainLandingContent;
