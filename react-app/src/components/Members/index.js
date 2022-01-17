import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { readMembers } from "../../store/members";
import "./Members.css";

const Members = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();

  const members = useSelector((state) => state.members) || [];
  useEffect(() => {
    dispatch(readMembers(serverId));
  }, [dispatch]);

  return (
    <div className="members_div">
      <h1 className="light_medium">Members</h1>

      <div className="list_all_members_div">
        {members?.serverMembers &&
          Object.values(members?.serverMembers).map((member) => (
            <div className="member_icon_name">
              <div className="member_icon_div light_medium">
                {member?.icon_url ? null : member?.username[0]}
                {member.icon_url && (
                  <img src={member.icon_url} alt="user icon"></img>
                )}
              </div>
              <div>{member.username}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Members;
