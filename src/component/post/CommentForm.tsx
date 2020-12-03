import React, { ChangeEvent, useState } from "react";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "features/data/postSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    //@ts-ignore
    ...theme.userForm,
  })
);

export default function CommentForm({ postId }) {
  const [body, setBody] = useState(""),
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setBody(event.target.value);
    },
    classes = useStyles(),
    dispatch = useDispatch(),
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(submitComment(postId, { body }));
    };

  return (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={body === ""}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  );
}
