import {
  CircularProgress,
  Paper,
  Typography,
  Container,
  Grid,
  Grow,
} from "@mui/material";
import { AuthContext } from "../Auth/authContext.js";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../queries/authQueries.js";
import defualtUser from "../../images/user.jpg";
import { PostsBySeach } from "../Posts/Posts.js";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email: user.email },
  });

  if (error) return <p>something went wrong {error}</p>;
  if (loading) return <CircularProgress />;

  console.log(data.user);

  return (
    <>
      <Paper
        sx={{
          height: "30vh",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ marginTop: "20px" }} variant="h3" gutterBottom>
            {data.user.name}
          </Typography>
          {/* Need to add a field in the user model that tracks the number of posts they have made*/}
          <Typography>Posts: </Typography>
          <Typography>
            Caption: {data.user.caption || "add a caption"}
          </Typography>
          {data.user.interests &&
            data.user.interests.map((interest, index) => {
              return <Typography key={index}>{interest}</Typography>;
            })}
        </div>

        <img
          style={{
            position: "relative",
            borderRadius: "100px",
            marginTop: "20px",
          }}
          height="80%"
          className={styles.purple}
          alt={data.user.name}
          src={data.user.pfp || defualtUser}
        />
      </Paper>
      <Grow in sx={{ marginTop: "20px" }}>
        <Container maxWidth="xl">
          <Grid item xs={12} sm={6} md={9}>
            <PostsBySeach userId={data.user.id} />
          </Grid>
        </Container>
      </Grow>
    </>
  );
}
