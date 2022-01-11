import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { readMessages } from '../../store/messages';

import NewMessage from "../NewMessage";
import MessageBox from "../Message";

const ShowAllMessages = () => {
  const { channelId } = useParams();
  const messages = useSelector(state => Object.values(state.messages)) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readMessages(channelId))
  }, [channelId, dispatch])

  return (
    <div>
      {/* messages rendered */}
      {messages.map((msg, idx) => (
        <MessageBox key={idx} message={msg}/>
      ))}

      {/* send a new message */}
      <NewMessage />
    </div>
  );
};

export default ShowAllMessages;
