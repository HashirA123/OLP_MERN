import gql from "graphql-tag";
import { projects, clients } from "./sampleData.js";

// Mongoose Models
import Project from "./models/Project.js";
import Client from "./models/Client.js";

export const typeDefs = gql`
  enum ProjectStatus {
    Not_Started
    In_Progress
    Completed
  }
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
    status: ProjectStatus
    client: Client
  }

  type Query {
    client(id: ID!): Client
    clients: [Client]
    project(id: ID!): Project
    projects: [Project]
  }

  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client
    deleteClient(id: ID!): Client
    addProject(
      name: String!
      description: String!
      status: ProjectStatus = Not_Started
      clientId: ID!
    ): Project
    deleteProject(id: ID!): Project
    updateProject(
      id: ID!
      name: String
      description: String
      status: ProjectStatus
    ): Project
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
  ProjectStatus: {
    Not_Started: "Not Started",
    In_Progress: "In Progress",
    Completed: "Completed",
  },
  Project: {
    async client(parent, _) {
      return await Client.findById(parent.clientId);
    },
  },
  Mutation: {
    async addClient(_, args) {
      const client = new Client({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });

      return await client.save();
    },
    async deleteClient(_, args) {
      return Client.findByIdAndDelete(args.id);
    },
    async addProject(_, args) {
      const project = new Project({
        name: args.name,
        description: args.description,
        clientId: args.clientId,
        status: args.status,
      });

      return project.save();
    },
    async deleteProject(_, args) {
      return Project.findByIdAndDelete(args.id);
    },
    async updateProject(_, args) {
      return Project.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status,
          },
        },
        { new: true }
      );
    },
  },
};
