import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteChannel } from "../../store/channels";
import "./DeleteChannel.css";

const DeleteChannel = ({ serverId, channelId, userId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { userId, channelId };
    let deletedChannel = dispatch(deleteChannel(deletePayload));
    if (deletedChannel) {
      history.push(`/servers/${serverId}/channels`);
    }
  };
  return (
    <button onClick={handleDelete}>
      <i className="far fa-trash-alt"></i>
    </button>
  );
};

export default DeleteChannel;
