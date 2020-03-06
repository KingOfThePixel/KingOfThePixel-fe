import React, { useState, useCallback, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import AxiosWithAuth from '../../Utils/AxiosWithAuth'
import RoomUnitFloor from './RoomUnitFloor'
import RoomUnitWall from './RoomUnitWall'
import knight from '../../Images/knight.png'
import king from '../../Images/king.png'
import axiosWithAuth from '../../Utils/AxiosWithAuth';

const Room = (props) => {
    const [roomUnits, setRoomUnits] = useState([[{ is_path: false }]])
    const [activeRoom, setActiveRoom] = useState({})
    const [playerPosition, setPlayerPosition] = useState({ top: 0, left: 0 })
    let imageSrc = knight
    if (props.goblet == true) {
        imageSrc = king
        document.getElementById('player-unit').style.transition = 'left 2s, top 2s'
    }
    const move = (event, key) => {
        if (key == 'right') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 'e' })
                .then(east => {

                    setPlayerPosition({ top: (east.data.y * 32), left: (east.data.x * 32) })
                    setActiveRoom(roomUnits[east.y][east.x])

                })
                .catch(err => {
                    console.log(err)
                })
        } else if (key == 'left') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 'w' })
                .then(west => {

                    setPlayerPosition({ top: (west.data.y * 32), left: (west.data.x * 32) })
                    setActiveRoom(roomUnits[west.y][west.x])

                })
                .catch(err => {
                    console.log(err)
                })
        } else if (key == 'up') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 'n' })
                .then(north => {
                    setPlayerPosition({ top: (north.data.y * 32), left: (north.data.x * 32) })
                    setActiveRoom(roomUnits[north.y][north.x])

                })
                .catch(err => {
                    console.log(err)
                })
        } else if (key == 'down') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 's' })
                .then(south => {
                    console.log(south)
                    setPlayerPosition({ top: (south.data.y * 32), left: (south.data.x * 32) })
                    setActiveRoom(roomUnits[south.y][south.x])

                })
                .catch(err => {
                    console.log(err)
                })
        }

    }

    useEffect(() => {
        AxiosWithAuth()
            .get('/api/adv/maps')
            .then(matrix => {
                setRoomUnits(matrix.data.map)

            })
            .catch(err => {
                console.log(err)
            })
        AxiosWithAuth()
            .get('/api/adv/init')
            .then(response => {
                console.log(response)
                setPlayerPosition({ top: (response.data.y * 32), left: (response.data.x * 32) })
                setActiveRoom(roomUnits[response.y][response.x])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <div className="room">
                <KeyboardEventHandler
                    handleKeys={['down', 'right', 'left', 'up']}
                    onKeyEvent={(key, e) => move(e, key)} />
                <div id="player-unit" style={{ zIndex: '1', position: 'absolute', left: playerPosition.left + 'px', top: playerPosition.top + 'px', transition: 'left .75s, top .75s' }}>
                    <img src={imageSrc} />
                </div>
                {roomUnits.map((array, j) => {
                    return array.map((unit, i) => {
                        console.log('x', unit.x, 'y', unit.y)
                        if (unit.is_path == true) {
                            return <RoomUnitFloor key={i} itemId={unit.item_id} />
                        } else {
                            return <RoomUnitWall key={i} />
                        }
                    })
                })}

            </div>
        </>
    )
}

export default Room