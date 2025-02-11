"use server";

import { prisma } from "@/db/prisma";
import type { User } from "@prisma/client";

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id } });
}
