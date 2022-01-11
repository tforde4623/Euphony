import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { updateChannel } from "../../store/channels";
import "./EditChannel.css";

const EditChannel = () => {
  let { serverId, categoryId, channelId } = useParams();
  serverId = Number(serverId);
  categoryId = Number(categoryId);
  channelId = Number(channelId);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user?.id);
  const channel = useSelector((state) => state.channels[channelId]);

  // COMMENT IN ONCE SERVER THUNKS DONE
  // const serverOwnerId = useSelector(state => state.servers[serverId]?.owner_id)
  // if (userId !== serverOwnerId) return <Redirect to={`/servers/${serverId}/categories/${categoryId}/channels`}></Redirect>

  const [name, setName] = useState(channel?.name || "");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!name.length) errors.push("Channel name must not be empty.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedChannel = {
      name,
      serverId,
      categoryId,
      channelId,
    };

    dispatch(createChannel(updatedChannel));
    history.push(`/servers/${serverId}/categories/${categoryId}/channels`);
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

export default EditChannel;
