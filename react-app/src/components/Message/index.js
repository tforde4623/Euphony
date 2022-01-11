import React, { useState } from "react";
import { useSelector } from 'react-redux';

import './Message.css'
import '../../index.css'

function MessageBox({ message }) {
    const user = useSelector(state => state.session.user);
    const owned = message.user_id === user.id;
    const [hidden, setHidden] = useState(true);

    return (
        <div className = "message-box"> 
            {/* user icon */}
            <img src={user.icon_url} alt='user icon'></img>
            {/* message content */}
            <p className = "content">{message.content}</p>
            {/* edit and delete settings dropdown menu */}
            <p hidden={!owned} onClick={()=> {setHidden(!hidden)}}>==/==</p>
            <button hidden={hidden}>Edit</button>
            <button hidden={hidden}>Delete</button>
        </div>
    );
};

export default MessageBox;
