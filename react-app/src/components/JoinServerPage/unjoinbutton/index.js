import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { unjoin } from "../../../store/members";

const UnjoinButton = ({ serverId }) => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.session.user);

  return (
    <button
      onClick={() => {
        dispatch(unjoin(serverId, currUser.id));
        // setSymbol('+')
      }}
    >
      <i className="fas fa-times fa-lg"></i>
    </button>
  );
};

export default UnjoinButton;
