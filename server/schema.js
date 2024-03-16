import gql from "graphql-tag";

// Mongoose Models
// import Project from "./models/Project.js";
// import Client from "./models/Client.js";
import PostMessage from "./models/PostMessage.js";

export const typeDefs = gql`
  scalar Date

  type Post {
    id: ID
    title: String
    message: String
    creator: String
    tags: [String]
    selectedFile: String
    likeCount: Int
    createdAt: Date
  }

  type Query {
    post(title: String!): Post
    posts: [Post]
  }

  type Mutation {
    createPost(
      title: String!
      message: String!
      creator: String!
      tags: [String!]
      selectedFile: String
    ): Post
    # deletePost(id: ID!): Post
  }
`;

export const resolvers = {
  Date: {
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
      }
      throw Error("GraphQL Date Scalar serializer expected a `Date` object");
    },
    parseValue(value) {
      if (typeof value === "number") {
        return new Date(value); // Convert incoming integer to Date
      }
      throw new Error("GraphQL Date Scalar parser expected a `number`");
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        // Convert hard-coded AST string to integer and then to Date
        return new Date(parseInt(ast.value, 10));
      }
      // Invalid hard-coded value (not an integer)
      return null;
    },
  },
  Query: {
    async post(_, args) {
      //return clients.find((client) => client.id === args.id);
      return await PostMessage.findById(args.title);
    },
    async posts() {
      //return clients;
      return await PostMessage.find();
    },
  },
  Mutation: {
    async createPost(_, args) {
      const post = new PostMessage({
        title: args.title,
        message: args.message,
        creator: args.creator,
        tags: args.tags,
        selectedFile: args.selectedFile,
      });

      return await post.save();
    },
    // async deleteClient(_, args) {
    //   return Client.findByIdAndDelete(args.id);
    // },
  },
};

// export const typeDefs = gql`
//   enum ProjectStatus {
//     Not_Started
//     In_Progress
//     Completed
//   }
//   type Client {
//     id: ID
//     name: String
//     email: String
//     phone: String
//   }

//   type Project {
//     id: ID
//     name: String
//     description: String
//     status: ProjectStatus
//     client: Client
//   }

//   type Query {
//     client(id: ID!): Client
//     clients: [Client]
//     project(id: ID!): Project
//     projects: [Project]
//   }

//   type Mutation {
//     addClient(name: String!, email: String!, phone: String!): Client
//     deleteClient(id: ID!): Client
//     addProject(
//       name: String!
//       description: String!
//       status: ProjectStatus = Not_Started
//       clientId: ID!
//     ): Project
//     deleteProject(id: ID!): Project
//     updateProject(
//       id: ID!
//       name: String
//       description: String
//       status: ProjectStatus
//     ): Project
//   }
// `;

// export const resolvers = {
//   Query: {
//     async client(_, args) {
//       //return clients.find((client) => client.id === args.id);
//       return await Client.findById(args.id);
//     },
//     async clients() {
//       //return clients;
//       return await Client.find();
//     },
//     async project(_, args) {
//       // return projects.find((project) => project.id === args.id);
//       return await Project.findById(args.id);
//     },
//     async projects() {
//       //return projects;
//       return await Project.find();
//     },
//   },
//   ProjectStatus: {
//     Not_Started: "Not Started",
//     In_Progress: "In Progress",
//     Completed: "Completed",
//   },
//   Project: {
//     async client(parent, _) {
//       return await Client.findById(parent.clientId);
//     },
//   },
//   Mutation: {
//     async addClient(_, args) {
//       const client = new Client({
//         name: args.name,
//         email: args.email,
//         phone: args.phone,
//       });

//       return await client.save();
//     },
//     async deleteClient(_, args) {
//       return Client.findByIdAndDelete(args.id);
//     },
//     async addProject(_, args) {
//       const project = new Project({
//         name: args.name,
//         description: args.description,
//         clientId: args.clientId,
//         status: args.status,
//       });

//       return project.save();
//     },
//     async deleteProject(_, args) {
//       return Project.findByIdAndDelete(args.id);
//     },
//     async updateProject(_, args) {
//       return Project.findByIdAndUpdate(
//         args.id,
//         {
//           $set: {
//             name: args.name,
//             description: args.description,
//             status: args.status,
//           },
//         },
//         { new: true }
//       );
//     },
//   },
// };
