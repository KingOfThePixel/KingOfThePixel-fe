import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import { Button, Grid, Segment, Label, Divider } from 'semantic-ui-react';
import AxiosWithAuth from '../Utils/AxiosWithAuth'

import MainImage from '../Images/King of the pixel.png';
import Up from '../Images/up.png';
import Right from '../Images/right.png';
import Left from '../Images/left.png';
import Down from '../Images/down.png';

import Room from './components/Room'

import '../App.css';
import ChatRoom from './ChatRoom';

const MainDashboard = () => {
    const [player, setPlayer] = useState({ name: "", hasGoblet: false, points: 0 })
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

    useEffect(() => {
        AxiosWithAuth()
            .get('/api/adv/init')
            .then(response => {
                setPlayer({ ...player, name: response.data.name })

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className='main-dashboard-container'>
                <div className='main-dashboard-left-content'>
                    <div>
                        <img className='main-dashboard-logo' src={MainImage} alt='King of the pixel' />

                    </div>


                    <div>
                        <Grid>
                            <Grid.Column>
                                <Segment size='large'>
                                    <Label size='large' as='a' color='orange' ribbon>
                                        {player.name}
                                    </Label>
                                    <span>Current Points: {points}</span>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <Divider />
                        {/* <Button primary size='large'>Drop Goblet</Button> */}
                    </div>
                    <div className='game-directions'>
                        <p>Use arrow keys to move</p>
                        <p>Run over the goblet to pick it up</p>
                        <p>Use 'Q' to drop the goblet</p>
                    </div>
                    {/* <div className='direction-arrow-container'>
                        <div>
                            <img src={Up} alt='direction' className='direction-arrow'/>
                        </div>
                       
                        <div className='right-and-left-arrows'>
                            <div>
                                <img src={Left} alt='direction' className='direction-arrow' />
                            </div>
                            <div className='direction-arrows-logo'>
                            </div>
                            <div>
                                <img src={Right} alt='direction' className='direction-arrow' />
                            </div>
                            
                        </div>
                        
                        <div>
                            <img src={Down} alt='direction' className='direction-arrow' />
                        </div>
                    </div> */}
                </div>
                <div className='main-dashboard-center-content'>
                    <Room goblet={player.hasGoblet} grabGoblet={grabGoblet} setPlayerName={() => setPlayer()} player={player} />
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
