import React from "react";
import {  useSelector } from "react-redux";

import "./Members.css";

const Members = () => {
  const members = useSelector(state => state.members) || [];

  return (
    <div className="members_div">
      <h1 className="light_medium">Members</h1>
      <div>
      {Object.values(members).map(member => (
        <div>{member.username}</div>
      ))}
      </div>
    </div>
  );
};

export default Members;
