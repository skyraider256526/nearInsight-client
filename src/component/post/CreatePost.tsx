import React, { ChangeEvent, useState } from "react";
import MyButton from "component/myButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { createPost, clearErrors } from "features/data/postSlice";
// Redux stuff

const useStyles = makeStyles((theme: Theme) =>
  //@ts-ignore
  createStyles({
    // ...theme,
    submitButton: {
      position: "relative",
      float: "right",
      marginTop: 10,
    },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      position: "absolute",
      left: "91%",
      top: "6%",
    },
  })
);

export function CreatePost() {
  const [open, setOpen] = useState(false),
    [body, setBody] = useState(""),
    isPosting = useSelector((state: RootState) => state.post.isPosting),
    position = useSelector((state: RootState) => state.post.location),
    errors = useSelector((state: RootState) => state.post.error),
    dispatch = useDispatch(),
    classes = useStyles(),
    handleOpen = () => {
      setOpen(true);
    },
    handleClose = () => {
      //TODO: Clear errors in redux
      setOpen(false);
      dispatch(clearErrors());
    },
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const body = event.target.value;
      setBody(body);
    },
    handleSubmit = event => {
      event.preventDefault();
      console.log(body);
      //TODO: Post
      dispatch(createPost({ body, position }));
      setOpen(false);
    };
  return (
    <>
      <MyButton onClick={handleOpen} tip="Create a Post!">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Create a new Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="POST!!"
              multiline
              rows="3"
              placeholder="Share your experience of your location"
              error={errors.body ? true : false}
              helperText={errors.body}
              // className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={isPosting || body === ""}
            >
              Submit
              {isPosting && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
