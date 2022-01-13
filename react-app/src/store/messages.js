// get all messages
const LOAD_ALL_MESSAGES = "messages/LOAD_ALL_MESSAGES";

const loadMessages = (messages) => ({
  type: LOAD_ALL_MESSAGES,
  messages,
});


export const readMessages = (channelId) => async(dispatch)=> {
  const messages = await fetch(`/api/channels/${channelId}/messages`); 
  if(messages.ok) {
    const list = await messages.json();
    dispatch(loadMessages(list))
  }
}

// Create a message
const ADD_MESSAGE = "messages/ADD_MESSAGE";

// we don't need a thunk since the socket reciever is handling
// addition to database
export const createMessage = message => ({
  type: ADD_MESSAGE, 
  message
});

// Update message
const UPDATE_MESSAGE = "messages/UPDATE_MESSAGE";

export const editMessage = (message) => ({
  type: UPDATE_MESSAGE,
  message,
});

export const updateMessage =
  ({ id, content, user_id, channel_id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/messages/${id}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        content,
        user_id,
        channel_id,
      }),
    });

    if (res.ok) {
      const editedMessage = await res.json();
      dispatch(editMessage(editedMessage));
    }
  };

// delete message
const DELETE_MESSAGE = "messages/delete";

const removeMessage = msgId => ({
  type: DELETE_MESSAGE,
  msgId
});

export const deleteMessage = msgId => async (dispatch) => {
  const res = await fetch(`/api/messages/${msgId}/delete`, {
    method: 'DELETE'
  });

  if (res.ok) {
    dispatch(removeMessage(msgId));
  }
};

const initialState = {};

const messageReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_ALL_MESSAGES: 
      action.messages.forEach(message => {
        newState[message.id] = message
      })
      return { ...newState}
    case ADD_MESSAGE:
      return { ...state, [action.message.id]: action.message };
    case UPDATE_MESSAGE:
      return { ...state, [action.message.id]: action.message };
    case DELETE_MESSAGE:
      newState = state;
      delete newState[action.msgId]
      return { ...newState }
    default:
      return state;
  }
};

export default messageReducer;
