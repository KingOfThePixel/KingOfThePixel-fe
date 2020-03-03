import React from 'react';
import '../../App.css';
import wall from '../../Images/wall.jpg'

const RoomUnitWall = () => {

    return (
        <>
            <div className='room-unit'>
                <img src={wall} className='room-unit-image' />

            </div>

        </>
    )

}

export default RoomUnitWall