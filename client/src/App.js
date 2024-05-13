import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { customTheme } from "./styles";
// import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { AuthProvider } from "./components/Auth/authContext";

export const currentId = makeVar(null);

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

function App() {
  const userToken = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider client={client}>
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
                  element={
                    !userToken ? <Auth /> : <Navigate replace to="/posts" />
                  }
                />
              </Routes>
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
