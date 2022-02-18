import React, { useEffect, useState } from "react";
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
  const [showMenu, setShowMenu] = useState(false);

  // Burger menu logic: only applicable at 700px wide or less
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(checkMemberships(userId)); // to check if user has any memberships; if not /servers/id/channels/id is not accessible
    dispatch(showServers());
  }, [dispatch, userId]);

  // If the user has servers they're a member of, navigate to the first server
  // otherwise display an alert to prompt user to join a server first
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

  // Navigation links
  let navigationLinks = (
    <div className="nav_links" id={user ? "auth" : "noauth"}>
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
      <li onClick={() => window.open("https://github.com/tforde4623/Euphony")}>
        <i className="fab fa-github fa-2x"></i>
      </li>
    </div>
  );

  // Session Links: if user, display user info; else auth prompts
  let sessionLinks;
  if (user) {
    sessionLinks = (
      <div className="auth_nav_div" id={user ? "auth" : "noauth"}>
        <LogoutButton />
        <div className="auth_user_info">
          <div className="auth_user_icon light_medium">
            {user?.icon_url ? null : user?.username[0]}
            {user?.icon_url && <img src={user?.icon_url} alt="user icon"></img>}
          </div>
          <p>{user?.username}</p>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className="auth_nav_div" id={user ? "auth" : "noauth"}>
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

        {/* Horizontal (non-burger navbar) */}
        {navigationLinks}
        {sessionLinks}
      </ul>

      {/* ----------------------------*/}
      {/* Dropdown burger menu */}
      {/* Button to toggle menu */}
      <button onClick={openMenu} id="menu">
        <i className="fas fa-bars fa-lg"></i>
      </button>

      {/* On click, change T/F of showMenu */}
      {showMenu && (
        <ul className="dropdown">
          <button onClick={openMenu} id="menu_on_dropdown">
            <i className="fas fa-bars fa-lg"></i>
          </button>

          {/* If there's a user, display user info; otherwise auth options */}
          {user ? (
            <>
              <div className="auth_user_info" id="user_indo_dropdown">
                <div className="auth_user_icon light_medium">
                  {user?.icon_url ? null : user?.username[0]}
                  {user?.icon_url && (
                    <img src={user?.icon_url} alt="user icon"></img>
                  )}
                </div>
                <p>{user?.username}</p>
              </div>
              <LogoutButton />
            </>
          ) : (
            <>
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
            </>
          )}

          {/* If there's a user, show links join/see own servers */}
          {user && (
            <>
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
              {yourServersLink}
            </>
          )}
          <li>
            <NavLink
              to="/about"
              activeClassName="active"
              className="dark_large dynamic_underline"
            >
              About
            </NavLink>
          </li>

          <li
            onClick={() => window.open("https://github.com/tforde4623/Euphony")}
            id="dropdown_gh"
          >
            <i className="fab fa-github fa-2x"></i>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
