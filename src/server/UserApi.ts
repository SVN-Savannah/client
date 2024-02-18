import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type UserUpdateData = {
  email: string;
  name: string;
};

async function updateUser({ email, name }: UserUpdateData): Promise<void> {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
    },
  });
}

export const UserApi = {
  updateUser,
};
