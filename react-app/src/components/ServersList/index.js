import React, { useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { checkMemberships } from "../../store/members";
import "./ServersList.css";
const ServersList = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user?.id)
  console.log(userId, 'iserId in ')

  useEffect(() => {
    dispatch(checkMemberships(userId));
  });



  return (
    <div className="servers_list_div">
      <NavLink to="/servers">
        <div>
          <i class="fas fa-home fa-lg"></i>
        </div>
      </NavLink>

      <NavLink to="/servers/new">
        <div>
          <i class="fas fa-plus fa-lg"></i>
        </div>
      </NavLink>

      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ServersList;
