import React from 'react';

import PrimaryNavBar from '../Navigation/PrimaryNavBar';
import TeamMembers from '../Team/TeamMembers'
import Footer from '../Footer/Footer'

import '../App.css';
 
const MeetTheTeam = () => {
  return (
    <div>
        <PrimaryNavBar />
        <TeamMembers />
        <Footer />
    </div>
  );
}

export default MeetTheTeam;
