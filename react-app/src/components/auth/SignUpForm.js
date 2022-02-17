import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import DemoButton from "../DemoButton";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userErrs, setUserErrs] = useState([]);
  const [emailErrs, setEmailErrs] = useState([]);
  const [passErrs, setPassErrs] = useState([]);
  const [repeatErrs, setRepeatErrs] = useState([]);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = e => {
    e.preventDefault();

    if (password === repeatPassword) {

      dispatch(signUp(username, email, password))
        .then(res => {
          if (res.errors || password !== repeatPassword) {
            if (res.errors.username) {
              setUserErrs(res.errors.username);
            } else if (res.errors.email) {
              setEmailErrs(res.errors.email);
            } else if (res.errors.password) {
              setPassErrs(res.errors.password);
            } else if (res.errors.general) {
              setErrors(res.errors.general);
            }
          }
        })
    } else {
      setRepeatErrs('Passwords must match!');
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
        {errors.length ? 
          <div>
            {errors.map(err => (
              <div className='input-err-msg' key={err}>{err}</div>
            ))}
          </div>
        : null }

          <input
            placeholder="Username"
            className={userErrs.length ? 'input-err' : null}
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>

          {userErrs.length ? 
            <div>
              {userErrs.map(err => (
                <div className='input-err-msg' key={err}>{err}</div>
              ))}
            </div>
          : null }

          <input
            placeholder="Email"
            className={emailErrs.length ? 'input-err' : null}
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>

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
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>

          {passErrs.length ? 
            <div>
              {passErrs.map(err => (
                <div className='input-err-msg' key={err}>{err}</div>
              ))}
            </div>
          : null }

          <input
            placeholder="Confirm password"
            className={repeatErrs.length ? 'input-err' : null}
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>

          {repeatErrs.length ? 
            <div>
              {repeatErrs.map(err => (
                <div className='input-err-msg' key={err}>{err}</div>
              ))}
            </div>
          : null }

          <button className="light_small" type="submit">Sign Up</button>
        </form>
        <DemoButton />
        <a className="dynamic_underline" href="/login">Already have an account?</a>
      </div>
    </div>
  );
};

export default SignUpForm;
