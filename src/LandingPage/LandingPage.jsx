import React from 'react';

import PrimaryNavBar from '../Navigation/PrimaryNavBar';
import MainContent from './MainContent'
import Footer from '../Footer/Footer';


const LandingPage = () => {
  return (
    <div className='landingPage'>
      <PrimaryNavBar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default LandingPage;
