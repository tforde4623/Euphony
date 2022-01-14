import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllCategories } from "../../store/categories";
import { getAllChannels } from "../../store/channels";
import { showServers } from "../../store/servers";
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
          <p className="light_large">{currServer?.name}</p>
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
      <ul className="channels_list">
        {/* Render uncategorized channels */}
        {/* nullchannels.map((channel) => {
          return (
            <li>
              <NavLink
                to={`/servers/${serverId}/channels/${channel?.id}/messages`}
              >
                <p className="light_medium dynamic_underline" key={channel?.id}>
                  {channel?.name}
                </p>
              </NavLink>

              {owned && editMode && (
                <NavLink
                  to={`/servers/${serverId}/channels/${channel?.id}/edit`}
                >
                  <i className="fas fa-edit fa-lg"></i>
                </NavLink>
              )}
            </li>
          );
        }) */} 

        {/* Render channels with categories*/}
        {Object.values(categoriesObject).map(cat => (
          <div>
            {/* Display category name */}
            <div  id="category_edit">
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
                return (
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
                      <NavLink
                        to={`/servers/${serverId}/channels/${channel?.id}/edit`}
                      >
                        <i className="fas fa-edit fa-lg"></i>
                      </NavLink>
                    )}
                  </li>
                );
              })}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ShowChannel;
