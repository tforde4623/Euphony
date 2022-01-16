import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateChannel, getAllChannels } from "../../store/channels";
import "./EditChannel.css";
import DeleteChannel from "../DeleteChannel";

const EditChannel = ({ channelId, showChannelEdit, setShowChannelEdit }) => {
  let { serverId } = useParams();
  serverId = Number(serverId);
  channelId = Number(channelId);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.session.user?.id);
  const channel = useSelector((state) => state.channels[channelId]);
  const categories = useSelector((state) => state.categories);

  // COMMENT IN ONCE SERVER THUNKS DONE
  // const serverOwnerId = useSelector(state => state.servers[serverId]?.owner_id)
  // if (userId !== serverOwnerId) return <Redirect to={`/servers/${serverId}/categories/${categoryId}/channels`}></Redirect>

  const [name, setName] = useState("");
  const [selectCategory, setSelectCategory] = useState(
    Object.values(categories).filter(cat => cat.id === channel.category_id)[0].id || null
  );
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getAllChannels());
    setName(channel?.name);
  }, [dispatch, serverId, channelId, channel?.name]);

  useEffect(() => {
    const errors = [];
    if (!name?.length) errors.push("Channel name must not be empty.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedChannel = {
      name,
      serverId,
      channelId,
      categoryId: selectCategory,
      userId,
    };

    dispatch(updateChannel(updatedChannel));
    setShowChannelEdit(null);
    // history.push(`/servers/${serverId}/channels/${channelId}`);
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
          className="channel-name-input"
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
          {Object.values(categories).map((cat) => (
            <option value={cat.id}>{cat.name}</option>
          ))}
        </select>

        {/* Submit */}
        <button type="submit" disabled={errors.length > 0} className="add_btn">
          <i className="fas fa-plus"></i>
        </button>

        {/* Delete */}
        <DeleteChannel
          channelId={channelId}
          userId={userId}
          serverId={serverId}
        />
      </form>
    </div>
  );
};

export default EditChannel;
