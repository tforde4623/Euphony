import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NewMessage.css";

const NewMessage = ({ sock }) => {
  const { channelId } = useParams();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!content.length) errors.push("Message must not be empty.");
    setErrors(errors);
  }, [content]);

  const user = useSelector((state) => state.session.user);
  const userId = user?.id;
  if (!userId) return <Redirect to="/"></Redirect>;

  const resetContent = () => {
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // send new message via emission
    sock.emit('chat', { content, userId, user, channelId });

    //dispatch(createMessage(newMessage));
    resetContent();
  };

  return (
    <div className="CU_msg">
      <form onSubmit={handleSubmit} className="add_msg">
        {/* Errors */}
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {/* Message Input */}
        <textarea
          placeholder="Send a message..."
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Submit */}
        <button type="submit" disabled={errors.length > 0} className="add_btn">
          <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default NewMessage;
