import React, { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
// import Comments from './Comments';
// import CommentForm from './CommentForm';
import dayjs from "dayjs";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux stuff
import { getPost } from "features/data/postSlice";
import { RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";

import MyButton from "../myButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    //@ts-ignore
    ...theme.userForm,
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover",
    },
    dialogContent: {
      padding: 20,
    },
    closeButton: {
      position: "absolute",
      left: "90%",
    },
    expandButton: {
      position: "absolute",
      left: "90%",
    },
    spinnerDiv: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50,
    },
  })
);

export default function PostDialog(props) {
  const [open, setOpen] = useState(false),
    dispatch = useDispatch(),
    classes = useStyles(),
    dialogLoading = useSelector((state: RootState) => state.post.dialogLoading),
    {
      //@ts-ignore
      postId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      displayName,
      comments,
    } = useSelector((state: RootState) => state.post.post),
    // useEffect(() => {
    //   if () {
    //     handleOpen();
    //   }
    // });

    handleOpen = () => {
      dispatch(getPost(props.postId));
      setOpen(true);
    },
    handleClose = () => {
      setOpen(false);
    },
    dialogMarkup = dialogLoading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={1}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography color="primary" variant="h5">
            @{displayName}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt._seconds * 1000).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
    );
  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Expand post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
}
