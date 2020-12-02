import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button, Link } from "@material-ui/core";
import { NavLink, useLocation } from "react-router-dom";

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
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //TODO:Add current user in redux
  const currentUser = null;

  return location.pathname === "/" ? null : (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Typography variant="h6" className={classes.title}>
          NearInsight
        </Typography>
        <div>
          {currentUser ? (
            <Button>SIGN OUT</Button>
          ) : (
            <Link component={NavLink} to="/signin">
              SIGN IN
            </Link>
          )}
          {/* <SignInDialog onClose={handleClose} open={open} /> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
