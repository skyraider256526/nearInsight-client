import React, { useEffect, useState } from "react";

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
  useMediaQuery,
  CircularProgress,
  Link,
} from "@material-ui/core";

import axios, { AxiosError } from "axios";

import QuotesComponent from "component/quotesComponent";
import BootstrapInput from "component/BootStrapInputComponent";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AppIcon from "images/icon.png";
import "./style.scss";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { userLogIn, userSignUp } from "features/user/userSlice";
import { RootState } from "app/store";

const loginStyles = makeStyles((theme: Theme) =>
  createStyles({
    //@ts-ignore
    ...theme.userForm,
    root: {
      // height: "100vh",
      textAlign: "center",
      maxWidth: 400,
      [theme.breakpoints.down("sm")]: {
        margin: "0 20px",
      },
      display: "flex",
      flexDirection: "column",
    },
  })
);

const signInSignUpStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      // margin: "-80px auto 0 auto",
    },
    left: {
      width: "40%",
    },
  })
);

interface Credentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends Credentials {
  confirmPassword: string;
  displayName: string;
}

function Login(props: {
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = loginStyles(),
    [credentials, setCredentials] = useState<Credentials>({
      email: "",
      password: "",
    }),
    history = useHistory(),
    location = useLocation(),
    loading = useSelector((state: RootState) => state.user.uiLoading),
    errors = useSelector((state: RootState) => state.user.errors),
    //@ts-ignore
    { from } = location.state || { from: { pathname: "/home" } },
    dispatch = useDispatch();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(userLogIn({ ...credentials, from, history }));
    // await createUserProfileDocument(user, { displayName });
    setCredentials({
      email: "",
      password: "",
    });
  }

  return (
    <Grid container className={classes.root}>
      <Grid item sm>
        <img src={AppIcon} alt="logo" className={classes.image} />
        <Typography variant="h4" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={credentials.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={credentials.password}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            dont have an account ? sign up{" "}
            <Link
              component="button"
              onClick={(event: React.FormEvent) => {
                event.preventDefault();
                props.setLoginForm(false);
              }}
            >
              here
            </Link>
          </small>
        </form>
      </Grid>
    </Grid>
  );
}

function SignUp(props: {
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const classes = loginStyles(),
    [credentials, setCredentials] = useState<SignUpCredentials>({
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    }),
    history = useHistory(),
    errors = useSelector((state: RootState) => state.user.errors),
    loading = useSelector((state: RootState) => state.user.uiLoading),
    location = useLocation(),
    dispatch = useDispatch(),
    //@ts-ignore
    { from } = location.state || { from: { pathname: "/home" } };
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch(userSignUp({ ...credentials, from, history }));
    // await createUserProfileDocument(user, { displayName });
    setCredentials({
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    });
  }

  // return (
  //   <form className={classes.root} noValidate autoComplete="off">
  //     <TextField
  //       id="email"
  //       label="Email"
  //       type="text"
  //       value={credentials.email}
  //       onChange={handleChange}
  //     />
  //     <TextField
  //       id="password"
  //       label="Password"
  //       type="password"
  //       value={credentials.password}
  //       onChange={handleChange}
  //     />
  //     <TextField
  //       id="confirmPassword"
  //       label="confirmPassword"
  //       type="password"
  //       value={credentials.confirmPassword}
  //       onChange={handleChange}
  //     />
  //     <Button onClick={handleSubmit}>Submit</Button>
  //   </form>
  // );
  return (
    <Grid container className={classes.root}>
      <Grid item sm>
        <img src={AppIcon} alt="logo" className={classes.image} />
        <Typography variant="h4" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={credentials.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="displayName"
            name="displayName"
            type="displayName"
            label="Display Name"
            className={classes.textField}
            helperText={errors.displayName}
            error={errors.displayName ? true : false}
            value={credentials.displayName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={credentials.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={credentials.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            SIGN UP
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            have an account ? login{" "}
            <Link
              component="button"
              onClick={(event: React.FormEvent) => {
                event.preventDefault();
                props.setLoginForm(true);
              }}
            >
              here
            </Link>
          </small>
        </form>
      </Grid>
    </Grid>
  );
}

export default function SignInSignUp() {
  const classes = signInSignUpStyles();
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));
  const [loginForm, setLoginForm] = useState(true),
    history = useHistory();

  // if (localStorage.getItem("FBIdToken")) <Redirect to="/home" />;
  // useEffect(() => {}, []);
  return localStorage.getItem("FBIdToken") ? (
    <Redirect to="/home" />
  ) : (
    <Grid
      spacing={matches ? 0 : 3}
      container
      justify="space-around"
      className={classes.root}
    >
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
      <Grid item md={6} xs={12} alignItems="center" justify="center" container>
        <SwitchTransition>
          <CSSTransition
            key={loginForm ? "login" : "signup"}
            // addEndListener={(node, done) =>
            //   node.addEventListener("transitionend", done, false)
            // }
            timeout={1000}
            classNames="fade"
          >
            {loginForm ? (
              <Login setLoginForm={setLoginForm} />
            ) : (
              <SignUp setLoginForm={setLoginForm} />
            )}
          </CSSTransition>
        </SwitchTransition>
      </Grid>
    </Grid>
  );
}
