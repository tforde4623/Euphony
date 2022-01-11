import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import { deleteChannel } from "../../store/channels";
import "./DeleteChannel.css";

const DeleteChannel = ({ serverId, categoryId, channelId, userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { userId, channelId };
    let deletedChannel = dispatch(deleteChannel(deletePayload));
    if (deletedChannel) {
      history.push(`/servers/${serverId}/categories/${categoryId}/channels`);
    }
  };
  return (
    <button onClick={handleDelete} className="edit_cocktail_button">
      <i className="far fa-trash-alt"></i>
    </button>
  );
};

export default DeleteChannel;
