import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { NavLink, useLocation } from "react-router-dom";

// MUI stuff
import { Button, Link, AppBar, Toolbar, Typography } from "@material-ui/core";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";

import { useSelector } from "react-redux";
import { RootState } from "app/store";

import MyButton from "component/myButton";
import Notifications from "./Notifications";
import { CreatePost } from "component/post";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "space-between",
    },
    title: {
      marginRight: theme.spacing(2),
    },
    // rightAlignDiv:{
    //   alignSelf:
    // }
  })
);

export default function Header() {
  const classes = useStyles();
  const location = useLocation();

  //TODO:Add current user in redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.currentUser.isAuthenticated
  );

  return location.pathname === "/" ? null : (
    <AppBar position="static" color="secondary">
      <Toolbar className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          NearInsight
        </Typography>
        <div>
          {isAuthenticated && (
            <>
              <CreatePost />
              <Notifications />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
