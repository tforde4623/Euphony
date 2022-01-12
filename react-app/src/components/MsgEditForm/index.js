import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateMessage } from '../../store/messages';
import './MsgEditForm.css';

const MsgEditForm = ({ setFormView, message }) => {
  const [content, setContent] = useState(message.content);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateMessage({ 
      id: message.id, 
      content, 
      user_id: message.user_id, 
      channel_id: message.channel_id 
    }));

    setFormView(false);
  };

  return (
    <div>
      <form className='edit-form' onSubmit={e => handleSubmit(e)}>
        <textarea 
          className='edit-textarea'
          value={content}
          onChange={e => setContent(e.target.value)}></textarea>
      </form>
      <button className='edit-submit-btn' type='submit'>Edit</button>
      <button 
        onClick={() => setFormView(false)}
        className='edit-submit-btn'
        >Cancel</button>
    </div>
  )
};

export default MsgEditForm;