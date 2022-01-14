import React from "react";
import { useSelector } from "react-redux";

import "./Members.css";

const Members = () => {
  const members = useSelector((state) => state.members) || [];

  return (
    <div className="members_div">
      <h1 className="light_medium">Members</h1>

      {Object.values(members).map((member) => (
        <div className="member_icon_name">
          <div className="member_icon_div light_medium">
            {member.icon_url ? null : member.username[0]}
            {member.icon_url && (
              <img src={member.user.icon_url} alt="user icon"></img>
            )}
          </div>
          <div>{member.username}</div>
        </div>
      ))}
    </div>
  );
};

export default Members;
