import React, { useState, useCallback, useEffect } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler';
import RoomUnitFloor from './RoomUnitFloor'
import RoomUnitWall from './RoomUnitWall'
import knight from '../../Images/knight.png'
import king from '../../Images/king.png'
const Room = (props) => {
    const [roomUnits, setRoomUnits] = useState([[1, 1, 1, 1, 1, 0, 1, 1, 0, 1], [1, 0, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 0, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 0, 1, 0, 1, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]])
    const [activeRoom, setActiveRoom] = useState({ array: 0, index: 0 })
    let imageSrc = knight
    if (props.goblet == true) {
        imageSrc = king
    }
    const move = (event, key) => {
        let player = document.getElementById('player-unit')
        let left_position = parseInt(player.style.left.split('px')[0])
        let top_position = parseInt(player.style.top.split('px')[0])
        if (key == 'right' && roomUnits[activeRoom.array][activeRoom.index + 1].room == 1) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index + 1 })
            player.style.left = `${left_position + 32}px`
        } else if (key == 'left' && roomUnits[activeRoom.array][activeRoom.index - 1].room == 1) {
            setActiveRoom({ ...activeRoom, index: activeRoom.index - 1 })
            player.style.left = `${left_position - 32}px`
        } else if (key == 'up' && roomUnits[activeRoom.array - 1] != undefined && roomUnits[activeRoom.array - 1][activeRoom.index].room == 1) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array - 1 })
            player.style.top = `${top_position - 32}px`
        } else if (key == 'down' && roomUnits[activeRoom.array + 1] != undefined && roomUnits[activeRoom.array + 1][activeRoom.index].room == 1) {
            setActiveRoom({ ...activeRoom, array: activeRoom.array + 1 })
            player.style.top = `${top_position + 32}px`
        }

        if (roomUnits[activeRoom.array][activeRoom.index].hasGoblet == true) {
            props.grabGoblet()
            roomUnits[activeRoom.array][activeRoom.index].hasGoblet = false
        }
    }
    useEffect(() => {
        let matrixContainer = []
        for (let i = 0; i < 25; i++) {
            matrixContainer.push([])
        }
        matrixContainer.map((emptyArr, j) => {
            for (let i = 0; i < 25; i++) {
                let unit = Math.floor(Math.random() * Math.floor(100))
                if (j == 0 && i == 0) {
                    emptyArr.push({ room: 1, hasGoblet: false })
                } else if (unit > 25) {
                    emptyArr.push({ room: 1, hasGoblet: false })
                } else {
                    emptyArr.push({ room: 0 })
                }
            }
            return emptyArr
        })
        const setGoblet = () => {
            let gobletRoom = Math.floor(Math.random() * Math.floor(625))
            let array = Math.ceil(gobletRoom / 25) - 1
            let index = gobletRoom % 25 - 1
            if (matrixContainer[array][index].room == 1) {
                matrixContainer[array][index].hasGoblet = true
            } else {
                setGoblet()
            }

        }
        setGoblet()
        setRoomUnits(matrixContainer)
    }, [])



    return (
        <>
            <div className="room">
                <KeyboardEventHandler
                    handleKeys={['down', 'right', 'left', 'up']}
                    onKeyEvent={(key, e) => move(e, key)} />
                <div id="player-unit" style={{ zIndex: '1', position: 'absolute', left: '8px', top: '8px', transition: 'left .75s, top .75s' }}>
                    <img src={imageSrc} />
                </div>
                {roomUnits.map(array => {
                    return array.map((unit, i) => {
                        if (unit.room == 1) {
                            return <RoomUnitFloor key={i} hasGoblet={unit.hasGoblet} />
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