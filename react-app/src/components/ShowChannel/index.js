import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllCategories } from "../../store/categories";
import { getAllChannels } from "../../store/channels";
import { showServers } from "../../store/servers";
import EditChannel from "../EditChannel";
import EditCategory from "../EditCategory";
import NewCategory from "../NewCategory";
import NewChannel from "../NewChannel";
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
  const [showChannelEdit, setShowChannelEdit] = useState(null);
  const [showCategoryEdit, setShowCategoryEdit] = useState(null);
  const [showNewChannelForm, setShowNewChannelForm] = useState(false);
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);

  let channelsArr;
  let nullchannels = [];
  if (channelsObj) {
    channelsArr = Object.values(channelsObj);
    for (let i = 0; i < channelsArr.length; i++) {
      if (
        !channelsArr[i].category_id &&
        channelsArr[i].server_id === serverId
      ) {
        nullchannels.push(channelsArr[i]);
      }
    }
  }

  useEffect(() => {
    dispatch(getAllChannels());
    dispatch(getAllCategories(serverId));
    dispatch(showServers());
  }, [dispatch, serverId, channelId, showNewCategoryForm, showNewChannelForm, showChannelEdit, showCategoryEdit, editMode]);

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
              <i className="fas fa-ellipsis-v fa-lg"></i>
            </button>
          )}
        </div>

        {/* In edit mode, show two buttons: to add a channel and category  */}
        {owned && editMode && (
          <>
            {showNewCategoryForm ? (
              <NewCategory setShowNewCategoryForm={setShowNewCategoryForm} />
            ) : (
              <button
                className="dark_small new_cat_channel_btn"
                onClick={() => setShowNewCategoryForm(true)}
              >
                <i className="fas fa-plus-circle fa-lg"></i> Category
              </button>
            )}

            {showNewChannelForm ? (
              <NewChannel setShowNewChannelForm={setShowNewChannelForm} />
            ) : (
              <button
                className="dark_small new_cat_channel_btn"
                onClick={() => setShowNewChannelForm(true)}
              >
                <i className="fas fa-plus-circle fa-lg"></i> Channel
              </button>
            )}

            <NavLink to={`/servers/${serverId}/edit`}>
              <button className="dark_small">
                <i className="fas fa-edit"></i> Edit Server
              </button>
            </NavLink>
          </>
        )}
      </div>

      {/* Display the channels and categories */}
      <ul className="channels_list">
        {/* Display uncategorized channels first*/}
        {nullchannels.map((nch) =>
          // if the showChannelEdit, which is initialized to an integer matching an id matches the id of the current channel,
          // then render the EditChannel form in place of the name of the channel
          showChannelEdit && nch.id === showChannelEdit ? (
            // if it's true that showChannelEdit matches the id, that means the edit button has been clicked
            <EditChannel
              channelId={nch?.id}
              showChannelEdit={showChannelEdit}
              setShowChannelEdit={setShowChannelEdit}
              key={nch?.id}
            />
          ) : (
            // Otherwise show the name of the channel as well as an edit button (if owner of server)
            <li key={`displaying:${nch?.id}`}>
              <NavLink to={`/servers/${serverId}/channels/${nch?.id}`}>
                <p className="light_medium dynamic_underline" key={nch?.id}>
                  {nch?.name}
                </p>
              </NavLink>

              {owned && editMode && (
                <button onClick={() => setShowChannelEdit(nch?.id)}>
                  <i className="fas fa-edit fa-lg"></i>
                </button>
              )}
            </li>
          )
        )}

        {/* Render channels with categories*/}
        {Object.values(categoriesObject).map((cat) =>
          // if showCategoryEdit is set to an id that matches the current category id, it means the edit button has been
          // clicked, and so the EditCategory component is rendered in place
          showCategoryEdit && cat.id === showCategoryEdit ? (
            <EditCategory
              categoryId={cat?.id}
              serverId={serverId}
              key={`editing-category:${cat?.id}`}
              showCategoryEdit={showCategoryEdit}
              setShowCategoryEdit={setShowCategoryEdit}
            />
          ) : (
            // Otherwise show the category name and an edit button
            <div key={`displaying-category:${cat?.id}`}>
              {/* Display category name */}
              <div id="category_edit">
                <h2 className="dark_large">{cat.name}</h2>
                {owned && editMode && (
                  <button onClick={() => setShowCategoryEdit(cat?.id)}>
                    <i className="fas fa-edit fa-lg"></i>
                  </button>
                )}
              </div>

              {/* If the category has channels in it, then display channels within that category */}
              {cat.channels &&
                cat.channels.map((channel) => {
                  // If showChannelEdit is an integer that matches channel.id, then the edit button has been clicked
                  return showChannelEdit && channel.id === showChannelEdit ? (
                    <EditChannel
                      channelId={channel?.id}
                      showChannelEdit={showChannelEdit}
                      setShowChannelEdit={setShowChannelEdit}
                      key={`editing:${channel?.id}`}
                    />
                  ) : (
                    // Otherwise render the name and an edit button
                    <li key={`displaying:${channel?.id}`}>
                      <NavLink
                        to={`/servers/${serverId}/channels/${channel?.id}`}
                      >
                        <p className="light_medium dynamic_underline">
                          {channel?.name}
                        </p>
                      </NavLink>

                      {owned && editMode && (
                        <button onClick={() => setShowChannelEdit(channel?.id)}>
                          <i className="fas fa-edit fa-lg"></i>
                        </button>
                      )}
                    </li>
                  );
                })}
            </div>
          )
        )}
      </ul>
    </div>
  );
};

export default ShowChannel;
