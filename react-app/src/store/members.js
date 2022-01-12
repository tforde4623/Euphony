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
    dispatch(loadMembers(data));
  }
};

const initialState = {};

const memberReducer = (state = initialState, action) => {
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

export default memberReducer;