import React, { useState, useCallback, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import AxiosWithAuth from '../../Utils/AxiosWithAuth'
import RoomUnitFloor from './RoomUnitFloor'
import RoomUnitWall from './RoomUnitWall'
import knight from '../../Images/knight.png'
import king from '../../Images/king.png'

const Room = (props) => {
    const [roomUnits, setRoomUnits] = useState([[{ room: 0 }]])
    const [activeRoom, setActiveRoom] = useState({ array: 0, index: 0 })
    const [playerPosition, setPlayerPosition] = useState({ top: 8, left: 8 })
    let imageSrc = knight
    if (props.goblet == true) {
        imageSrc = king
        document.getElementById('player-unit').style.transition = 'left 2s, top 2s'
    }
    const move = (event, key) => {
        let player = document.getElementById('player-unit')
        let left_position = parseInt(player.style.left.split('px')[0])
        let top_position = parseInt(player.style.top.split('px')[0])
        if (key == 'right' && roomUnits[activeRoom.array][activeRoom.index + 1] != undefined && roomUnits[activeRoom.array][activeRoom.index + 1].e_to != null) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index + 1 })
            player.style.left = `${left_position + 32}px`
        } else if (key == 'left' && roomUnits[activeRoom.array][activeRoom.index - 1] != undefined && roomUnits[activeRoom.array][activeRoom.index - 1].w_to != null) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index - 1 })
            player.style.left = `${left_position - 32}px`
        } else if (key == 'up' && roomUnits[activeRoom.array - 1] != undefined && roomUnits[activeRoom.array - 1][activeRoom.index].n_to != null) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array - 1 })
            player.style.top = `${top_position - 32}px`
        } else if (key == 'down' && roomUnits[activeRoom.array + 1] != undefined && roomUnits[activeRoom.array + 1][activeRoom.index].s_to != null) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array + 1 })
            player.style.top = `${top_position + 32}px`
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
                setPlayerPosition({ top: playerPosition.top + (32 * player_position.array), left: playerPosition.left + (32 * player_position.index) })
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
                            if (unit.is_spawn == true) {
                                console.log(unit)
                            }
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