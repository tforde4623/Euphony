import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./NewMessage.css";

const NewMessage = ({ sock }) => {
  const { channelId } = useParams();
  const [content, setContent] = useState("");
  // const [errors, setErrors] = useState([]);
  const [contentErr, setContentErr] = useState('');

  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  // TODO: MEMORY???
  useEffect(() => {
    // listen for emissions on errors
    let timeout = null
    if (sock) {
      sock.on('err', (data) => {
        if (data.content) {
          setContentErr(data.content);

          // we want to get rid of it after 3
          timeout = setTimeout(() => {
            setContentErr();
          }, 3000);
        }
      });
    }

    return () => {
      clearTimeout(timeout)
    };
  }, [sock]);

  if (!userId) return <Redirect to="/"></Redirect>;

  const resetContent = () => {
    setContent("");
  };

  const handleSubmit = (e) => {
    // if (!content.length) {
    //   setErrors(["Message must not be empty."]);
    //   return;
    // }

    e.preventDefault();

    // send new message via emission
    sock.emit("chat", { content, userId, user, channelId });

    //dispatch(createMessage(newMessage));
    resetContent();
  };

  return (
    <div className="new_message_div">
      <form onSubmit={handleSubmit} className="add_msg">
        {/* Errors */}
        {/* {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )} */}

        {/* Message Input */}
        <textarea
          className={contentErr ? 'input-err' : null}
          placeholder={contentErr ? 'Some message is required to send!' : "Send a message..."}
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Submit */}
        <button
          type="submit"
          // disabled={errors.length > 0}
          className="edit-submit-btn"
        >
          <i className="fas fa-paper-plane fa-lg"></i>
        </button>
      </form>
    </div>
  );
};

export default NewMessage;
