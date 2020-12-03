import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

// MUI
import { Container, Grid } from "@material-ui/core";

// Redux
import { getPosts, setLocation } from "features/data/postSlice";

import { Post } from "component/post";
import { Profile } from "component/profile/Profile";
import { RootState } from "app/store";

export default function Home() {
  const [load, setLoad] = useState(true),
    dispatch = useDispatch(),
    posts = useSelector((state: RootState) => state.post.posts),
    loading = useSelector((state: RootState) => state.post.loading);
  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoad(true);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position);
          dispatch(
            getPosts({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            })
          );
          dispatch(
            setLocation({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            })
          );
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
          setLoad(false);
        }
      );
    } else {
      setLoad(false);
    }
  }, []);

  let recentPostsMarkup = !loading ? (
    posts.map((post: any) => <Post key={post.postId} {...post} />)
  ) : (
    // <div>Hi</div>
    <p>Loading...</p>
  );
  if (!load) {
    alert("Please give location access");
    recentPostsMarkup = "Enable location by reloading";
  }
  return (
    <div className="container">
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
}
