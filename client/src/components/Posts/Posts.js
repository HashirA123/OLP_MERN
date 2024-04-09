import { useQuery, useLazyQuery } from "@apollo/client";
import Post from "./Post/Post";
import { GET_POSTS, GET_POSTS_BY_SEARCH } from "../../queries/postQueries";
import { Grid, CircularProgress } from "@mui/material";
import styles from "./styles.module.css";

export default function Posts({ searchQuery, tagsQuery }) {
  const { loading, error, data } = useQuery(GET_POSTS_BY_SEARCH, {
    variables: { search: searchQuery, tags: tagsQuery },
  });

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
        {data.getPostBySearch.map((post) => (
          <Grid key={post.id} item xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
