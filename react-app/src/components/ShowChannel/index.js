import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllCategories } from "../../store/categories";
import { getAllChannels } from "../../store/channels";
import "./ShowChannel.css";

const ShowChannel = () => {
  const dispatch = useDispatch();
  let { serverId, channelId } = useParams();
  serverId = Number(serverId);
  channelId = Number(channelId);

  const categoriesObject = useSelector((state) => state.categories);
  const channelsObj = useSelector((state) => state.channels);

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
  }, [dispatch, serverId, channelId]);

  return (
    <div className="channels_div">
      <p className="light_large">SERVER NAME</p>
      <ul className="channels_list">
        {nullchannels.map((channel) => {
          return (
            <li>
              <NavLink
                to={`/servers/${serverId}/channels/${channel?.id}/messages`}
              >
                <p className="light_medium dynamic_underline" key={channel?.id}>
                  {channel?.name}
                </p>
              </NavLink>
              <NavLink to={`/servers/${serverId}/channels/${channel?.id}/edit`}>
                <i className="fas fa-edit"></i>
              </NavLink>
            </li>
          );
        })}
        {categoriesArr.map((category) => (
          <div>
            <h2>{category.name}</h2>
            <NavLink
              to={`/servers/${serverId}/categories/${category?.id}/edit`}
            >
              <i className="fas fa-edit"></i>
            </NavLink>
            {category.channelsList.map((channel) => {
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
                  <NavLink
                    to={`/servers/${serverId}/channels/${channel?.id}/edit`}
                  >
                    <i className="fas fa-edit"></i>
                  </NavLink>
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
