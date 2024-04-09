import React, { useState } from "react";
import Posts from "../Posts/Posts";
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim()) {
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
            <Posts />
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
