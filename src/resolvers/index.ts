import { PrismaClient } from "@prisma/client";
import { IUser } from "../interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    posts: async () => {
      return await prisma.posts.findMany();
    },
  },
  Mutation: {
    createUser: async (parent: any, args: IUser, context: any) => {
      const hashPassword = bcrypt.hashSync(args.password, 10);

      const data = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashPassword,
        },
      });

      const token = jwt.sign({ userId: data.id }, "secret", {
        expiresIn: "1h",
      });

      return {
        data,
        token,
      };
    },

    loginUser: async (parent: any, args: IUser, context: any) => {
      const user = await prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const valid = bcrypt.compareSync(args.password, user.password);

      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, "secret", {
        expiresIn: "1h",
      });

      return {
        data: user,
        token,
      };
    },
  },
};
