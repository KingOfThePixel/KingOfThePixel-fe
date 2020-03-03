import React, { useState, useCallback, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import RoomUnitFloor from './RoomUnitFloor'
import RoomUnitWall from './RoomUnitWall'
const Room = () => {
    const [roomUnits, setRoomUnits] = useState([1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, , 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0])
    const [activeRoom, setActiveRoom] = useState(0)
    const move = (event, key) => {
        if (key == 'right') {
            if (roomUnits[activeRoom + 1] == 1) {
                setActiveRoom(activeRoom + 1)
                setRoomUnits([...roomUnits])
            }
        }
    }


    return (
        <>
            <div className="room">
                <KeyboardEventHandler
                    handleKeys={['down', 'right', 'left', 'up']}
                    onKeyEvent={(key, e) => move(e, key)} />
                {
                    roomUnits.map((unit, index) => {

                        if (unit == 1) {
                            if (index == activeRoom) {
                                return <RoomUnitFloor key={index} active={true} />
                            } else {
                                return <RoomUnitFloor key={index} active={false} />
                            }
                        } else {
                            return <RoomUnitWall key={index} />
                        }
                    })
                }
            </div>
        </>
    )
}

export default Room