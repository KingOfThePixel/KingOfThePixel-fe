import React, { useState, useCallback, useEffect } from 'react'
import Pusher from 'pusher-js'
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
    const [player, setPlayer] = useState({ name: '', item: 0, id: 0 })
    const [players, setPlayers] = useState([])

    let imageSrc = knight
    if (player.item == 1) {
        imageSrc = king
        document.getElementById('player-unit').style.transition = 'left 2s, top 2s'
    } else {
        imageSrc = knight
    }
    const move = (event, key) => {
        console.log(activeRoom)
        if (key == 'right') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 'e' })
                .then(east => {
                    console.log(east)
                    setPlayerPosition({ top: 8 + (east.data.y * 32), left: 8 + (east.data.x * 32) })
                    setActiveRoom(roomUnits[east.data.y][east.data.x])
                    if (activeRoom.item_id === 1) {
                        axiosWithAuth()
                            .post('/api/adv/grab', { room_id: activeRoom.id, player_id: player.id, item_id: 1 })
                            .then(response => {
                                setPlayer({ ...player, item: 1 })
                                props.grabGoblet()
                                console.log(response)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (key == 'left') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 'w' })
                .then(west => {

                    setPlayerPosition({ top: 8 + (west.data.y * 32), left: 8 + (west.data.x * 32) })
                    setActiveRoom(roomUnits[west.data.y][west.data.x])
                    if (activeRoom.item_id === 1) {
                        axiosWithAuth()
                            .post('/api/adv/grab', { room_id: activeRoom.id, player_id: player.id, item_id: 1 })
                            .then(response => {
                                setPlayer({ ...player, item: 1 })
                                props.grabGoblet()
                                console.log(response)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        } else if (key == 'up') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 'n' })
                .then(north => {
                    setPlayerPosition({ top: 8 + (north.data.y * 32), left: 8 + (north.data.x * 32) })
                    setActiveRoom(roomUnits[north.data.y][north.data.x])
                    if (activeRoom.item_id === 1) {
                        axiosWithAuth()
                            .post('/api/adv/grab', { room_id: activeRoom.id, player_id: player.id, item_id: 1 })
                            .then(response => {
                                setPlayer({ ...player, item: 1 })
                                props.grabGoblet()
                                console.log(response)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        } else if (key == 'down') {
            axiosWithAuth()
                .post('/api/adv/move', { direction: 's' })
                .then(south => {

                    setPlayerPosition({ top: 8 + (south.data.y * 32), left: 8 + (south.data.x * 32) })
                    setActiveRoom(roomUnits[south.data.y][south.data.x])
                    if (activeRoom.item_id === 1) {
                        axiosWithAuth()
                            .post('/api/adv/grab', { room_id: activeRoom.id, player_id: player.id, item_id: 1 })
                            .then(response => {
                                setPlayer({ ...player, item: 1 })
                                props.grabGoblet()
                                console.log(response)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }

                })
                .catch(err => {
                    console.log(err)
                })
        } else if (key == 'q') {
            axiosWithAuth()
                .post('/api/adv/drop', { player_id: player.id, item_id: 1, room_id: activeRoom.id })
                .then(response => {
                    setPlayer({ ...player, item: 0 })
                    props.grabGoblet()
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }


    useEffect(() => {
        AxiosWithAuth()
            .get('/api/adv/init')
            .then(response => {
                // props.setPlayerName({ ...props.player, name: response.data.name })
                setPlayer({ ...player, name: response.data.name, id: response.data.uuid })
                setPlayerPosition({ top: 8 + (response.data.y * 32), left: 8 + (response.data.x * 32) })
                setActiveRoom(roomUnits[response.data.y][response.data.x])
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        AxiosWithAuth()
            .get('/api/adv/maps')
            .then(matrix => {
                setRoomUnits(matrix.data.map)

            })
            .catch(err => {
                console.log(err)
            })

    }, [player.item])

    const pusher = new Pusher("6330e86b46dfcf65d7c3", {
        cluster: 'us2',
        forceTLS: true
    });
    const channel = pusher.subscribe('coords');
    channel.bind('move',
        function (data) {
            if (data.players.length > 1) {
                setPlayers(data.players)

            }


        })


    useEffect(() => {
        AxiosWithAuth()
            .get('./api/adv/coords')
            .then(response => {
                setPlayers(response.data.players)
            })
            .catch(err => console.log(err))
    }, [])

    // useEffect(() => {

    //     const interval = setInterval(() => {
    //         AxiosWithAuth()
    //             .get('./api/adv/coords')
    //             .then(response => {
    //                 setPlayers(response.data.players)
    //             })
    //             .catch(err => console.log(err))
    //     }, 250)
    //     return () => clearInterval(interval)

    // }, [])

    return (
        <>
            <div className="room">
                <KeyboardEventHandler
                    handleKeys={['down', 'right', 'left', 'up', 'q']}
                    onKeyEvent={(key, e) => move(e, key)} />
                <div id="player-unit" style={{ zIndex: '1', position: 'absolute', left: playerPosition.left + 'px', top: playerPosition.top + 'px', transition: 'left .75s, top .75s' }}>
                    <img src={imageSrc} />
                </div>
                {players.map(player => {
                    return <div style={{ zIndex: '1', position: 'absolute', left: player.x * 32 + 8 + 'px', top: player.y * 32 + 8 + 'px', transition: 'left .75s, top .75s' }} key={player.id}>
                        <img src={knight} />
                    </div>
                })}
                {roomUnits.map((array, j) => {
                    return array.map((unit, i) => {
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