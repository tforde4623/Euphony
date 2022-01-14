import React from "react";
import { NavLink } from "react-router-dom";
import "./ServersList.css";

const ServersList = () => {
  return (
    <div className="servers_list_div">
      <NavLink to="/servers">
        <div>
          <i class="fas fa-home fa-lg"></i>
        </div>
      </NavLink>

      <NavLink to="/servers/new">
        <div>
        <i class="fas fa-plus fa-lg"></i>
        </div>
      </NavLink>

      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ServersList;
