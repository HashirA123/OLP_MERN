import { useQuery } from "@apollo/client";
import { Waypoint } from "react-waypoint";
import React from "react";
import Post from "./Post/Post";
import { GET_POSTS, GET_POSTS_BY_SEARCH } from "../../queries/postQueries";
import { Grid, CircularProgress } from "@mui/material";
import styles from "./styles.module.css";

export default function Posts() {
  let LIMIT = 8;
  let offset = 0;

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { offset: offset, limit: LIMIT },
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
        {data.posts.map((post, i) => (
          <React.Fragment key={post.id}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} />
            </Grid>
            {i === data.posts.length - 1 && (
              <Waypoint
                onEnter={() =>
                  fetchMore({
                    variables: {
                      offset: data.posts.length,
                    },
                  })
                }
              />
            )}
          </React.Fragment>
        ))}
      </Grid>
    );
  }
}

export function PostsBySeach({ searchQuery, tagsQuery }) {
  let LIMIT = 8;
  let offset = 0;

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS_BY_SEARCH, {
    variables: {
      offset: offset,
      limit: LIMIT,
      search: searchQuery,
      tags: tagsQuery,
    },
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
        {data.getPostBySearch.map((post, i) => (
          <React.Fragment key={post.id}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Post post={post} />
            </Grid>
            {i === data.getPostBySearch.length - 1 && (
              <Waypoint
                onEnter={() =>
                  fetchMore({
                    variables: {
                      offset: data.getPostBySearch.length,
                    },
                  })
                }
              />
            )}
          </React.Fragment>
        ))}
      </Grid>
    );
  }
}
