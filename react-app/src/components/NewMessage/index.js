import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../store/messages";
import "./NewMessage.css";

const NewMessage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!content.length) errors.push("Message must not be empty.");
    setErrors(errors);
  }, [content]);

  const userId = useSelector((state) => state.session.user?.id);
  if (!userId) return <Redirect to="/"></Redirect>;

  const resetContent = () => {
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      content,
      userId,
      channelId,
    };

    dispatch(createMessage(newMessage));
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
          <i class="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default NewMessage;