import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { join } from "../../../store/members";
import { useState } from "react";

const JoinButton = ({ serverId }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);
  const memberships = useSelector((state) => state.members);
  const memberArr = Object.values(memberships);
  // const [symbol, setSymbol] = useState('+')

  const payload = {
    serverId,
    userId: currUser.id,
  };
  return (
    <button
      onClick={() => {
        dispatch(join(payload));
      }}
    >
      <i class="fas fa-plus fa-lg"></i>
    </button>
  );
};

export default JoinButton;
