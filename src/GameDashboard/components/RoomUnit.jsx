import React, { useState } from 'react';
import '../../App.css';
import floor from '../../Images/floor.jpg'
const RoomUnit = () => {
    const [directions, setDirections] = useState([])
    return (
        <>
            <div className='room-unit'>
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
                <img src={floor} className='room-unit-image' />
            </div>

        </>
    )
}

export default RoomUnit