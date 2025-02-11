"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function toggleBookmark(propertyId: string): Promise<{ message: string }> {
  const session = await auth();

  // Check if session and user Id exists
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized, you must be signed in");
  }

  // Check if bookmark already exists
  const existingBookmark = await prisma.bookmark.findFirst({ where: { userId: session.user.id, propertyId }, select: { id: true } });

  let message: string;
  try {
    if (existingBookmark) {
      await prisma.bookmark.delete({ where: { id: existingBookmark.id } });

      message = "Bookmark deleted succesfully";
    } else {
      await prisma.bookmark.create({ data: { userId: session.user.id, propertyId } });

      message = "Property bookmarked successfully";
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }

  revalidatePath(`/properties/${propertyId}`);

  return { message };
}
