import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { customTheme } from "./styles";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

export const currentId = makeVar(null);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
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
  uri: "http://localhost:4000/graphql",
  cache: cache,
});

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
