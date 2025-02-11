"use server";

import { prisma } from "@/db/prisma";
import { auth } from "@/auth";
import { z } from "zod";

const addMessageSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  message: z.string(),
});

interface AddMessageFormState {
  errors: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function addMessage(
  { propertyId, propertyOwner }: { propertyId: string; propertyOwner: string },
  formState: AddMessageFormState,
  formData: FormData
): Promise<AddMessageFormState> {
  const session = await auth();

  if (!session || !session.user?.id) {
    return {
      errors: {
        _form: ["You must be signed in"],
      },
    };
  }

  if (session.user.id === propertyOwner) {
    return {
      errors: {
        _form: ["You can't send a message to yourself"],
      },
    };
  }

  const result = addMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await prisma.message.create({
      data: {
        ...result.data,
        userId: session.user.id,
        propertyId: propertyId,
        recipientId: propertyOwner,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  return { errors: {}, success: true };
}
