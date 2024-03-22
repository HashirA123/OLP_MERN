// Mongoose Models
import PostMessage from "../models/PostMessage.js";

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
      return await PostMessage.findById(args.id);
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
    async updatePost(_, args) {
      return await PostMessage.findByIdAndUpdate(
        args.id,
        {
          $set: {
            title: args.title,
            message: args.message,
            creator: args.creator,
            tags: args.tags,
            selectedFile: args.selectedFile,
          },
        },
        { new: true }
      );
    },
    async deletePost(_, args) {
      return await PostMessage.findByIdAndDelete(args.id);
    },
    async likePost(_, args) {
      const post = await PostMessage.findById(args.id);
      return await PostMessage.findByIdAndUpdate(
        args.id,
        {
          $set: {
            likeCount: post.likeCount + 1,
          },
        },
        { new: true }
      );
    },
  },
};

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
