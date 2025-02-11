"use server";

import { prisma } from "@/db/prisma";
import type { Property } from "@prisma/client";

export async function getPropertyById(id: string): Promise<Property | null> {
  return prisma.property.findUnique({ where: { id } });
}

export async function getFeaturedProperties(): Promise<Property[] | null> {
  return prisma.property.findMany({ where: { is_featured: true } });
}

export async function getAllProperties(skip?: number, take?: number) {
  skip = skip ?? 0;
  take = take ?? 3;
  return prisma.property.findMany({ skip, take });
}

export async function getPropertiesByUserId(owner: string) {
  return prisma.property.findMany({ where: { owner } });
}

export async function getPropertiesBySearchForm(location: string, propertyType: string) {
  const locationPattern = location.trim();

  if (propertyType !== "All") {
    return prisma.property.findMany({
      where: {
        OR: [
          {
            name: {
              contains: locationPattern,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: locationPattern,
              mode: "insensitive",
            },
          },
          {
            full_address: {
              contains: locationPattern,
              mode: "insensitive",
            },
          },
        ],
        type: propertyType,
      },
    });
  }

  return prisma.property.findMany({
    where: {
      OR: [
        {
          name: {
            contains: locationPattern,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: locationPattern,
            mode: "insensitive",
          },
        },
        {
          full_address: {
            contains: locationPattern,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}
