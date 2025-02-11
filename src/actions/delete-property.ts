"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import * as queries from "@/queries";
import * as actions from "@/actions";

export async function deletePropertyById(id: string) {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("You must be signed in");
  }

  const property = await queries.getPropertyById(id);

  if (!property) {
    return Response.redirect("/error");
  }

  if (property.owner !== session.user.id) {
    throw new Error("You are not the owner!");
  }

  await actions.deleteImagesOnPropertyDelete(property.images);

  await prisma.property.delete({ where: { id, owner: session.user.id } });

  revalidatePath("/");
  revalidatePath("/properties");
  revalidatePath("/profile");
}
