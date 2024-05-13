import { useLazyQuery, useQuery } from "@apollo/client";
import Post from "./Post/Post";
import { GET_POSTS, GET_POSTS_BY_SEARCH } from "../../queries/postQueries";
import { Grid, CircularProgress } from "@mui/material";
import styles from "./styles.module.css";

export default function Posts({ page }) {
  const { loading, error, data } = useQuery(GET_POSTS, {
    // variables: { page: page },
  });

  if (error) return <p>something went wrong</p>;
  if (loading) return <CircularProgress />;

  if (!error && !loading) {
    return (
      <Grid
        className={styles.mainContainer}
        container
        alignItems="stretch"
        spacing={3}
      >
        {data.posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export function PostsBySeach({ searchQuery, tagsQuery }) {
  const { loading, error, data } = useQuery(GET_POSTS_BY_SEARCH, {
    variables: { search: searchQuery, tags: tagsQuery },
  });

  if (error) return <p>something went wrong</p>;
  if (loading) return <CircularProgress />;

  if (!error && !loading) {
    return (
      <Grid
        className={styles.mainContainer}
        container
        alignItems="stretch"
        spacing={3}
      >
        {data.getPostBySearch.map((post) => (
          <Grid key={post.id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
    );
  }
}
