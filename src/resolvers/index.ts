import { PrismaClient } from "@prisma/client";

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
    createUser: async (parent: any, args: any, context: any) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
