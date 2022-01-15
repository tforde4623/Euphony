import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import JoinButton from "../joinbutton";
import UnjoinButton from "../unjoinbutton";




function ServerCard({server}) {
    const dispatch = useDispatch()
    const currUser = useSelector((state) => state.session.user);
    const memberships = useSelector((state) => state.members)
    const memberArr = Object.values(memberships)
    
   
    return (
        <div className="card-div">
            <div classname="server-card">
                <img src={server.icon_url}></img>
                <h2 classname="server-title">{server.name}</h2>
            </div>
            {memberArr.map(obj => obj.serverId).includes(server.Id) ? <UnjoinButton serverId={server.id}/> : <JoinButton serverId={server.id}/>}
        </div>
    );
}

export default ServerCard;
