import jwt from "jsonwebtoken";

export const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, "secret") as {
      userId: number;
    };
    return userData;
  } catch (err) {
    return null;
  }
};
