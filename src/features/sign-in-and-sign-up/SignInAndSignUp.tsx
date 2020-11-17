import React, { useState } from "react";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Hidden,
  Grid,
  TextField,
  Paper,
  Typography,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import firebase, { auth, createUserProfileDocument } from "services/firebase";

import QuotesComponent from "component/quotesComponent";
import BootstrapInput from "component/BootStrapInputComponent";
import { userSignIn } from "features/user/user.thunk";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const signUpStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      display: "flex",
      flexDirection: "column",
    },
  })
);

const loginStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    left: {
      width: "40%",
    },
  })
);

const signInStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    name: {},
    form: {
      display: "flex",
      flexDirection: "column",
      padding: 40,
      paddingTop: 10,
      paddingBottom: 0,
    },
  })
);

interface Credentials {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function SignInComponent() {
  const location = useLocation();
  //@ts-ignore
  const { from } = location.state || { from: { pathname: "/" } };
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(from);
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    callbacks: {
      signInSuccessWithAuthResult: function (
        authResult: firebase.auth.UserCredential,
        redirectUrl: string
      ) {
        const user = authResult.user;
        const credential = authResult.credential;
        // const isNewUser = authResult.additionalUserInfo.isNewUser;
        // const providerId = authResult.additionalUserInfo.providerId;
        const operationType = authResult.operationType;
        // Do something with the returned AuthResult.
        // Return type determines whether we continue the redirect
        // automatically or whether we leave that to developer to handle.

        //@ts-ignore
        dispatch(userSignIn(user));
        //TODO: handle redirect with react router
        console.log(authResult);
        history.replace(from.pathname);
        return false;
      },
      signInFailure: async function (error: firebaseui.auth.AuthUIError) {
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.

        //TODO: handle login flauire
        console.log("login fail", error);

        return new Promise<void>(() => {
          console.log("res");
          return;
        });
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        // document.getElementById('loader').style.display = 'none';
      },
    },
    signInSuccessUrl: "/signedIn",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  const classes = signInStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Typography className={classes.name}>NearInsight</Typography>
      <div className={classes.form}>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </div>
    </Paper>
  );
}

function SignUp() {
  const classes = signUpStyles();
  const [credentials, setCredentials] = useState<Credentials>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials(prevState => ({
      [name]: value,
      ...prevState,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = credentials;
    if (password !== confirmPassword) {
      alert("Pass not match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });
      setCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="email"
        label="Email"
        type="text"
        value={credentials.email}
        onChange={handleChange}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <TextField
        id="confirmPassword"
        label="confirmPassword"
        type="password"
        value={credentials.confirmPassword}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  );
}
export default function Login() {
  const classes = loginStyles();
  return (
    <Grid spacing={3} container justify="space-around" className={classes.root}>
      {/* TODO: use maxwith and margin:auto to apply border */}
      <Hidden xsDown>
        <Grid
          item
          container
          md={6}
          className={classes.left}
          alignItems="center"
          justify="center"
        >
          <QuotesComponent />
        </Grid>
      </Hidden>
      <Grid item md={6} xs alignItems="center" justify="center" container>
        <SignInComponent />
      </Grid>
    </Grid>
  );
}
