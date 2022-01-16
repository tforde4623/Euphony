import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllCategories } from "../../store/categories";
import { getAllChannels } from "../../store/channels";
import { showServers } from "../../store/servers";
import EditChannel from "../EditChannel";
import "./ShowChannel.css";

const ShowChannel = () => {
  const dispatch = useDispatch();
  let { serverId, channelId } = useParams();
  serverId = Number(serverId);
  channelId = Number(channelId);

  const categoriesObject = useSelector((state) => state.categories);
  const channelsObj = useSelector((state) => state.channels);
  const currServer = useSelector((state) => state.servers[serverId]);

  // Only render edit mode controls to the owner of the server
  const currUser = useSelector((state) => state.session.user);
  const owned = currServer?.owner_id === currUser?.id;

  // Only render editing buttons in edit mode?
  const [editMode, setEditMode] = useState(false);

  // Conditionally render either the name of the channel/category OR the form to edit it
  const [showChannelEdit, setShowChannelEdit] = useState(false);
  const [showcategoryEdit, setShowCategoryEdit] = useState(false);

  let channelsArr;
  let nullchannels = [];
  if (channelsObj) {
    channelsArr = Object.values(channelsObj);
    for (let i = 0; i < channelsArr.length; i++) {
      if (!channelsArr[i].category_id) {
        nullchannels.push(channelsArr[i]);
      }
    }
  }

  let categoriesArr;
  if (categoriesObject) {
    categoriesArr = Object.values(categoriesObject);
  }

  useEffect(() => {
    dispatch(getAllChannels());
    dispatch(getAllCategories(serverId));
    dispatch(showServers());
  }, [dispatch, serverId, channelId]);

  return (
    <div className="channels_div">
      <div id="channels_header">
        <div className="name_toggle_edit">
          {/* Display the server name */}
          <p className="light_large">{currServer?.name}</p>

          {/* If owner of the server, show a button to toggle edit mode */}
          {owned && (
            <button
              onClick={(e) => setEditMode(!editMode)}
              className="edit-submit-btn"
              id="edit_mode_toggle"
            >
              <i class="fas fa-ellipsis-v fa-lg"></i>
            </button>
          )}
        </div>

        {/* In edit mode, show two buttons: to add a channel and category  */}
        {owned && editMode && (
          <>
            <NavLink to={`/servers/${serverId}/categories/new`}>
              <button className="dark_small">
                <i class="fas fa-plus-circle fa-lg"></i> Category
              </button>
            </NavLink>
            <NavLink to={`/servers/${serverId}/channels/new`}>
              <button className="dark_small">
                <i class="fas fa-plus-circle fa-lg"></i> Channel
              </button>
            </NavLink>
          </>
        )}
      </div>

      {/* Display the channels and categories */}
      <ul className="channels_list">
        {/* Render channels with categories*/}
        {Object.values(categoriesObject).map((cat) => (
          <div>
            {/* Display category name */}
            <div id="category_edit">
              <h2 className="dark_large">{cat.name}</h2>
              {owned && editMode && (
                <NavLink
                  to={`/servers/${serverId}/categories/${cat.id}/edit`} // TODO change this
                >
                  <i className="fas fa-edit fa-lg"></i>
                </NavLink>
              )}
            </div>
            {/* Display channels within that category */}
            {cat.channels &&
              cat.channels.map((channel) => {
                return (showChannelEdit ? (
                  <EditChannel />
                ) : (
                  <li>
                    <NavLink
                      to={`/servers/${serverId}/channels/${channel?.id}/messages`}
                    >
                      <p
                        className="light_medium dynamic_underline"
                        key={channel?.id}
                      >
                        {channel?.name}
                      </p>
                    </NavLink>

                    {owned && editMode && (
                      <button onClick={() => setShowChannelEdit(true)}>
                        <i className="fas fa-edit fa-lg"></i>
                      </button>
                    )}
                  </li>
                ))
              })}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ShowChannel;
