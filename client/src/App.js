import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { customTheme } from "./styles";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
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
        posts: {
          merge(existing, incoming) {
            return incoming;
          },
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

await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

export const client = new ApolloClient({
  link: authLink.concat(
    createHttpLink({ uri: "http://localhost:4000/graphql" })
  ),
  cache: cache,
});

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={customTheme}>
            <Container maxWidth="lg">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </Container>
          </ThemeProvider>
        </ApolloProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
