"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export async function checkIfBookmarked(propertyId: string): Promise<boolean> {
  const session = await auth();

  if (!session || !session.user?.id) {
    return false;
  }

  try {
    const existingBookmark = await prisma.bookmark.findFirst({ where: { userId: session.user.id, propertyId }, select: { id: true } });

    if (!existingBookmark) {
      return false;
    } else {
      return true;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
}
