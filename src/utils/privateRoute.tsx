import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "features/user/userSlice";
import { auth } from "services/firebase";
//@ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  console.log(auth.currentUser);

  return (
    <Route {...rest}>
      {currentUser ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
