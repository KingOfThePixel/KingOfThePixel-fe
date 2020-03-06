import React, { useState, useCallback, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import AxiosWithAuth from '../../Utils/AxiosWithAuth'
import RoomUnitFloor from './RoomUnitFloor'
import RoomUnitWall from './RoomUnitWall'
import knight from '../../Images/knight.png'
import king from '../../Images/king.png'

const Room = (props) => {
    const [roomUnits, setRoomUnits] = useState([[{ is_path: false }]])
    const [activeRoom, setActiveRoom] = useState({ array: 0, index: 0 })
    const [playerPosition, setPlayerPosition] = useState({ top: 8, left: 8 })
    let imageSrc = knight
    if (props.goblet == true) {
        imageSrc = king
        document.getElementById('player-unit').style.transition = 'left 2s, top 2s'
    }
    const move = (event, key) => {
        if (key == 'right' && roomUnits[activeRoom.array][activeRoom.index].e_to.is_path === true) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index + 1 })
            setPlayerPosition({ ...playerPosition, left: playerPosition.left + 32 })
        } else if (key == 'left' && roomUnits[activeRoom.array][activeRoom.index].w_to.is_path === true) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index - 1 })
            setPlayerPosition({ ...playerPosition, left: playerPosition.left - 32 })
        } else if (key == 'up' && roomUnits[activeRoom.array][activeRoom.index].n_to.is_path === true) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array - 1 })
            setPlayerPosition({ ...playerPosition, top: playerPosition.top - 32 })
        } else if (key == 'down' && roomUnits[activeRoom.array][activeRoom.index].s_to.is_path === true) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array + 1 })
            setPlayerPosition({ ...playerPosition, top: playerPosition.top + 32 })
        }

    }

    useEffect(() => {
        AxiosWithAuth()
            .get('/api/adv/maps')
            .then(matrix => {
                setRoomUnits(matrix.data.map)
                let spawn_rooms = []
                matrix.data.map.forEach((array, j) => {
                    array.forEach((room, i) => {
                        if (room.is_spawn == true) {
                            spawn_rooms.push({ array: j, index: i })
                        }
                    })
                })

                let player_position = spawn_rooms[Math.floor(Math.random() * spawn_rooms.length - 1)]
                setActiveRoom(player_position)
                setPlayerPosition({ top: playerPosition.top + (32 * player_position.array), left: playerPosition.left + (32 * player_position.index) })
            })
            .catch(err => {
                console.log(err)
            })
        AxiosWithAuth()
            .get('/api/adv/init')
            .then(response => {
                console.log(response.data)
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