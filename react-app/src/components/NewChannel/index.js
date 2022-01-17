import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createChannel} from "../../store/channels";
import "./NewChannel.css";
import { showServers } from "../../store/servers";

const NewChannel = ({ setShowNewChannelForm }) => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);

  useEffect(() => {
    dispatch(showServers());
  }, [dispatch]);


  useEffect(() => {
    const errors = [];
    if (!name.length) errors.push("Channel name must not be empty.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChannel = {
      name,
      serverId,
      categoryId: selectCategory
    };

    dispatch(createChannel(newChannel));
    setShowNewChannelForm(false);
  };

  return (
    <div className="new_channel_div">
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
          placeholder="Channel Name"
          name="channel_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>

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
          <button
            type="submit"
            disabled={errors.length > 0}
            className="add_btn"
          >
            <i className="fas fa-plus"></i>
          </button>

          <button onClick={() => setShowNewChannelForm(false)}>
            <i className="fas fa-window-close fa-lg"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewChannel;
