import React from "react";
import { useDispatch } from "react-redux";
import { deleteChannel } from "../../store/channels";
import "./DeleteChannel.css";

const DeleteChannel = ({ channelId, userId, setShowEditChannel }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { userId, channelId };
    dispatch(deleteChannel(deletePayload));
    setShowEditChannel(null);
  };
  return (
    <button onClick={handleDelete}>
      <i className="far fa-trash-alt"></i>
    </button>
  );
};

export default DeleteChannel;
