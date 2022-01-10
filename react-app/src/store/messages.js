// Create a message
const ADD_MESSAGE = "messages/ADD_MESSAGE";

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export const createMessage = (newMessage) => async (dispatch) => {
  const res = await fetch(`/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  });

  if (res.ok) {
    const message = await res.json();
    dispatch(addMessage(message));
    return message;
  }
};

// Update message

const UPDATE_MESSAGE = "messages/UPDATE_MESSAGE";

const editMessage = (message) => ({
  type: UPDATE_MESSAGE,
  message,
});

export const updateMessage =
  ({ messageId, content, userId, channelId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/messages/${messageId}}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId,
        content,
        userId,
        channelId,
      }),
    });

    if (res.ok) {
      const editedMessage = await res.json();
      dispatch(editMessage(editedMessage));
    }
  };

const initialState = {};

const messageReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, [action.message.id]: action.message };
    case UPDATE_MESSAGE:
      return { ...state, [action.message.id]: action.message };
    default:
      return state;
  }
};

export default messageReducer;
