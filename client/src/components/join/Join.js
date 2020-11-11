import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css'

const Join = () => {

    //using react Hooks
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const handleChange = (event, field) => {
        if (field === 'name') {
            setName(event.target.value);
        }
        if (field === 'room') {
            setRoom(event.target.value)
        }
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input
                    type='text'
                    placeholder='Name' className='joinInput'
                    onChange={(event) => handleChange(event, 'name')} />
                </div>
                <div><input
                    type='text'
                    placeholder='Room' className='joinInput mt-20'
                    onChange={(event) => handleChange(event, 'room')} />
                </div>

                <Link
                    onClick={event => (!name || !room) ? event.preventDefault() : null}
                    to={`/chat?name=${name}&room=${room}`}
                >
                    <button className={'button mt-20'} type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;