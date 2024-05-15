import React, { useEffect, useState, useContext } from "react";
import FileBase64 from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@mui/material";
import styles from "./styles.module.css";
import { CREATE_POST, UPDATE_POST } from "../../mutations/postMutations";
import {
  GET_POSTS,
  GET_POST,
  GET_POSTS_BY_SEARCH,
} from "../../queries/postQueries";
import { useMutation, useLazyQuery, useReactiveVar } from "@apollo/client";
import { currentId } from "../../App";
import { AuthContext } from "../Auth/authContext";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const postId = useReactiveVar(currentId);
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const { user } = useContext(AuthContext);

  const [getPost, { called, loading, error, data }] = useLazyQuery(GET_POST);

  const [createPost] = useMutation(CREATE_POST);

  const [updatePost] = useMutation(UPDATE_POST);

  const clear = () => {
    currentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  // This use effect will run the code inside, fill in the form, whenever the dependencies change,
  // specifically the postId, which is triggered when the user clicks the 3 dots on the post.
  // This is kept in track using the state managment system provided by Apollo Client.
  useEffect(() => {
    if (postId !== null) {
      getPost({
        variables: { postId: postId },
      });
      if (!loading && !error && called) {
        setPostData(data.post);
      }
    }
  }, [postId, loading, error, called, data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      postData.title === "" ||
      postData.message === "" ||
      postData.tags === ""
    ) {
      return alert("Please fill in all fields");
    }

    if (postId) {
      updatePost({
        variables: {
          updatePostId: postId,
          title: postData.title,
          message: postData.message,
          name: user?.name,
          tags: postData.tags,
          selectedFile: postData.selectedFile,
        },
        refetchQueries: [GET_POSTS_BY_SEARCH],
        update(cache, { data: { updatePost } }) {
          const { posts } = cache.readQuery({ query: GET_POSTS });
          cache.writeQuery({
            query: GET_POSTS,
            data: {
              posts: posts.map((post) =>
                post.id === updatePost.id ? updatePost : post
              ),
            },
          });
        },
      });
      navigate("/posts");
    } else {
      createPost({
        variables: {
          title: postData.title,
          message: postData.message,
          name: user?.name,
          tags: postData.tags,
          selectedFile: postData.selectedFile,
        },
        refetchQueries: [GET_POSTS_BY_SEARCH],
        update(cache, { data: { createPost } }) {
          const { posts } = cache.readQuery({ query: GET_POSTS });
          cache.writeQuery({
            query: GET_POSTS,
            data: { posts: [createPost, ...posts.slice(0, -1)] },
          });
        },
      });
      navigate("/posts");
    }

    clear();
  };

  if (!user?.name) {
    return (
      <Paper sx={{ padding: 1 }}>
        <Typography variant="h6" align="center">
          Please sign in to create a Post!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ position: "sticky", top: "auto", padding: 2 }}>
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
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
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
