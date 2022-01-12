import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./MessageBox.css";

function MessageBox({ message }) {
  const user = useSelector((state) => state.session.user);
  const owned = message.user_id === user.id;
  const [hidden, setHidden] = useState(true);

  return (
    <div className="message_full">
      {/* user icon */}
      <div className="user_icon_div">
        <img src={user.icon_url} alt="user icon"></img>
      </div>
      <div className="message_box">
        <div className="menu">
          <div>
            <p>{message?.user?.username}USERNAME</p>
            <p>{message?.updatedAt}TIME</p>
          </div>

          {/* edit and delete settings dropdown menu */}
          <div className="msg_dropdown">
            <div>
              <button hidden={hidden}>
                <i className="fas fa-edit fa-lg"></i>
              </button>
              <button hidden={hidden}>
                <i className="far fa-trash-alt fa-lg"></i>
              </button>
            </div>
            <p
              hidden={!owned}
              onClick={() => {
                setHidden(!hidden);
              }}
            >
              <i class="fas fa-ellipsis-v fa-lg"></i>
            </p>
          </div>
        </div>
        {/* message content */}
        <p className="content dark_small">{message.content}</p>
      </div>
    </div>
  );
}

export default MessageBox;
