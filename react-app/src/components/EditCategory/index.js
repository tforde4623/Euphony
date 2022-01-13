import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
// import { getAllCategories } from "../../store/categories";
// import { getAllChannels } from "../../store/channels";
import "./EditCategory.css";

const EditCategory = () => {


  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { userId, categoryId };
    let deletedCategory = dispatch(deleteChannel(deletePayload));
    if (deletedCategory) {
      history.push(`/servers/${serverId}/channels/${channelId}`);
    }
  };

  return (
    <div>
      {/* DELETE */}
      <button onClick={handleDelete}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default EditCategory;
