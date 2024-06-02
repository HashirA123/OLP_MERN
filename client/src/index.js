import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import App from "./App";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./components/Auth/authContext";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPostBySearch: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: ["search", "tags"],

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing, incoming, { args: { offset = 0 } }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
        posts: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing, incoming, { args: { offset = 0 } }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
          // merge(existing, incoming) {
          //   return incoming;
          // },
        },
        post: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        user: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        signIn: {
          keyArgs: ["email"],
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// await persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });

export const client = new ApolloClient({
  link: authLink.concat(
    createHttpLink({ uri: "http://localhost:4000/graphql" })
  ),
  cache: cache,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="564046926518-4krohotbas5r7ch4bsl9bp7ekhc3nh62.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
