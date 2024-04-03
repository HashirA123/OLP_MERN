import React from "react";
// import { useReactiveVar } from "@apollo/client";
import { currentId } from "../../../App";
import styles from "./styles.module.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { FaThumbsUp } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import memories from "../../../images/memories.png";
import { DELETE_POST, LIKE_POST } from "../../../mutations/postMutations";
import { GET_POSTS } from "../../../queries/postQueries";
import { useMutation } from "@apollo/client";

export default function Post({ post }) {
  var image = memories;
  //const postId = useReactiveVar(currentId);

  const [deletePost] = useMutation(DELETE_POST);
  const [likePost] = useMutation(LIKE_POST);

  const handleDelete = (id) => {
    deletePost({
      variables: {
        deletePostId: id,
      },
      update(cache, { data: { deletePost } }) {
        const { posts } = cache.readQuery({ query: GET_POSTS });
        cache.writeQuery({
          query: GET_POSTS,
          data: { posts: posts.filter((post) => post.id !== deletePost.id) },
        });
      },
    });
  };
  const handleLike = (id) => {
    likePost({
      variables: {
        likePostId: id,
      },
      update(cache, { data: { likePost } }) {
        const { posts } = cache.readQuery({ query: GET_POSTS });
        cache.writeQuery({
          query: GET_POSTS,
          data: {
            posts: posts.map((post) =>
              post.id === likePost.id ? likePost : post
            ),
          },
        });
      },
    });
  };

  if (post.selectedFile !== "") {
    image = post.selectedFile;
  }
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "darken",
        }}
        image={image}
        title={post.title}
      ></CardMedia>
      <div className={styles.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={styles.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            currentId(post.id);
          }}
        >
          <IoEllipsisHorizontal fontSize="default" />
        </Button>
      </div>
      <div className={styles.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography sx={{ padding: "0 16px" }} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "0 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => handleLike(post.id)}
        >
          <FaThumbsUp fontSize="small" />
          {/* &nbsp; is a space */}
          Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => handleDelete(post.id)}
        >
          <MdDelete fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
