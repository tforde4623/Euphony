import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createCategory, getAllCategories } from "../../store/categories";
import { getAllChannels } from "../../store/channels";
import { showServers } from "../../store/servers";

const NewCategory = ({ setShowNewCategoryForm }) => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [nameErrs, setNameErrs] = useState([]);

  useEffect(() => {
    dispatch(showServers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      name,
      serverId,
    };

    dispatch(createCategory(newCategory)).then((res) => {
      if (res.errors) {
        if (res.errors.name) {
          setNameErrs(res.errors.name);
        } else {
          // this would be an error not related to user input
          res.errors.general && setErrors(res.errors.general);
        }
      } else {
        dispatch(getAllChannels(serverId));
        dispatch(getAllCategories(serverId));
        setShowNewCategoryForm(false);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="c_form">
      {/* Errors */}
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
        className={nameErrs.length ? "input-err" : null}
        name="category_name"
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
        <button onClick={() => setShowNewCategoryForm(false)}>
          <i className="fas fa-window-close fa-lg"></i>
        </button>
      </div>
    </form>
  );
};

export default NewCategory;
