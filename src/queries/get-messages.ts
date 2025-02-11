"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import type { MessageWithPropertyName } from "@/models/MessageWithPropertyName";

export async function getMessages() {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be signed in");
  }

  let messages: MessageWithPropertyName[];
  try {
    messages = await prisma.message.findMany({
      where: {
        property: {
          is: {
            owner: session.user.id,
          },
        },
      },
      include: {
        property: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { updatedAt: "asc" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }

  return messages;
}
