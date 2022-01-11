import React, { useState } from "react";
import { useSelector } from 'react-redux';

import './Message.css'
import '../../index.css'

function MessageBox({ message }) {
    const currUser = useSelector(state => state.session.user);
    const owned = message.user_id === currUser.id;
    const [hidden, setHidden] = useState(true);

    return (
        <div className = 'message-box'> 
            <div className='top-row'>
                <div className='user-info'>
                    {/* user stuff */}
                    {message.user.icon_url && <img src={message.user.icon_url} alt='user icon'></img>}
                    <p>{message.user.username}</p>
                </div>
                <p 
                    className = 'action-menu-icon'
                    hidden={!owned} 
                    onClick={() => setHidden(!hidden)}
                >
                <i className='fas fa-ellipsis-h'></i>
            </p>
                {/* edit and delete settings dropdown menu */}
                <div className={hidden ? 'hidden' : 'message-action-menu'}>
                    <button className='message-action-button'>Edit</button>
                    <button className='message-action-button'>Delete</button>
                </div>
            </div>
            {/* message content */}
            <p className = 'content'>{message.content}</p>
        </div>
    );
};

export default MessageBox;