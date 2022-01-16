import { useState } from "react";

import "./MsgEditForm.css";

const MsgEditForm = ({ setFormView, message, sock }) => {
  const [content, setContent] = useState(message.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    sock.emit("edit_chat", {
      id: message.id,
      content,
      userId: message.user_id,
      channelId: message.channel_id,
      user: message.user,
    });

    setFormView(false);
  };

  const handleDelBtn = () => {
    sock.emit("delete_chat", message);
  };

  return (
    <div>
      <form className="edit-form">
        <textarea
          className="edit-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </form>
      <div className="msg_buttons_div">
        <button className="edit-submit-btn" onClick={(e) => handleSubmit(e)}>
          <i class="fas fa-check-circle fa-lg"></i>
        </button>
        <button onClick={handleDelBtn} className="edit-submit-btn">
          <i className="far fa-trash-alt fa-lg"></i>
        </button>
        <button onClick={() => setFormView(false)} className="edit-submit-btn">
          <i class="fas fa-window-close fa-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default MsgEditForm;
