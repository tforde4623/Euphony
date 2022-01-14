// get all members (for given server)
const LOAD_ALL_SERVER_MEMBERS = "members/load";

const loadMembers = members => ({
  type: LOAD_ALL_SERVER_MEMBERS,
  members
});

export const readMembers = serverId => async dispatch => {
  const members = await fetch(`/api/servers/${serverId}/members`);

  if (members.ok) {
    const data = await members.json();
    return dispatch(loadMembers(data));
  }
};


export const join = (newMembership) => async (dispatch) => { 
  const res = await fetch(`/api/members/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMembership),
  });
  if (res.ok) {
    const members = await res.json();
    dispatch(loadMembers(members));
    return members;
  }
};


export const unjoin = (serverId, userId) => async (dispatch) => {
    const res = await fetch(`/api/members/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, serverId}),
    });

    if (res.ok) {
      const members = await res.json();
      dispatch(loadmembers(members));
      return members;
    }
};

const initialState = {};

const membersReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOAD_ALL_SERVER_MEMBERS:
      action.members.forEach(member => {
          newState[member.id] = member;
      });
      return {...newState};
    default:
      return state;
  }
};

export default membersReducer;