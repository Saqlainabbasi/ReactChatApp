import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from '../infoBar/InfoBar';
import Input from '../input/Input';
import Messages from '../messages/Messages';
// import TextContainer from '../textContainer/TextContainer';
//variable
let socket;
//location hold the data pass in the url......
const Chat = ({ location, history }) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState([]);
    // const ENDPOINT = 'https://socket-real-time-chat-app.herokuapp.com/';
    const ENDPOINT = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        //getting the parameters pass in the url.....
        const { name, room } = queryString.parse(location.search);

        //creating a socket connection....
        socket = io(ENDPOINT, {
            transports: ['websocket']
        });

        setName(name);
        setRoom(room);
        //creating a room......
        socket.emit('join', { name, room }, (error) => {
            if (error) {
                setTimeout(() => {
                    alert(error);
                    history.push('/')
                })
            }
        });
        //for component unmount leave the room and close the socket connection
        return () => {
            socket.emit('leaveRoom')
            socket.off()
            // leaveChat(socket)
            // //closing the socket.io join connection....
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        //listening to socket event ....
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, [messages])


    const sendMessage = (event) => {
        event.preventDefault();
        //emiting a socket event.....
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    // const leaveChat = (socket) => {

    //     socket.emit('disconnect');
    //     // leaveChat()
    //     //closing the socket.io join connection....
    //     socket.off();

    // }
    console.log(message, messages);

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
            {/* <TextContainer users={users}/> */}
        </div>
    );
};

export default Chat;