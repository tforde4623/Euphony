import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../../store/channels";
import "./NewChannel.css";
import { showServers } from "../../store/servers";

const NewChannel = () => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(showServers());
  }, [serverId]);

  const default_channel = useSelector(state => state.servers[serverId]?.default_channel)

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
    history.push(`/servers/${serverId}/channels/${default_channel}`);
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
          placeholder="Channel Name"
          name="channel_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>

        {/* Submit */}
        <button type="submit" disabled={errors.length > 0} className="add_btn">
          <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default NewChannel;
