import { useState } from 'react';

import './MsgEditForm.css';

const MsgEditForm = ({ setFormView, message, sock }) => {
  const [content, setContent] = useState(message.content);

  const handleSubmit = e => {
    e.preventDefault();
    sock.emit(
      'edit_chat', 
      {
        id: message.id,
        content,
        userId: message.user_id,
        channelId: message.channel_id,
        user: message.user
      }
    );

    setFormView(false);
  };

  return (
    <div>
      <form className='edit-form'>
        <textarea 
          className='edit-textarea'
          value={content}
          onChange={e => setContent(e.target.value)}></textarea>
      </form>
      <button 
        className='edit-submit-btn' 
        onClick={e => handleSubmit(e)}
      >Edit</button>
      <button 
        onClick={() => setFormView(false)}
        className='edit-submit-btn'
      >Cancel</button>
    </div>
  )
};

export default MsgEditForm;