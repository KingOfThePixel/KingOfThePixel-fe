import React, { useState, useEffect } from 'react';
import '../../App.css';
import floor from '../../Images/floor.jpg'

import knight from '../../Images/knight.png'
const RoomUnitFloor = (props) => {
    const [directions, setDirections] = useState([])
    const [isActive,] = useState(props.active)
    const [cssClass, setCssClass] = useState("player-non-active")
    useEffect(() => {
        if (isActive == true) {
            setCssClass('player-unit')
        }
    }, [isActive])
    return (
        <>
            <div className='room-unit'>
                <img src={floor} className='room-unit-image' /><img src={knight} className={cssClass} />

            </div>

        </>
    )


}

export default RoomUnitFloor