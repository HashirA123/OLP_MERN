import React, { useState, useContext } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { AuthContext } from "../Auth/authContext.js";
import { COMMENT_POST } from "../../mutations/postMutations.js";

import styles from "./styles.module.css";
import { useMutation } from "@apollo/client";

export default function CommentSection({ post }) {
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const [commentPost] = useMutation(COMMENT_POST);
  const { user } = useContext(AuthContext);

  const handleClick = async () => {
    const finalComment = `${user.name}: ${comment}`;
    const userData = await commentPost({
      variables: {
        value: finalComment,
        commentPostId: post.id,
      },
    });

    setComments(userData?.data.commentPost.comments);
    setComment("");
  };

  return (
    <div className={styles.commentsOuterContainer}>
      <div className={styles.commentsInnerContainer}>
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.toReversed().map((c, i) => (
          <Typography key={i} gutterBottom variant="subtitle1">
            <strong>{c.split(":")[0]}</strong> :{c.split(":")[1]}
          </Typography>
        ))}
      </div>
      {user ? (
        <div style={{ width: "50%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            disabled={!comment}
            variant="contained"
            onClick={handleClick}
            color="primary"
          >
            Comment
          </Button>
        </div>
      ) : (
        <div
          style={{ width: "50%", display: "grid", justifyContent: "center" }}
        >
          <Typography gutterBottom variant="h6">
            Login to Write a Comment
          </Typography>
        </div>
      )}
    </div>
  );
}
