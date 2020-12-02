import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import { Post } from "component/post";
import { Profile } from "component/profile/Profile";
export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/post")
      .then(res => {
        setPosts(res.data.posts);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  let recentPostsMarkup = posts ? (
    posts.map((post: any) => <Post key={post.postId} {...post} />)
  ) : (
    // <div>Hi</div>
    <p>Loading...</p>
  );
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </Container>
  );
}
