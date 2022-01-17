import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { checkMemberships } from "../../store/members";
import { showServers } from "../../store/servers";
import LoginForm from "../auth/LoginForm";
import LogoutButton from "../auth/LogoutButton";
import DemoButton from "../DemoButton";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;
  const memberships = useSelector((state) => state.members.memberships);
  const defaultServerId = Object.values(memberships)[0].server_id;
  const servers = useSelector((state) => state.servers);
  const defaultChannelId = servers[defaultServerId]?.default_channel;

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
            <NavLink
              to="/servers"
              exact={true}
              activeClassName="active"
              className="dark_large dynamic_underline"
            >
              Join Servers
            </NavLink>
          </li>
          <li>
            {/* NTS: Link to favorite server?? */}
            <NavLink
              to={`/servers/${defaultServerId}/channels/${defaultChannelId}`}
              exact={true}
              activeClassName="active"
              className="dark_large dynamic_underline"
            >
              Your Servers
            </NavLink>
          </li>
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
              <i class="fab fa-github fa-2x"></i>
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
