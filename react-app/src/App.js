import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import EditMessage from "./components/EditMessage";
import { authenticate } from "./store/session";
import NewMessage from "./components/NewMessage";
import NewChannel from "./components/NewChannel";
import ShowChannel from "./components/ShowChannel";
import EditChannel from "./components/EditChannel";
import Main from "./components/Main";

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

        {/* Messagaes */} 
        <Route path="/servers/:serverId/channels/:channelId/messages/:messageId">
          <EditMessage />
        </Route>
        <Route path="/servers/:serverId/channels/:channelId/messages/new">
          <NewMessage />
        </Route>
        <Route path="/servers/:serverId/channels/:channelId/messages">
          <Main />
        </Route>

        {/* Channels */}
        <Route path="/servers/:serverId/channels/new">
          <NewChannel />
        </Route>
        <Route path="/servers/:serverId/channels/:channelId/edit">
          <EditChannel />
        </Route>
        <Route path="/servers/:serverId/channels">
          <ShowChannel />
        </Route>

        {/* Servers */}

        {/* Users */}
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>

        {/* Home */}
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
