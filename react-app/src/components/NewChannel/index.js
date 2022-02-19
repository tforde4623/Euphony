import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../../store/channels";
import { showServers } from "../../store/servers";

const NewChannel = ({ setShowNewChannelForm }) => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [nameErrs, setNameErrs] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);

  useEffect(() => {
    dispatch(showServers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChannel = {
      name,
      serverId,
      categoryId: selectCategory,
    };

    dispatch(createChannel(newChannel)).then((res) => {
      console.log(res);
      if (res.errors) {
        if (res.errors.name) {
          setNameErrs(res.errors.name);
        } else {
          // this would be an error not related to user input
          res.errors.general && setErrors(res.errors.general);
        }
      } else {
        setShowNewChannelForm(false);
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
        placeholder="Channel Name"
        className={nameErrs.length ? "input-err" : null}
        name="channel_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      ></input>

      {nameErrs.length
        ? nameErrs.map((err) => (
            <div className="input-err-msg" key={err}>
              {err}
            </div>
          ))
        : null}

      {/* Change Category */}
      <select
        className="select-input"
        value={selectCategory}
        onChange={(e) => setSelectCategory(e.target.value)}
      >
        <option value={null}>Select a Category</option>
        {Object.values(categories).map((cat) => (
          <option value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {/* Submit */}
      <div>
        <button type="submit" disabled={errors.length > 0} className="add_btn">
          <i className="fas fa-plus"></i>
        </button>

        <button onClick={() => setShowNewChannelForm(false)}>
          <i className="fas fa-window-close fa-lg"></i>
        </button>
      </div>
    </form>
  );
};

export default NewChannel;
