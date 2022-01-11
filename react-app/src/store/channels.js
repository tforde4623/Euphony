// Get all channels in a server
const GET_ALL_CHANNELS = "channels/GET_ALL_BARS";

const loadAllChannels = (channels) => ({
  type: GET_ALL_CHANNELS,
  channels,
});

export const getAllChannels =
  ({ serverId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}/channels`);
    if (res.ok) {
      const channels = await res.json();
      dispatch(loadAllChannels(channels));
      return channels;
    }
  };

// Create a new channel
const ADD_CHANNEL = "/channels/ADD_CHANNEL";

const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel,
});

export const createChannel = (newChannel) => async (dispatch) => {
  const res = await fetch(`/api/servers/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newChannel),
  });
  if (res.ok) {
    const channel = await res.json();
    dispatch(addChannel(channel));
    return channel;
  }
};

const initialState = {};
const channelReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_CHANNELS:
      action.channels.forEach((channel) => {
        newState[channel.id] = channel;
      });
      return { ...state, ...newState };
    case ADD_CHANNEL:
      return { ...state, [action.channel.id]: action.channel };
    case UPDATE_CHANNEL:
      return { ...state, [action.channel.id]: action.channel };
    case DELETE_CHANNEL:
      newState = { ...state };
      delete newState[action.channelId];
      return { ...newState };
    default:
      return state;
  }
};

export default channelReducer;
