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
import NewServer from "./components/NewServer";
import EditServer from "./components/EditServer";
import Main from "./components/Main";
import ServersList from "./components/ServersList";
import EditCategory from "./components/EditCategory";
import NewCategory from "./components/NewCategory";
import ServerGrid from "./components/JoinServerPage";
import Splash from "./components/Splash";


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

        {/* Categories */}
        <Route path="/servers/:serverId/categories/new">
          <NewCategory />
        </Route>
        <Route path="/servers/:serverId/categories/:categoryId/edit">
          <EditCategory />
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
        <Route path="/servers/new">
          <NewServer />
        </Route>
        <Route path="/servers" exact>
          <ServersList />
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

        {/* Home */}
        <ProtectedRoute path="/" exact={true}>
          <Splash />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
