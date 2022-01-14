import React, { useEffect, useState } from "react";
import {  Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { readMessages, updateMessage } from "../../store/messages";
import "./EditMessage.css";

const EditMessage = () => {
  const dispatch = useDispatch();
  let { channelId, messageId, serverId } = useParams();
  channelId = Number(channelId);
  messageId = Number(messageId);
  const message = useSelector((state) => state.messages[messageId]);
  const userId = useSelector((state) => state.session.user?.id);
  const [content, setContent] = useState(message?.content || "");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(readMessages(channelId));
  }, [dispatch, channelId]);

  useEffect(() => {
    const errors = [];
    if (!content.length) errors.push("Message must not be empty.");
    setErrors(errors);
  }, [content]);

  if (userId !== message?.user_id)
    return (
      <Redirect
        to={`/servers/${serverId}/channels/${channelId}/messages`}
      ></Redirect>
    );

  const resetContent = () => {
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMessage = {
      messageId,
      content,
      userId,
      channelId,
    };

    dispatch(updateMessage(updatedMessage));
    resetContent();
  };

  return (
    <div className="edit_message_div">
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
          <i class="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default EditMessage;
