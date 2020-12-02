import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI stuff
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { RootState } from "app/store";
import { IconButton, Tooltip } from "@material-ui/core";
import { uploadImage } from "features/user/userSlice";
//Redux

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: theme.palette.primary.main,
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  })
);

export function Profile() {
  const {
      credentials: { displayName, createdAt, imageUrl, bio, location, userId },
      isAuthenticated,
    } = useSelector((state: RootState) => state.user.currentUser),
    loading = useSelector((state: RootState) => state.user.profileLoading),
    classes = useStyles(),
    dispatch = useDispatch();

  function handleEditPicture() {
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
      fileInput.click();
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    //@ts-ignore
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    //@ts-ignore
    dispatch(uploadImage(formData));
  }

  let profileMarkup = !loading ? (
    isAuthenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img
              src={imageUrl}
              alt="profile picture"
              className="profile-image"
            />
            <input
              type="file"
              id="imageInput"
              hidden
              onChange={handleImageChange}
            />
            <Tooltip title="Edit profile picture" placement="top">
              <IconButton onClick={handleEditPicture} className="button">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${userId}`}
              color="primary"
              variant="h5"
            >
              @{displayName}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>
              Joined {dayjs(createdAt._seconds * 1000).format("MMM YYYY")}
            </span>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="primary" component={Link} to="/">
            Login
          </Button>
          <Button variant="contained" color="secondary" component={Link} to="/">
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );

  return profileMarkup;
}
