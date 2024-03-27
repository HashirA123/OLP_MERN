import React, { useState } from "react";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import memories from "../../images/memories.png";
import { client } from "../../App.js";
import { PROFILE } from "../../queries/authQueries.js";

export default function Navbar() {
  const [user, setUser] = useState(client.readQuery({ query: PROFILE }));

  console.log(user);
  return (
    <AppBar
      sx={{
        borderRadius: "15px",
        margin: "30px 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
      position="static"
      color="inherit"
    >
      <div className={styles.brandContainer}>
        <Typography
          sx={{ color: "rgba(0,183,255, 1)", textDecoration: "none" }}
          component={Link}
          to="/"
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={styles.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar
              className={styles.purple}
              alt={user.profile.name}
              src={user.profile.pfp}
            >
              {user.profile.name.charAt(0)}
            </Avatar>
            <Typography className={styles.userName} variant="h6">
              {user.profile.name}
            </Typography>
            <Button
              variant="contained"
              className={styles.logout}
              color="secondary"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
