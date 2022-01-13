const GET_ALL_CATEGORIES = "categories/GET_ALL_CATEGORIES";

const loadAllCategories = (categories) => ({
  type: GET_ALL_CATEGORIES,
  categories,
});


// working returning {{name: name, id: id, list: [channel1, channel2]}, {name: name2, id: id2, list: [channel4, channel3]}}
export const getAllCategories =
  (serverId) =>
  async (dispatch) => {
    const res = await fetch(`/api/categories/${serverId}`);
    if (res.ok) {
      const categories = await res.json();
      dispatch(loadAllCategories(categories));
      return categories;
    }
};

// Create a new channel
const ADD_CATEGORY = "/categories/ADD_CATEGORY";

const addCategory = (category) => ({
  type: ADD_CATEGORY,
  category,
});

export const createCategory = (newCategory) => async (dispatch) => { //include serverId in the newCategory payload object
  const res = await fetch(`/api/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
  if (res.ok) {
    const category = await res.json();
    dispatch(addCategory(category));
    return category;
  }
};

// Edit a channel
const UPDATE_CATEGORY = "categories/UPDATE_CATEGORY"; // figure out if we want this crud 

const loadEditedCategory = (category) => ({
  type: UPDATE_CATEGORY,
  category,
});

export const updateCategory =
  ({ id, name }) =>
  async (dispatch) => {
    const res = await fetch(`/api/category/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, id }),
    });

    if (res.ok) {
      const category = await res.json();
      dispatch(loadEditedCategory(category));
    }
};

// Delete a channel
// const DELETE_CATEGORY = "categories/DELETE_CATEGORY";

// const loadDeletedChannel = (serverId) => ({//figure out the plan for this crud =-=====================
//   type: DELETE_CATEGORY,
//   serverId,
// });

// export const deleteCategory =
//   ({ userId, serverId, id }) =>
//   async (dispatch) => {
//     const res = await fetch(`/api/categories/${id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, serverId }),
//     });

//     if (res.ok) {
//       const serverId = await res.json();
//       dispatch(loadDeletedCategory(serverId));
//     }
// };

const initialState = {};
const categoriesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      action.categories.forEach((category) => {
        newState[category.id] = category;
      });
      return { ...state, ...newState };
    case ADD_CATEGORY:
      return { ...state, [action.category.id]: action.category };
    case UPDATE_CATEGORY:
      return { ...state, [action.category.id]: action.category };
    // case DELETE_CATEGORY:
    //   newState = { ...state };
    //   delete newState[action.id]; //FLAG: is it channel.id??
    //   return { ...newState };
    default:
      return state;
  }
};

export default categoriesReducer;
