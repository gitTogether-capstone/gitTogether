import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import ProjectFeed from "./components/ProjectFeed";
import SingleProject from "./components/SingleProject";

function Routes() {
  const isLoggedIn = useSelector((state) => {
    if (!state.user) return false;
    else if (!state.user.id) return false;
    else return true;
  });
  console.log(isLoggedIn);
  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/me" component={UserProfile} />
          <Route path="/projects" component={ProjectFeed} />
          <Route path="/login" component={Login} />
          {/* exact path /projects/:projectid didn't work I will try to fix later */}
          <Route exact path="/:projectId" component={SingleProject} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      )}
    </div>
  );
}

export default Routes;
