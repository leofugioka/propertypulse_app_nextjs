"use server";

import { prisma } from "@/db/prisma";
import type { Account } from "@prisma/client";

export async function getAccountByUserID(userId: string): Promise<Account | null> {
  return await prisma.account.findFirst({ where: { userId } });
}
