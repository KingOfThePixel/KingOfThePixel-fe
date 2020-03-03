import React, { useState, useCallback, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import RoomUnitFloor from './RoomUnitFloor'
import RoomUnitWall from './RoomUnitWall'
import knight from '../../Images/knight.png'
const Room = () => {
    const [roomUnits, setRoomUnits] = useState([[1, 1, 1, 1, 1, 0, 1, 1, 0, 1], [1, 0, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 0, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1, 0, 1, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]])
    const [activeRoom, setActiveRoom] = useState({ array: 0, index: 0 })
    const move = (event, key) => {
        let player = document.getElementById('player-unit')
        let left_position = parseInt(player.style.left.split('px')[0])
        let top_position = parseInt(player.style.top.split('px')[0])
        if (key == 'right' && roomUnits[activeRoom.array][activeRoom.index + 1] == 1) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index + 1 })
            player.style.left = `${left_position + 32}px`
        } else if (key == 'left' && roomUnits[activeRoom.array][activeRoom.index - 1] == 1) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index - 1 })
            player.style.left = `${left_position - 32}px`
        } else if (key == 'up' && roomUnits[activeRoom.array - 1] != undefined && roomUnits[activeRoom.array - 1][activeRoom.index] == 1) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array - 1 })
            player.style.top = `${top_position - 32}px`
        } else if (key == 'down' && roomUnits[activeRoom.array + 1] != undefined && roomUnits[activeRoom.array + 1][activeRoom.index] == 1) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array + 1 })
            player.style.top = `${top_position + 32}px`
        }
        console.log(left_position)
    }


    return (
        <>
            <div className="room">
                <KeyboardEventHandler
                    handleKeys={['down', 'right', 'left', 'up']}
                    onKeyEvent={(key, e) => move(e, key)} />
                <div id="player-unit" style={{ zIndex: '1', position: 'absolute', left: '8px', top: '8px' }}>
                    <img src={knight} />
                </div>
                {roomUnits.map(array => {
                    return array.map((unit, i) => {
                        if (unit == 1) {
                            return <RoomUnitFloor key={i} />
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