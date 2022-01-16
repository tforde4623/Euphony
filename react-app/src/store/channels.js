// Get all channels in a server
const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";

const loadAllChannels = (channels) => ({
  type: GET_ALL_CHANNELS,
  channels,
});

export const getAllChannels =
  () =>
  async (dispatch) => {
    const res = await fetch(`/api/channels/`);
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
  const res = await fetch(`/api/channels/`, {
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

// Edit a channel
const UPDATE_CHANNEL = "channels/UPDATE_CHANNEL";

const loadEditedChannel = (channel) => ({
  type: UPDATE_CHANNEL,
  channel,
});

export const updateChannel =
  ({ name, serverId, channelId, categoryId, userId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, serverId, channelId, categoryId, userId }),
    });

    if (res.ok) {
      const channel = await res.json();
      dispatch(loadEditedChannel(channel));
    }
  };

// Delete a channel
const DELETE_CHANNEL = "channels/DELETE_CHANNEL";

const loadDeletedChannel = (channelId) => ({
  type: DELETE_CHANNEL,
  channelId,
});

export const deleteChannel =
  ({ userId, channelId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/channels/${channelId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, channelId }),
    });

    if (res.ok) {
      const channelId = await res.json();
      dispatch(loadDeletedChannel(channelId));
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
      delete newState[action.channelId]; //FLAG: is it channel.id??
      return { ...newState };
    default:
      return state;
  }
};

export default channelReducer;
