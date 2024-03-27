import React from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { Grow, Grid, Container } from "@mui/material";

export default function Home() {
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
