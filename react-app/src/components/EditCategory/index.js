import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, deleteCategory } from "../../store/categories";
import { getAllChannels } from "../../store/channels";
import { showServers } from "../../store/servers";

const EditCategory = ({ serverId, categoryId, setShowCategoryEdit }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user?.id);
  const category = useSelector((state) => state.categories[categoryId]);

  const [name, setName] = useState("");
  const [nameErrs, setNameErrs] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // dispatch(getAllCategories(serverId));
    dispatch(showServers());
    setName(category?.name);
  }, [dispatch, serverId, categoryId, category?.name, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = {
      name,
      serverId,
      categoryId,
      userId,
    };

    dispatch(updateCategory(updatedCategory)).then((res) => {
      if (res.errors) {
        if (res.errors.name) {
          setNameErrs(res.errors.name);
        } else {
          // this would be an error not related to user input
          res.errors.general && setErrors(res.errors.general);
        }
      } else {
        setShowCategoryEdit(null);
      }
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { userId, categoryId, serverId };
    dispatch(deleteCategory(deletePayload)).then(() =>
      dispatch(getAllChannels())
    );
    setShowCategoryEdit(null);
  };

  return (
    <form onSubmit={handleSubmit} className="c_form">
      {errors.length ? (
        <div className="err-visibility-container">
          {errors.map((err) => (
            <div className="input-err-msg" key={err}>
              {err}
            </div>
          ))}
        </div>
      ) : null}

      {/* Name */}
      <input
        placeholder="Category Name"
        name="category_name"
        className={nameErrs.length ? "input-err" : null}
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      ></input>

      {nameErrs.length ? (
        <div className="err-visibility-container">
          {nameErrs.map((err) => (
            <div className="input-err-msg" key={err}>
              {err}
            </div>
          ))}
        </div>
      ) : null}

      {/* Submit */}
      <div>
        <button type="submit" disabled={errors.length > 0} className="add_btn">
          <i className="fas fa-plus"></i>
        </button>
        {/* DELETE */}
        <button onClick={handleDelete}>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </form>
  );
};

export default EditCategory;
