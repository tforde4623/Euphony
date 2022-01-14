import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { join, unjoin } from "../../../store/members";



function ServerCard({server}) {
    const currUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()

    

    return (
        <div className="card-div">
            <card classname="server-card">
                <h2 classname="server-title">{server.name}</h2>
            </card>
            <button classname="join-button" onClick={}>+</button>
        </div>
    );
}

export default ServerCard;
