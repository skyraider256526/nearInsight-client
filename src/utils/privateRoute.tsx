import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "features/user/userSlice";
import { RootState } from "app/store";
//@ts-ignore
const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation(),
    isAuthenticated = useSelector(
      (state: RootState) => state.user.currentUser.isAuthenticated
    );
  // const currentUser = useSelector(selectCurrentUser);
  // console.log(auth.currentUser);

  return (
    <Route {...rest}>
      {isAuthenticated ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
