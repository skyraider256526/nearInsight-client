import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { firestore } from "firebase";

import SignInAndSignUp from "features/sign-in-and-sign-up/SignInAndSignUp";
import { setCurrentUser } from "features/user/userSlice";
import firebase, { auth, createUserProfileDocument } from "services/firebase";
import { PrivateRoute } from "utils";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        // Update the current user if any information change
        userRef.onSnapshot((snapShot: firestore.DocumentSnapshot): void => {
          const user = {
            id: snapShot.id,
            ...snapShot.data(),
          };
          setCurrentUser(user);
          console.log(user);
        });
      } else {
        // When user signs out userAuth is null, set current user to null
        setCurrentUser(userAuth);
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);
  const Home = () => {
    console.log("home");
    return <p>hiiiiiiiiiii i</p>;
  };
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/home" component={Home} />
        <Route path="/">
          <SignInAndSignUp />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
