import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import styles from "./styles.module.css";
import { CREATE_POST } from "../../mutations/postMutations";
import { GET_POSTS } from "../../queries/postQueries";
import { useMutation } from "@apollo/client";

export default function Form() {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
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
    console.log(postData);

    createPost(
      postData.title,
      postData.message,
      postData.creator,
      postData.tags,
      postData.selectedFile
    );

    clear();
  };
  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={styles.paper}>
      <form
        autoComplete="off"
        noValidate
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6"> Creating a memory </Typography>
        <TextField
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
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          // the reason for the ...PostData is so the other data presists in the object and is not overwritten.
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
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
          className={styles.buttonSubmit}
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
