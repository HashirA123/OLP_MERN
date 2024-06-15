import { Routes, Route, Navigate } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { customTheme } from "./styles";
// import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

import Profile from "./components/Profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./components/Auth/authContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate replace to="/posts" />}
          />
          <Route
            path="/profile"
            element={!user ? <Navigate replace to="/auth" /> : <Profile />}
          />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
