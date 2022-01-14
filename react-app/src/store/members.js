// get all members (for given server)
const LOAD_ALL_SERVER_MEMBERS = "members/load";
const ADD_MEMBER = "members/ADD_MEMBER";
const DELETE_MEMBER= "members/DELETE_MEMBER";

export const removeMember = Id => ({
  type: DELETE_MEMBER,
  Id
});


export const createMember = member => ({
  type: ADD_MEMBER, 
  member
});

const loadMembers = members => ({
  type: LOAD_ALL_SERVER_MEMBERS,
  members
});

export const checkMemberships = (userId) => async dispatch => {
  const memberships = await fetch(`/api/members/memberships/${userId}`)

  if(memberships.ok) {
    const data = await memberships.json()
    return dispatch(loadMembers(data))
  }
}

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
    case ADD_MEMBER:
      return { ...state, [action.member.id]: action.memeber };
    case DELETE_MEMBER:
        newState = state;
        delete newState[action.Id]
        return { ...newState }
    default:
      return state;
  }
};

export default membersReducer;