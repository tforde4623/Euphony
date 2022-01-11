import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllChannels } from "../../store/channels";
import "./ShowChannel.css";

const ShowChannel = () => {
  const dispatch = useDispatch();
  let { serverId, categoryId, channelId } = useParams();
  serverId = Number(serverId);
  categoryId = Number(categoryId);
  channelId = Number(channelId);

  const channelsObj = useSelector((state) => state.channels);
  let channelsArr;
  if (channelsObj) {
    channelsArr = Object.values(channelsObj);
  }

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch, serverId, categoryId, channelId]);

  return (
    <ul>
      {channelsArr.map((channel) => (
        <NavLink
          to={`/servers/${serverId}/categories/${categoryId}/channels/${channelId}/messages`}
        >
          <li key={channel?.id}>{channel?.name}</li>
        </NavLink>
      ))}
    </ul>
  );
};

export default ShowChannel;
