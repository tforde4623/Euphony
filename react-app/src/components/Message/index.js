import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from 'react-redux';




function MessageBox() {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true)


    return (
        <div className = "message-box"> 
            {/* user icon */}
            <img src={user.icon_url}></img>
            {/* message content */}
            <p className = "content">{message.content}</p>
            {/* edit and delete settings dropdown menu */}
            <a hidden={owned} onClick={()=> {setHidden(!hidden)}}>==/==</a>
            <button hidden={hidden}>Edit</button>
            <button hidden={hidden}>Delete</button>
        </div>
    )
}

export default MessageBox