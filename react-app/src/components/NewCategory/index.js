import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createCategory, getAllCategories } from "../../store/categories";
import { getAllChannels } from "../../store/channels";
import { showServers } from "../../store/servers";
import "./NewCategory.css";

const NewCategory = ({ setShowNewCategoryForm }) => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(showServers());
  }, [dispatch]);

  useEffect(() => {
    const errors = [];
    if (!name.length) errors.push("Category name must not be empty.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      name,
      serverId,
    };

    dispatch(createCategory(newCategory));
    dispatch(getAllChannels(serverId));
    dispatch(getAllCategories(serverId));
    setShowNewCategoryForm(false);
  };

  return (
    <div className="new_category_div">
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
        <div>
          <button
            type="submit"
            disabled={errors.length > 0}
            className="add_btn"
          >
            <i className="fas fa-plus"></i>
          </button>
          <button onClick={() => setShowNewCategoryForm(false)}>
            <i className="fas fa-window-close fa-lg"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
