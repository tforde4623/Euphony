import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import DemoButton from "../DemoButton";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth_img_div">
      <div className="auth_div">
        <form onSubmit={onSignUp} className="auth_form">
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <input
            placeholder="Username"
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>

          <input
            placeholder="Email"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>

          <input
            placeholder="Password"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>

          <input
            placeholder="Confirm password"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>

          <button className="light_small" type="submit">Sign Up</button>
        </form>
        <DemoButton />
        <a className="dynamic_underline" href="/login">Already have an account?</a>
      </div>
    </div>
  );
};

export default SignUpForm;
