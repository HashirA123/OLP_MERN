import React, { useState, useContext } from "react";
import FileBase64 from "react-file-base64";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Modal,
  Container,
} from "@mui/material";
import styles from "./styles.module.css";
import { CREATE_POST, UPDATE_POST } from "../../mutations/postMutations";
import { GET_POSTS, GET_POSTS_BY_SEARCH } from "../../queries/postQueries";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../Auth/authContext";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clear();
  };
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const { user } = useContext(AuthContext);

  const [createPost] = useMutation(CREATE_POST);

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      postData.title === "" ||
      postData.message === "" ||
      postData.tags === ""
    ) {
      return alert("Please fill in all fields");
    }

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
    handleClose();
    navigate("/posts");

    clear();
  };

  return (
    <>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        Post
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Container>
          <Paper sx={{ position: "sticky", top: "auto", padding: 2 }}>
            <form
              autoComplete="off"
              noValidate
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <Typography variant="h6">Create your Post</Typography>
              <TextField
                sx={{ margin: 1 }}
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.title}
                // the reason for the ...PostData is so the other data presists in the object and is not overwritten.
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
              <TextField
                sx={{ margin: 1 }}
                name="message"
                variant="outlined"
                multiline
                rows={4}
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
                label="Tags (Seperate by Comma)"
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
        </Container>
      </Modal>
    </>
  );
}

export function FormEdit({ post }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: post.title,
    message: post.message,
    tags: post.tags,
    selectedFile: post.selectedFile,
  });

  const { user } = useContext(AuthContext);

  const [updatePost] = useMutation(UPDATE_POST);

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      postData.title === "" ||
      postData.message === "" ||
      postData.tags === ""
    ) {
      return alert("Please fill in all fields");
    }

    updatePost({
      variables: {
        updatePostId: post.id,
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
    handleClose();
    navigate(`/posts/${post.id}`);
    // clear();
  };
  return (
    <>
      <Button variant="contained" size="small" onClick={handleOpen}>
        Edit Post
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Container>
          <Paper sx={{ position: "sticky", top: "auto", padding: 2 }}>
            <form
              autoComplete="off"
              noValidate
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <Typography variant="h6">Edit your Post</Typography>
              <TextField
                sx={{ margin: 1 }}
                name="title"
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.title}
                // the reason for the ...PostData is so the other data presists in the object and is not overwritten.
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />
              <TextField
                sx={{ margin: 1 }}
                name="message"
                variant="outlined"
                multiline
                rows={4}
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
                label="Tags (Seperate by Comma)"
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
        </Container>
      </Modal>
    </>
  );
}
