import { PrismaClient } from "@prisma/client";
import { IUser } from "../interface";

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
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
