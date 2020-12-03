import React, { ChangeEvent, useState } from "react";
// Redux stuff
import { RootState } from "app/store";
import { editUserDetails } from "features/user/userSlice";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Theme, Tooltip } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    //@ts-ignore
    ...theme.userForm,
    edit: {
      float: "right",
    },
  })
);

export default function EditDetails() {
  const [details, setDetails] = useState({
      bio: "",
      location: "",
    }),
    [open, setOpen] = useState(false),
    classes = useStyles(),
    { credentials } = useSelector((state: RootState) => state.user.currentUser),
    dispatch = useDispatch();

  function mapUserDetailsToState(credentials) {
    setDetails({
      bio: credentials.bio ? credentials.bio : "",
      location: credentials.location ? credentials.location : "",
    });
  }

  function handleOpen() {
    setOpen(true);
    mapUserDetailsToState(credentials);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDetails(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }
  function handleSubmit() {
    const userDetails = {
      bio: details.bio,
      location: details.location,
    };
    dispatch(editUserDetails(userDetails));
    handleClose();
  }
  return (
    <>
      <Tooltip title="Edit Details" placement="top">
        <IconButton onClick={handleOpen} className={classes.edit}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={details.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={details.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
