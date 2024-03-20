import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import styles from "./styles.module.css";
import { CREATE_POST, UPDATE_POST } from "../../mutations/postMutations";
import { GET_POSTS, GET_POST } from "../../queries/postQueries";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { currentId } from "../../App";

export default function Form() {
  const postId = useReactiveVar(currentId);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });

  const [createPost] = useMutation(CREATE_POST, {
    variables: postData,
    update(cache, { data: { createPost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS });
      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: posts.concat([createPost]) },
      });
    },
  });

  const [updatePost] = useMutation(UPDATE_POST, {
    variables: {
      updatePostId: postId,
      title: postData.title,
      message: postData.message,
      creator: postData.creator,
      tags: postData.tags,
      selectedFile: postData.selectedFile,
    },
    refetchQueries: [{ query: GET_POSTS }],
  });

  useEffect(() => {
    if (!loading && !error) setPostData(data.post);
  }, [postId, loading, error, data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      postData.title === "" ||
      postData.message === "" ||
      postData.creator === "" ||
      postData.tags === ""
    ) {
      return alert("Please fill in all fields");
    }

    if (postId) {
      updatePost(
        postId,
        postData.creator,
        postData.title,
        postData.message,
        postData.tags,
        postData.selectedFile
      );
    } else {
      createPost(
        postData.creator,
        postData.title,
        postData.message,
        postData.tags,
        postData.selectedFile
      );
    }

    clear();
  };
  const clear = () => {
    currentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper sx={{ padding: 1 }}>
      <form
        autoComplete="off"
        noValidate
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {postId ? "Editing" : "Creating"} a memory
        </Typography>
        <TextField
          sx={{ margin: 1 }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          // the reason for the ...PostData is so the other data presists in the object and is not overwritten.
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          sx={{ margin: 1 }}
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          // the reason for the ...PostData is so the other data presists in the object and is not overwritten.
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          sx={{ margin: 1 }}
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          // the reason for the ...PostData is so the other data presists in the object and is not overwritten.
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          sx={{ margin: 1 }}
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          // the reason for the ...PostData is so the other data presists in the object and is not overwritten.
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={styles.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase64>
        </div>
        <Button
          sx={{ marginBottom: 1 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
