import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Members from "../Members";
import ServersList from "../ServersList";
import ShowAllMessages from "../ShowAllMessages";
import ShowChannel from "../ShowChannel";
import { readMembers } from "../../store/members";
import "./Main.css"

function Main() {
  //NEED TO ADD SHOW USERS ONCE WRITTEN
  const { serverId } = useParams();
  const dispatch = useDispatch();

  // update members state when rendering main
  useEffect(() => {
    dispatch(readMembers(serverId));
  });

  return (
    <div className="main_div">
      <ServersList />
      <ShowChannel />
      <ShowAllMessages />
      <Members />
    </div>
  );
}

export default Main;
