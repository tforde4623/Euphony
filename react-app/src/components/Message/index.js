import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { deleteMessage } from "../../store/messages";
import MsgEditForm from "../MsgEditForm"
import './Message.css'
import '../../index.css'

function MessageBox({ message }) {
    const currUser = useSelector(state => state.session.user);
    const owned = message.user_id === currUser.id;
    const [hidden, setHidden] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const dispatch = useDispatch();

    const handleDelBtn = () => {
       dispatch(deleteMessage(message.id)); 
    }

    return (
        <div className = 'message-box'> 
            <div className='top-row'>
                <div className='user-info'>
                    {/* user stuff */}
                    {message.user?.icon_url && <img src={message.user.icon_url} alt='user icon'></img>}
                    <p>{message.user?.username}</p>
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
                    <button 
                        onClick={() => {
                            setShowEditForm(true);
                            setHidden(true);
                        }}
                        className='message-action-button'
                    >Edit</button>
                    <button 
                        onClick={handleDelBtn}
                        className='message-action-button'
                    >Delete</button>
                </div>
            </div>
            {/* message content OR edit form */}
            
            {showEditForm ? <MsgEditForm setHidden={setHidden} message={message} setFormView={setShowEditForm}/> 
                : <p className = 'content'>{message.content}</p>}
        </div>
    );
};

export default MessageBox;
