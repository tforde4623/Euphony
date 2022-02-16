import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import NewServer from "./components/NewServer";
import EditServer from "./components/EditServer";
import Main from "./components/Main";
import ServerGrid from "./components/JoinServerPage";
import Splash from "./components/Splash";
import AboutUs from "./components/AboutUs";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* Auth  */}
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>

        {/* Main */}
        <Route path="/servers/:serverId/channels/:channelId">
          <Main />
        </Route>

        {/* Servers */}
        <Route path="/servers/new">
          <NewServer />
        </Route>
        <Route path="/servers" exact>
          <ServerGrid />
        </Route>
        <Route path="/servers/:serverId/edit">
          <EditServer />
        </Route>

        {/* Users */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>

        <Route path="/about">
          <AboutUs />
        </Route>

        {/* Home */}
        <Route path="/" exact={true}>
          <Splash />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
