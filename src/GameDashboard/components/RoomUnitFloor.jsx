import React, { useState, useEffect } from 'react';
import '../../App.css';
import floor from '../../Images/floor.jpg'

import goblet from '../../Images/goblet.png'
const RoomUnitFloor = (props) => {


    return (
        <>
            <div className='room-unit'>
                <img src={floor} className='room-unit-image' />
                {props.itemId == 1 ? <img src={goblet} style={{ position: 'absolute' }} /> : null}
            </div>

        </>
    )


}

export default RoomUnitFloor