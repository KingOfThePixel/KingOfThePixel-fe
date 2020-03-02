import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import LandingPage from './LandingPage/LandingPage';
import Login from './Forms/Login';
import Register from './Forms/Register';
import MeetTheTeam from './Team/MeetTheTeam';
import MainDashboard from './GameDashboard/Dashboard';

function App() {
  return (
    <Router>
      <Route exact path='/' component={LandingPage} />
      <Route path='/Login' component={Login} />
      <Route path='/Register' component={Register} />
      <Route path='/Project-Team' component={MeetTheTeam} />
      <Route path='/Dashboard' component={MainDashboard} />
    </Router>
  );
}

export default App;
