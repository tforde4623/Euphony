import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ServerCard from "./serverCards";
import { showServers } from "../../store/servers";
import { checkMemberships } from "../../store/members";
import "./JoinServerPage.css"

function ServerGrid() {
  const currUser = useSelector((state) => state.session.user);
  const userId = currUser.id;
  const dispatch = useDispatch();
  const serverlist = useSelector((state) => state.servers);
  const serverArr = Object.values(serverlist);

  useEffect(() => {
    dispatch(showServers());
    dispatch(checkMemberships(userId));
  }, []);

  return (
      <div className="grid">
      <section className="cards">
        {serverArr.map((server) => {
          return (
              <ServerCard server={server} key={server.id} />
          );
        })}
      </section>
      </div>
  );
}

export default ServerGrid;
