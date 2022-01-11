import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    // return <Redirect to="/"></Redirect>
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
