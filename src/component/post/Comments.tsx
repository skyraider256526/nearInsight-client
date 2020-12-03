import React, { Fragment } from "react";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

//Redux
import { RootState } from "app/store";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    //@ts-ignore
    ...theme.userFrom,
    commentImage: {
      maxWidth: "100%",
      height: 100,
      objectFit: "cover",
      borderRadius: "50%",
    },
    commentData: {
      marginLeft: 20,
    },
  })
);

export default function Comments({ comments }) {
  const classes = useStyles();
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, displayName } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={10}>
                  <div className={classes.commentData}>
                    <Typography variant="h5" color="primary">
                      {displayName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt._seconds * 1000).format(
                        "h:mm a, MMMM DD YYYY"
                      )}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}
