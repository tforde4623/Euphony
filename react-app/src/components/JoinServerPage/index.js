import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import ServerCard from "./serverCards";
import { showServers } from "../../store/servers";
import { checkMemberships } from "../../store/members";



function ServerGrid() {
    const currUser = useSelector((state) => state.session.user);
    const userId = currUser.id
    const dispatch = useDispatch()
    const serverlist = useSelector(state => state.servers)
    const serverArr = Object.values(serverlist)
 
    
    
    useEffect(() => {
        dispatch(showServers());
        dispatch(checkMemberships(userId))
    }, []);

    return (
        <div className="server-grid">
            <h1>Choose a server...</h1>
            <div classname="card-grid">
            {serverArr.map((server) => {
                return(
                    <div key={server.id}>
                        <ServerCard server={server} />
                    </div>
                )
            })}
            </div>
        </div>
    );
}

export default ServerGrid;
