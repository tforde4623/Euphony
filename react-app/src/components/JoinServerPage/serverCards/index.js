import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import JoinButton from "../joinbutton";
import UnjoinButton from "../unjoinbutton";
import "./ServerCards.css";

function ServerCard({ server }) {
  const memberships = useSelector((state) => state.members.memberships);
  const memberArr = Object.values(memberships);

  return (
    <div className="card">
      <NavLink to="/servers/1/channels/1">
        <div className="card_img_container">
          <img src={server?.icon_url} alt={server?.name}></img>
        </div>
        <div className="card_content">
          <h2 className="card_title light_large">{server?.name}</h2>
        </div>
      </NavLink>
      {memberArr.map((obj) => obj.server_id).includes(server.id) ? (
        <UnjoinButton serverId={server.id} />
      ) : (
        <JoinButton serverId={server.id} />
      )}
    </div>
  );
}

export default ServerCard;
