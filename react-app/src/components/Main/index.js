import React from "react";
import Members from "../Members";
import ServersList from "../ServersList";
import ShowAllMessages from "../ShowAllMessages";
import ShowChannel from "../ShowChannel";
import "./Main.css"

function Main() {
  //NEED TO ADD SHOW USERS ONCE WRITTEN

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
