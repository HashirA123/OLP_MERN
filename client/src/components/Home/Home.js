import React, { useState } from "react";
import Posts, { PostsBySeach } from "../Posts/Posts";
import Form from "../Form/Form";
import {
  Grow,
  Grid,
  Container,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("searchQuery");
  const tagsQuery = query.get("tags");
  //const page = query.get("page") || "1";
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // if user hits the enter key, search for post(s)
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = async () => {
    if (search.trim() || tags.length > 0) {
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags}`);
    } else {
      navigate("/");
    }
  };

  const handleTags = (newTags) => {
    setTags(newTags);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            {searchQuery || tagsQuery ? (
              <PostsBySeach
                searchQuery={searchQuery}
                tagsQuery={tagsQuery}
                // page={page}
              />
            ) : (
              <Posts />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              sx={{
                borderRadius: 4,
                marginBottom: "1rem",
                display: "flex",
                padding: "16px",
              }}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MuiChipsInput
                style={{ margin: "10px 0" }}
                value={tags}
                onChange={handleTags}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
