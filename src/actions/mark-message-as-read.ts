"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Message } from "@prisma/client";

export async function toggleMessageReadStatus(messageId: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be signed in");
  }

  const message = await prisma.message.findUnique({ where: { id: messageId } });

  if (!message) {
    throw new Error("Message not found");
  }

  if (message.recipientId !== session.user.id) {
    throw new Error("Unauthorized access, you are not the recipient");
  }

  let updatedMessage: Message;
  try {
    updatedMessage = await prisma.message.update({ where: { id: messageId }, data: { read: !message.read } });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }

  revalidatePath("/messages");
  return { status: updatedMessage.read };
}
