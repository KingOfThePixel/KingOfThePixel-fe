import React, { useState, useEffect } from 'react';
import '../../App.css';
import floor from '../../Images/floor.jpg'

import knight from '../../Images/knight.png'
const RoomUnitFloor = () => {


    return (
        <>
            <div className='room-unit'>
                <img src={floor} className='room-unit-image' />

            </div>

        </>
    )


}

export default RoomUnitFloor