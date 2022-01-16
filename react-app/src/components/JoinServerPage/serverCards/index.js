import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import JoinButton from "../joinbutton";
import UnjoinButton from "../unjoinbutton";
import "./ServerCards.css"

function ServerCard({ server }) {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const memberships = useSelector((state) => state.members);
  const memberArr = Object.values(memberships);

  return (
    <div className="card">
      <div className="card_img_container">
        <img src={server?.icon_url} alt={server?.name}></img>
      </div>
      <div className="card_content">
        <h2 className="card_title light_large">{server?.name}</h2>
      </div>
      {memberArr.map((obj) => obj.serverId).includes(server.Id) ? (
        <UnjoinButton serverId={server.id} />
      ) : (
        <JoinButton serverId={server.id} />
      )}
    </div>
  );
}

export default ServerCard;
