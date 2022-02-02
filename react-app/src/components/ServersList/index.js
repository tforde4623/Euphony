import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { checkMemberships } from "../../store/members";
import { showServers } from "../../store/servers";
import "./ServersList.css";
const ServersList = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user?.id);
  const memberships = useSelector((state) => state.members.memberships);
  const servers = useSelector((state) => state.servers);

  useEffect(() => {
    dispatch(checkMemberships(userId));
    dispatch(showServers());
  }, [dispatch, userId]);


  return (
    <div className="servers_list_div">
      <NavLink to="/servers">
        <div>
          <i className="fas fa-home fa-lg"></i>
        </div>
      </NavLink>

      <NavLink to="/servers/new">
        <div>
          <i className="fas fa-plus fa-lg"></i>
        </div>
      </NavLink>

      {Object.values(memberships).map((serverMembership) => {
        return (
          <NavLink key={`serverMembershipIds:${servers[serverMembership?.server_id]?.default_channel}`}
            to={`/servers/${serverMembership?.server_id}/channels/${
              servers[serverMembership?.server_id]?.default_channel
            }`}
          >
            <div >
              <img alt={servers[serverMembership?.server_id]?.name} src={servers[serverMembership?.server_id]?.icon_url}></img>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ServersList;
