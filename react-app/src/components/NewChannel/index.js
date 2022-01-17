import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createChannel, getAllChannels } from "../../store/channels";
import "./NewChannel.css";
import { showServers } from "../../store/servers";

const NewChannel = ({ setShowNewChannelForm }) => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(showServers());
  }, [dispatch]);

  const default_channel = useSelector(
    (state) => state.servers[serverId]?.default_channel
  );

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
    };

    dispatch(createChannel(newChannel));
    setShowNewChannelForm(false);
    dispatch(getAllChannels(serverId));
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
