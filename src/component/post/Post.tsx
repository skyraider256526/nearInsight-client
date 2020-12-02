import React from "react";

// MUI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface Post {
  userImage: string;
  body: string;
  createdAt: any;
  likeCount: number;
  commentCount: number;
  displayName: string;
  postId: string;
  userId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      display: "flex",
      marginBottom: 20,
    },
    image: {
      minWidth: 200,
    },
    content: { padding: 25, objectFit: "cover" },
  })
);

export function Post({
  userImage,
  body,
  createdAt,
  likeCount,
  commentCount,
  displayName,
  postId,
  userId,
}: Post): JSX.Element {
  dayjs.extend(relativeTime);
  console.log(createdAt);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userId}`}
          color="primary"
        >
          {displayName}
        </Typography>
        {/* {deleteButton} */}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt._seconds * 1000).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {/* <LikeButton postId={postId} /> */}
        <span>{likeCount} Likes</span>
        {/* <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton> */}
        <span>{commentCount} comments</span>
        {/* <ScreamDialog
          postId={postId}
          displayName={userHandle}
          openDialog={openDialog}
        /> */}
      </CardContent>
    </Card>
  );
}
