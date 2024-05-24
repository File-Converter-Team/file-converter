import prisma from "@/lib/prisma";

export const getIdByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  return user?.id;
}
