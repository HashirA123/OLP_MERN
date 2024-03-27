import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="564046926518-4krohotbas5r7ch4bsl9bp7ekhc3nh62.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
