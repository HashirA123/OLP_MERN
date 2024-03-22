import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { typeDefs } from "./schema/typeDefs.js";
import { resolvers } from "./schema/resolvers.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

connectDb();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors(),
  express.json({ limit: "30mb", extended: true }),
  express.urlencoded({ limit: "30mb", extended: true }),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: port }, resolve));

console.log(`🚀 Server ready at http://localhost:${port}/`);
