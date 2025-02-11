"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export async function getBookmarkedProperties() {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be signed in");
  }

  return prisma.bookmark.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      createdAt: true,
      property: true,
    },
  });
}
