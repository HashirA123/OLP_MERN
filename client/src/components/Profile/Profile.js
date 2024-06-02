import { CircularProgress, Paper, Typography } from "@mui/material";
import { AuthContext } from "../Auth/authContext.js";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../queries/authQueries.js";
import defualtUser from "../../images/user.jpg";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email: user.email },
  });

  if (error) return <p>something went wrong {error}</p>;
  if (loading) return <CircularProgress />;

  console.log(data.user);

  return (
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
        <Typography>Posts</Typography>
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
  );
}
