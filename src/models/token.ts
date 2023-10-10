import { prisma } from '../prisma';

export const deleteToken = async (token: string) => {
  try {
    const deletedToken = await prisma.users_tokens.deleteMany({
      where: {
        token: token,
      },
    });

    return deletedToken;
  } catch (e) {
    return null;
  }
};

export const addTokenToUser = async (userId: number, token: string) => {
  try {
    const newToken = await prisma.users_tokens.create({
      data: {
        token,
        user_id: userId,
      },
    });

    return newToken;
  } catch (e) {
    return null;
  }
};

export const getToken = async (refreshToken: string) => {
  try {
    const token = await prisma.users_tokens.findFirst({
      where: {
        token: refreshToken,
      },
    });

    return token;
  } catch (e) {
    return null;
  }
};
