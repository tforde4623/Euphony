import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'));
  };

  return <button className="light_small" onClick={handleDemoLogin}>Demo User</button>;
};

export default DemoButton;
