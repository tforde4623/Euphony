import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessage } from "../../store/messages";
import MsgEditForm from "../MsgEditForm";
import "./MessageBox.css";

function MessageBox({ message }) {
  const currUser = useSelector((state) => state.session.user);
  const owned = message.user_id === currUser.id;
  const [hidden, setHidden] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useDispatch();

  const handleDelBtn = () => {
    dispatch(deleteMessage(message.id));
  };

  return (
    <div className="message_full">
      {/* user icon */}
      <div className="user_icon_div">
        {message?.user.icon_url ? null : message.user.username[0]}
        {message.user?.icon_url && (
          <img src={message.user.icon_url} alt="user icon"></img>
        )}
      </div>

      <div className="message_box">
        <div className="menu">
          <div>
            <p>{message?.user?.username}</p>
            <p>{message?.updatedAt}TIME</p>
          </div>

          {/* edit and delete settings dropdown menu */}
          <div className={hidden ? "hidden" : "msg_dropdown"}>
            <div>
              <button
                hidden={hidden}
                onClick={() => {
                  setShowEditForm(true);
                  setHidden(true);
                }}
              >
                <i className="fas fa-edit fa-lg"></i>
              </button>
              <button hidden={hidden} onClick={handleDelBtn}>
                <i className="far fa-trash-alt fa-lg"></i>
              </button>
            </div>

            <p
              className="action-menu-icon"
              hidden={!owned}
              onClick={() => setHidden(!hidden)}
            >
              <i className="fas fa-ellipsis-h"></i>
            </p>
          </div>
        </div>
        {/* message content */}
        {showEditForm ? (
          <MsgEditForm
            setHidden={setHidden}
            message={message}
            setFormView={setShowEditForm}
          />
        ) : (
          <p className="content">{message.content}</p>
        )}
      </div>
    </div>
  );
}

export default MessageBox;
