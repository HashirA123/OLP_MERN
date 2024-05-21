import React from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { GET_POST, GET_POSTS_BY_SEARCH } from "../../queries/postQueries";
import { useQuery } from "@apollo/client";
import memories from "../../images/memories.png";

import styles from "./styles.module.css";

function RecommendedPosts({ postId, searchQuery, tagsQuery }) {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_POSTS_BY_SEARCH, {
    variables: {
      offset: 0,
      limit: 8,
      search: searchQuery,
      tags: tagsQuery,
    },
  });

  if (error) return <p>something went wrong</p>;
  if (loading) return <CircularProgress />;

  const recommendedPosts = data?.getPostBySearch.filter(
    ({ id }) => id !== postId
  );

  const openPost = (id) => {
    navigate(`/posts/${id}`);
  };

  if (recommendedPosts.length) {
    return (
      <div className={styles.section}>
        <Typography gutterBottom variant="h5">
          You might also enjoy
        </Typography>
        <Divider />
        <div className={styles.recommendedPosts}>
          {recommendedPosts.map(
            ({ title, message, name, tags, likes, selectedFile, id }) => (
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => openPost(id)}
                key={id}
              >
                <Typography gutterBottom variant="h6">
                  {title}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {name}
                </Typography>
                <Typography gutterBottom variant="subtitle2">
                  {message}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  Likes: {likes.length}
                </Typography>
                <img src={selectedFile || memories} width="200px" />
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default function PostDetails() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  if (error) return <p>something went wrong</p>;
  if (loading) return <CircularProgress />;

  const post = data?.post;

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={styles.card}>
        <div className={styles.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={styles.imageSection}>
          <img
            className={styles.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      <RecommendedPosts
        postId={post.id}
        searchQuery="none"
        tagsQuery={post?.tags.join(",")}
      />
    </Paper>
  );
}
