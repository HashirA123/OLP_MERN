import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";
// Mongoose Models
import PostMessage from "../models/PostMessage.js";
import User from "../models/User.js";

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
    async user(_, args) {
      return await User.findOne({ email: args.email });
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
    async likePost(_, args, contextValue) {
      if (!contextValue.userId) {
        return {
          message: "Unauthenticated",
        };
      }
      const post = await PostMessage.findById(args.id);

      const index = post.likes.findIndex(
        (id) => id === String(contextValue.userId)
      );

      if (index === -1) {
        post.likes.push(contextValue.userId);
      } else {
        post.likes = post.likes.filter(
          (id) => id !== String(contextValue.userId)
        );
      }
      return await PostMessage.findByIdAndUpdate(args.id, post, { new: true });
    },
    async signUpGoogle(_, args) {
      const userExist = await User.findOne({
        email: args.email.toLowerCase(),
      });

      if (!userExist) {
        const newUser = await User.create({
          name: args.name,
          email: args.email.toLowerCase(),
          pfp: args.pfp,
        });

        const token = jwt.sign(
          {
            email: newUser.email,
            id: newUser._id,
            name: newUser.name,
            pfp: newUser.pfp,
          },
          "test",
          {
            expiresIn: "1h",
          }
        );
        return { user: newUser, token: token };
      } else if (userExist.hasOwnProperty("password")) {
        throw new GraphQLError(
          "User already exists, Please use your Login Credentials",
          {
            extensions: { code: "USER_ALREADY_EXISTS" },
          }
        );
      } else {
        const token = jwt.sign(
          {
            email: userExist.email,
            id: userExist._id,
            name: userExist.name,
            pfp: userExist.pfp,
          },
          "test",
          {
            expiresIn: "1h",
          }
        );

        return { user: userExist, token: token };
      }
    },
    async signUp(_, args) {
      const userExist = await User.findOne({
        email: args.email.toLowerCase(),
      });

      if (userExist) {
        throw new GraphQLError("User already exists", {
          extensions: { code: "USER_ALREADY_EXISTS" },
        });
      }

      if (args.password !== args.confirmPassword) {
        throw new GraphQLError("Passwords do not match", {
          extensions: { code: "PASSWORDS_DO_NOT_MATCH" },
        });
      }

      const hashPassword = await bcrypt.hash(args.password, 12);

      const result = await User.create({
        name: `${args.firstName} ${args.lastName}`,
        email: args.email.toLowerCase(),
        password: hashPassword,
      });

      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
          name: result.name,
          pfp: result.pfp,
        },
        "test",
        {
          expiresIn: "1h",
        }
      );

      return { user: result, token: token };
    },
    async signIn(_, args) {
      const userExist = await User.findOne({
        email: args.email.toLowerCase(),
      });

      if (!userExist) {
        throw new GraphQLError("User does not exist", {
          extensions: { code: "USER_DOES_NOT_EXIST" },
        });
      }

      const isPasswordCorrect = await bcrypt.compare(
        args.password,
        userExist.password
      );

      if (!isPasswordCorrect) {
        throw new GraphQLError("Invalid Credentials", {
          extensions: { code: "INVALID_CREDENTIALS" },
        });
      }

      const token = jwt.sign(
        {
          email: userExist.email,
          id: userExist._id,
          name: userExist.name,
          pfp: userExist.pfp,
        },
        "test",
        { expiresIn: "1h" }
      );

      return { user: userExist, token: token };
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
