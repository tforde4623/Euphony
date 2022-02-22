import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoButton from "../DemoButton";
import "./Auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [emailErrs, setEmailErrs] = useState([]);
  const [passErrs, setPassErrs] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = e => {
    e.preventDefault();
    dispatch(login(email, password))
      .then(res => {
        if(res.errors) {
          if (res.errors.email) {
            setEmailErrs(res.errors.email);
          } else if (res.errors.password) {
            setPassErrs(res.errors.password);
          } else if (res.errors.general) {
            setErrors(res.errors.general);
          }
        }
      })
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
        {errors.length ? 
          <div>
            {errors.map(err => (
              <div className='input-err-msg' key={err}>{err}</div>
            ))}
          </div>
        : null }

          <input
            name="email"
            className={emailErrs.length ? 'input-err' : null}
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />

          {emailErrs.length ? 
            <div>
              {emailErrs.map(err => (
                <div className='input-err-msg' key={err}>{err}</div>
              ))}
            </div>
          : null }

          <input
            placeholder="Password"
            className={passErrs.length ? 'input-err' : null}
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
          />

          {passErrs.length ? 
            <div>
              {passErrs.map(err => (
                <div className='input-err-msg' key={err}>{err}</div>
              ))}
            </div>
          : null }

          <button className="light_small" type="submit">Login</button>
        </form>
        <DemoButton />
        <a className="dynamic_underline" href="/sign-up">Need an account?</a>
      </div>
    </div>
  );
};

export default LoginForm;
