import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoButton from "../DemoButton";
import "./Auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/servers" />;
  }

  return (
    <div className="auth_img_div">
      <div className="auth_div">
        <form onSubmit={onLogin} className="auth_form">
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <input
            placeholder="Email"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button className="light_small" type="submit">Login</button>
        </form>
        <DemoButton />
        <a className="dynamic_underline" href="/sign-up">Need an account?</a>
      </div>
    </div>
  );
};

export default LoginForm;
