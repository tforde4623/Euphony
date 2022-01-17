import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategory,
  getAllCategories,
  deleteCategory,
} from "../../store/categories";
import { showServers } from "../../store/servers";
import "./EditCategory.css";

const EditCategory = ({ serverId, categoryId, setShowCategoryEdit }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user?.id);
  const category = useSelector((state) => state.categories[categoryId]);
  
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(showServers());
    setName(category?.name);
  }, [dispatch, serverId, categoryId, category?.name, category]);

  useEffect(() => {
    const errors = [];
    if (!name?.length) errors.push("Category name must not be empty.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = {
      name,
      serverId,
      categoryId,
      userId,
    };

    dispatch(updateCategory(updatedCategory));
    setShowCategoryEdit(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { userId, categoryId, serverId };
    dispatch(deleteCategory(deletePayload));
    setShowCategoryEdit(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Errors */}
        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {/* Name */}
        <input
          placeholder="Category Name"
          name="category_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>

        {/* Submit */}
        <button type="submit" disabled={errors.length > 0} className="add_btn">
          <i className="fas fa-plus"></i>
        </button>
        {/* DELETE */}
        <button onClick={handleDelete}>
          <i className="far fa-trash-alt"></i>
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
