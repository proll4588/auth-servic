import { prisma } from '../prisma';

export const getUserById = async (userId: number) => {
  try {
    const user = await prisma.user_data.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (e) {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user_data.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (e) {
    return null;
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    const newUser = await prisma.user_data.create({
      data: {
        email,
        password,
      },
    });

    return newUser;
  } catch (e) {
    return null;
  }
};
