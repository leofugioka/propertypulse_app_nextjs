"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function deleteMessageById(messageId: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be signed in");
  }

  const existingMessage = await prisma.message.findUnique({ where: { id: messageId } });

  if (!existingMessage) {
    throw new Error("Message not found");
  }

  if (existingMessage.recipientId !== session.user.id) {
    throw new Error("Unauthorized access, you are not the recipient");
  }

  try {
    const response = await prisma.message.delete({ where: { id: messageId } });
    console.log(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }

  revalidatePath("/messages");
  return { status: true };
}
