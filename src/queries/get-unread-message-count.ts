"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export async function getUnreadMessagesCount() {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be signed in");
  }

  return prisma.message.count({ where: { recipientId: session.user.id, read: false } });
}
