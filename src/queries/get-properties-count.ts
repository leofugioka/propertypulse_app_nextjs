"use server";

import { prisma } from "@/db/prisma";

export async function getPropertiesCount() {
  return prisma.property.count();
}
