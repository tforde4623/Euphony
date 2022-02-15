import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  readMessages, 
  createMessage, 
  editMessage, 
  removeMessage } from '../../store/messages';
import { io } from 'socket.io-client';

import NewMessage from "../NewMessage";
import MessageBox from "../MessageBox";
import "./ShowAllMessages.css"

let sock;
const ShowAllMessages = () => {
  const { channelId } = useParams();
  const messages = useSelector(state => Object.values(state.messages)) || [];
  const dispatch = useDispatch();

  // handle sock connection
  useEffect(() => {
    // initialize connection with socket
    sock = io('localhost:5000');

    // listener for new chats
    sock.on('chat', (data) => {
      // maybe tmp msgs?
      dispatch(createMessage(data));
    });

    // listener for chat revisions
    sock.on('edit_chat', (data) => {
      dispatch(editMessage(data));
    });

    // listener for chat deletion
    sock.on('delete_chat', ({ id }) => {
      dispatch(removeMessage(id))
    });

    // cleanup
    return (() => sock.disconnect());
  }, [dispatch]);

  useEffect(() => {
    sock.emit('join', { room: channelId });
  }, [channelId])

  useEffect(() => {
    dispatch(readMessages(channelId))
  }, [channelId, dispatch]);

  return (
    <div className='msg_div'>
      {/* messages rendered */}
      <div className='messages-container'>
      {messages.map((msg, idx) => (
        <MessageBox key={idx} message={msg} sock={sock}/>
      ))}
      </div>

      {/* send a new message */}
      <NewMessage sock={sock}/>
    </div>
  );
};

export default ShowAllMessages;
