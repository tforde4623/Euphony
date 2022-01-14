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

// Create a new category
export const createCategory = (newCategory) => async (dispatch) => { //include serverId in the newCategory payload object
  const res = await fetch(`/api/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
  });
  if (res.ok) {
    const categories = await res.json();
    dispatch(loadAllCategories(categories));
    return categories;
  }
};

// Edit a category
export const updateCategory =
  ({ categoryId, name, serverId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/categories/${categoryId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, categoryId, serverId }),
    });

    if (res.ok) {
      const categories = await res.json();
      dispatch(loadAllCategories(categories));
      return categories;
    }
};

// Delete a category
export const deleteCategory =
  ({ userId, serverId, categoryId }) =>
  async (dispatch) => {
    const res = await fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, serverId, categoryId }),
    });

    if (res.ok) {
      const categories = await res.json();
      dispatch(loadAllCategories(categories));
      return categories;
    }
};

const initialState = {};
const categoriesReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      action.categories.forEach(cat => {
        newState[cat.id] = cat
      });
      return { ...newState };
    default:
      return state;
  }
};

export default categoriesReducer;
