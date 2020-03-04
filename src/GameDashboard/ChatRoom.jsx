import React from 'react';
import { Input, Card, Divider } from 'semantic-ui-react';

import ChatRoomHeader from '../Images/Chat room header.mp4';

import '../App.css';

const ChatRoom = () => {
    return (
        <div className='main-chat-room-container'>
            <div className='chat-room-header'>
                <video loop autoPlay className='chat-room-header'>
                    <source src={ChatRoomHeader} type='video/mp4'/>
                </video>
            </div>

            <div className='chat-message-container'>
                <div className='message-cards'>
                    <Card.Group className='message-cards'>
                        <Card
                            header='Mary'
                            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                        />
                        <Card
                            header='Jenny'
                            description='labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation '
                        />
                        <Card
                            header='Baker'
                            description='Duis aute irure dolor in reprehenderit in voluptate velit esse .'
                        />
                        <Card
                            header='Elliot'
                            description='on proident, sunt in. ullamco nisi ut sunt in dolore magna aliqua. Ut en. ullamco.'
                        />
                    </Card.Group>
                </div>
                
                <div className='chat-message-input'>
                    <Input
                        iconPosition='left'
                        label={{color: 'blue', tag: true, content: 'Submit' }}
                        labelPosition='right'
                        placeholder='Message'
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
