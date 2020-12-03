import React, { useState } from "react";

// MUI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";

// Icons
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import MyButton from "../myButton";
import { useDispatch } from "react-redux";
import { deletePost } from "features/data/postSlice";

interface props {
  postId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      left: "90%",
      top: "10%",
    },
  })
);

function DeletePost(props: props) {
  const [open, setOpen] = useState(false),
    dispatch = useDispatch(),
    classes = useStyles();
  return (
    <>
      <span className={classes.root}>
        <MyButton tip="Delete Scream" onClick={() => setOpen(true)}>
          <DeleteOutline color="secondary" />
        </MyButton>
      </span>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              dispatch(deletePost(props.postId));
              setOpen(false);
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeletePost;
