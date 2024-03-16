import { useQuery } from "@apollo/client";
import Post from "./Post/Post";
import { GET_POSTS } from "../../queries/postQueries";
import { Grid, CircularProgress } from "@mui/material";
import styles from "./styles.module.css";

export default function Posts() {
  //const classes = useStyles();
  const { loading, error, data } = useQuery(GET_POSTS);

  if (error) return <p>something went wrong</p>;
  if (loading) return <CircularProgress />;

  //console.log(data.posts);
  //   console.log(data);
  if (!error && !loading) {
    return (
      <Grid
        className={styles.mainContainer}
        container
        alignItems="stretch"
        spacing={3}
      >
        {data.posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
