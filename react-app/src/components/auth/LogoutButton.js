import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);


  const onLogout = async (e) => {
    await dispatch(logout());
    return <Redirect to="/"></Redirect>
  };

  return user && <button onClick={onLogout} className="light_small">Logout</button>;
};

export default LogoutButton;
