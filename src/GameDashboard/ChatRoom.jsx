import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js'
import { Input, Card, Divider } from 'semantic-ui-react';

import ChatRoomHeader from '../Images/Chat room header.mp4';

import '../App.css';
import axiosWithAuth from '../Utils/AxiosWithAuth';

const ChatRoom = () => {
    const [input, setInput] = useState('')
    const [chat, setChat] = useState([])
    const pusher = new Pusher("6330e86b46dfcf65d7c3", {
        cluster: 'us2',
        forceTLS: true
    });
    const channel = pusher.subscribe('chat');
    channel.bind('broadcast',
        function (data) {
            setChat(chat.concat(data))

        })
    function send_message(e) {
        e.preventDefault()
        axiosWithAuth().post('/api/adv/say', { "message": input })
            .then(response => {
                // console.log(response.data)
            })
            .catch(err => {
                // console.log(err)
            })
        setInput('')
    }

    function changeHandler(e) {
        setInput(e.target.value)
    }


    return (
        <div className='main-chat-room-container'>
            <div className='chat-room-header'>
                <video loop autoPlay className='chat-room-header'>
                    <source src={ChatRoomHeader} type='video/mp4' />
                </video>
            </div>

            <div className='chat-message-container'>
                <div className='message-cards'>
                    <Card.Group className='message-cards'>
                        {chat.map((message, idx) => <Card key={`idx${message.message}`} description={message.message} />)}
                        {/* <Card
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
                        /> */}
                    </Card.Group>
                </div>

                <div className='chat-message-input'>
                    <form onSubmit={send_message}>
                        <Input
                            value={input}
                            onChange={changeHandler}
                            iconPosition='left'
                            label={{ color: 'blue', tag: true, content: 'Submit' }}
                            labelPosition='right'
                            placeholder='Message'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;
