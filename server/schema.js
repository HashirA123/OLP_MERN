import gql from "graphql-tag";
import { projects, clients } from "./sampleData.js";

// Mongoose Models
import Project from "./models/Project.js";
import Client from "./models/Client.js";

export const typeDefs = gql`
  type Client {
    id: ID
    name: String
    email: String
    phone: String
  }

  type Project {
    id: ID
    name: String
    description: String
    status: String
    client: Client
  }

  type Query {
    client(id: ID!): Client
    clients: [Client]
    project(id: ID!): Project
    projects: [Project]
  }
`;

export const resolvers = {
  Query: {
    async client(_, args) {
      //return clients.find((client) => client.id === args.id);
      return await Client.findById(args.id);
    },
    async clients() {
      //return clients;
      return await Client.find();
    },
    async project(_, args) {
      // return projects.find((project) => project.id === args.id);
      return await Project.findById(args.id);
    },
    async projects() {
      //return projects;
      return await Project.find();
    },
  },
  Project: {
    async client(parent, _) {
      return await Client.findById(parent.clientId);
    },
  },
};
