import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import ServerCard from "./serverCards";
import { showServers } from "../../store/servers";
import { checkMemberships } from "../../store/members";
import ServersList from "../ServersList";
import "./JoinServerPage.css";

function ServerGrid() {
  const currUser = useSelector((state) => state.session.user);
  const userId = currUser?.id;

  const dispatch = useDispatch();
  const serverlist = useSelector((state) => state.servers);
  const serverArr = Object.values(serverlist);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    dispatch(showServers());
    dispatch(checkMemberships(userId));
  }, [dispatch, userId]);

  if (!currUser) return <Redirect to="/login"></Redirect>;

  return (
    <div className="server_grid_page">
      <div className="banner">
        <NavLink to="servers/new">
          <button className="dark_medium">Add a Server</button>
        </NavLink>
      </div>
      <div id="svrs_memberships_list">
        <ServersList />
      </div>
      <main className="grid">
        <section className="cards">
          {serverArr.map((server) => {
            return <ServerCard server={server} key={server.id} />;
          })}
        </section>
      </main>

        {showModal && 
          <div className='tutorial-modal'>
            <i 
              onClick={() => setShowModal(false)} 
              className="exit fas fa-times fa-lg"></i>
            <div className='modal-body'>
              <span className='tutorial-text'>
                  Welcome to Euphony! Here is where you will choose which 
                communities you want to be a part of! We have all kinds of categories from dogs
                to sports. Find a server you like, click the button underneath. If the button
                shows an "X" it means you are already a part of the server, once you have
                a server navigate to "Your Servers" or choose one from the server list above.
              </span>
              <button onClick={() => setShowModal(false)}>I Got It!</button>
            </div>
          </div>
        }
      {showModal && <div className='darken'></div>}
    </div>
  );
}

export default ServerGrid;
