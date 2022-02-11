import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { checkMemberships } from "../../store/members";
import { showServers } from "../../store/servers";
import LogoutButton from "../auth/LogoutButton";
import DemoButton from "../DemoButton";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;
  const memberships = useSelector((state) => state.members.memberships);
  const membershipsArr = Object.values(memberships);
  const defaultServerId = membershipsArr[0]?.server_id;
  const servers = useSelector((state) => state.servers);
  const defaultChannelId = servers[defaultServerId]?.default_channel;

  const yourServersLink = membershipsArr.length ? (
    <NavLink
      to={`/servers/${defaultServerId}/channels/${defaultChannelId}`}
      exact={true}
      activeClassName="active"
      className="dark_large dynamic_underline"
    >
      Your Servers
    </NavLink>
  ) : (
    <p
      onClick={() => {
        alert("Join at least one server first.");
      }}
      className="dark_large dynamic_underline"
    >
      Your Servers
    </p>
  );

  useEffect(() => {
    dispatch(checkMemberships(userId));
    dispatch(showServers());
  }, [dispatch, userId]);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <div className="auth_nav_div">
        <div className="auth_user_info">
          <div className="auth_user_icon light_medium">
            {user?.icon_url ? null : user?.username[0]}
            {user?.icon_url && <img src={user?.icon_url} alt="user icon"></img>}
          </div>
          <p>{user?.username}</p>
        </div>
        <LogoutButton />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className="auth_nav_div">
          <li>
            <button>
              <NavLink
                to="/login"
                exact={true}
                activeClassName="active"
                className="light_small"
              >
                Login
              </NavLink>
            </button>
          </li>
          <li>
            <button>
              <NavLink
                to="/sign-up"
                exact={true}
                activeClassName="active"
                className="light_small"
              >
                Sign Up
              </NavLink>
            </button>
          </li>
          <li>
            <DemoButton />
          </li>
        </div>
      </>
    );
  }

  return (
    <nav>
      <ul>
        {/* Logo */}
        <NavLink to="/">
          <div className="logo_div">
            <h1 className="dark_large" id="logo">
              Euphony
            </h1>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <div className="nav_links">
          <li>
            {user && (
              <NavLink
                to="/servers"
                exact={true}
                activeClassName="active"
                className="dark_large dynamic_underline"
              >
                Join Servers
              </NavLink>
            )}
          </li>
          <li>{user && yourServersLink}</li>
          <li>
            <NavLink
              to="/about"
              activeClassName="active"
              className="dark_large dynamic_underline"
            >
              About
            </NavLink>
          </li>
          <li>
            <a href="https://github.com/tforde4623/Euphony">
              <i className="fab fa-github fa-2x"></i>
            </a>
          </li>
        </div>

        {/* Authentication */}
        {sessionLinks}
      </ul>
    </nav>
  );
};

export default NavBar;
