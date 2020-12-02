import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// Utils
import { PrivateRoute } from "utils";

// Pages
import SignInAndSignUp from "features/sign-in-and-sign-up/SignInAndSignUp";
import Home from "features/home/Home";

import Header from "features/header/Header";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   console.log(userAuth);
    // if (userAuth) {
    //   const userRef = await createUserProfileDocument(userAuth);
    //   // Update the current user if any information change
    //   userRef.onSnapshot((snapShot: firestore.DocumentSnapshot): void => {
    //     const user = {
    //       id: snapShot.id,
    //       ...snapShot.data(),
    //     };
    //     setCurrentUser(user);
    //     console.log(user);
    //   });
    // } else {
    //   // When user signs out userAuth is null, set current user to null
    //   setCurrentUser(userAuth);
    // }
    // });
    // return () => {
    //   unsubscribeFromAuth();
    // };
  }, []);
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <Route path="/">
            <SignInAndSignUp />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
