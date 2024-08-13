import { IUser } from "../../interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../utils";

export const Mutation = {
  createUser: async (parent: any, args: IUser, content: any) => {
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

  loginUser: async (parent: any, args: IUser, content: any) => {
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

  createPost: async (parent: any, args: any, { userInfo }: any) => {
    if (!userInfo) {
      throw new Error("Unauthorized");
    }

    const data = await prisma.posts.create({
      data: {
        authorId: userInfo.userId,
        title: args.title,
        content: args.content,
        published: false,
      },
    });
    console.log(data, userInfo);

    return data;
  },
};
