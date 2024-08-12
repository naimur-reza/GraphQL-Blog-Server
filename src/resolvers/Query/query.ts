export const Query = {
  users: async (content: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (content: any, args: any, { prisma }: any) => {
    return await prisma.posts.findMany();
  },
};
