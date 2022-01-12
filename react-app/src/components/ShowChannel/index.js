import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllChannels } from "../../store/channels";
import "./ShowChannel.css";

const ShowChannel = () => {
  const dispatch = useDispatch();
  let { serverId, channelId } = useParams();
  serverId = Number(serverId);
  channelId = Number(channelId);

  const channelsObj = useSelector((state) => state.channels);
  let channelsArr;
  if (channelsObj) {
    channelsArr = Object.values(channelsObj);
  }

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch, serverId, channelId]);

  return (
    <div className="channels_div">
      <p className="light_large">SERVER NAME</p>
      <ul className="channels_list">
        {channelsArr.map((channel) => (
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
        ))}
      </ul>
    </div>
  );
};

export default ShowChannel;
