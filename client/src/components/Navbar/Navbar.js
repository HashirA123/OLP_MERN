import React, { useContext, useEffect } from "react";
import { AppBar, Typography, Avatar, Toolbar, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/authContext.js";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(user);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "null"
    ) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        navigate("/");
      }
    }
  }, [location]);

  const onlogout = async () => {
    logout();

    navigate("/");
  };

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
      <Link to="/" className={styles.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img
          className={styles.image}
          src={memoriesLogo}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={styles.toolbar}>
        {user ? (
          <div className={styles.profile}>
            <Avatar className={styles.purple} alt={user.name} src={user.pfp}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={styles.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={styles.logout}
              color="secondary"
              onClick={onlogout}
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
