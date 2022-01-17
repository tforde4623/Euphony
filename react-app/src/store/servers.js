// get all servers
const LOAD_ALL_SERVERS = "servers/LOAD_ALL";

const loadServers = (servers) => ({
  type: LOAD_ALL_SERVERS,
  servers,
});

export const showServers = () => async (dispatch) => {
  const servers = await fetch(`/api/servers/`);
  if (servers.ok) {
    const list = await servers.json();
    dispatch(loadServers(list));
  }
};

// create a server
const ADD_SERVER = "servers/ADD_SERVER";
const addServer = (server) => ({
  type: ADD_SERVER,
  server,
});

export const createServer = (newServer) => async (dispatch) => {
  const res = await fetch("/api/servers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newServer),
  });

  if (res.ok) {
    const server = await res.json();
    dispatch(addServer(server));
    return server;
  }
};

//update server
const UPDATE_SERVER = "servers/edit";
const editServer = (server) => ({
  type: UPDATE_SERVER,
  server,
});

export const updateServer =
  ({ serverId, serverName, ownerId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serverId,
        serverName,
        ownerId,
      }),
    });

    if (res.ok) {
      const editedServer = await res.json();
      dispatch(editServer(editedServer));
    }
  };

//delete server
const DEL_SERVER = "servers/DEL_SERVER";
const delServer = (serverId) => ({
  type: DEL_SERVER,
  serverId,
});

export const DeleteServer =
  ({ userId, serverId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/servers/${serverId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, serverId }),
    });

    if (res.ok) {
      const serverId = await res.json();
      dispatch(delServer(serverId));
    }
  };

// reducer
const initialState = {};

const serverReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_ALL_SERVERS:
      action.servers.forEach((server) => {
        newState[server.id] = server;
      });
      return { ...newState, ...state };
    case ADD_SERVER:
      return { ...state, [action.server.id]: action.server };
    case UPDATE_SERVER:
      return { ...state, [action.server.id]: action.server };
    case DEL_SERVER:
      newState = { ...state };
      delete newState[action.serverId];
      return { ...newState };
    default:
      return state;
  }
};

export default serverReducer;
