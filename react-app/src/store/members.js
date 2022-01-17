// Get all the servers of which you're a member
const LOAD_YOUR_SERVER_MEMBERSHIPS = "members/LOAD_YOUR_SERVER_MEMBERSHIPS";

const loadMemberships = (memberships) => ({
  type: LOAD_YOUR_SERVER_MEMBERSHIPS,
  memberships,
});

export const checkMemberships = (userId) => async (dispatch) => {
  const memberships = await fetch(`/api/members/memberships/${userId}`);

  if (memberships.ok) {
    const data = await memberships.json();
    return dispatch(loadMemberships(data));
  }
};

// get all members (for given server)
const LOAD_ALL_SERVER_MEMBERS = "members/LOAD";

const loadMembers = (members) => ({
  type: LOAD_ALL_SERVER_MEMBERS,
  members,
});

export const readMembers = (serverId) => async (dispatch) => {
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
    const data = await res.json();
    return dispatch(loadMembers(data));
  }
};

export const unjoin = (serverId, userId) => async (dispatch) => {
  const res = await fetch(`/api/members/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, serverId }),
  });

  if (res.ok) {
    const data = await res.json();
    return dispatch(loadMembers(data));
  }
};

const initialState = { serverMembers: {}, memberships: {} };

const membersReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ALL_SERVER_MEMBERS:
      newState = Object.assign({}, state);
      action.members.forEach((member) => {
        newState.serverMembers[member.id] = member;
      });
      return { ...newState };
    case LOAD_YOUR_SERVER_MEMBERSHIPS:
      newState = Object.assign({}, state);
      action.memberships.forEach((membership) => {
        newState.memberships[membership.id] = membership;
      });
      return { ...newState };
    default:
      return state;
  }
};

export default membersReducer;
