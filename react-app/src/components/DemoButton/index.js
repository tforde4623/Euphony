import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const DemoButton = () => {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  };

  return <button className="light_small" onClick={handleDemoLogin}>Demo User</button>;
};

export default DemoButton;
