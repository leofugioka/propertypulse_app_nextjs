"use server";

import { prisma } from "@/db/prisma";
import type { Property } from "@prisma/client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as actions from "@/actions";

const addPropertyFormSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  location: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
  beds: z.number().int(),
  baths: z.number().int(),
  square_feet: z.number().int(),
  amenities: z.string().array(),
  rates: z.object({
    nightly: z.nullable(z.number()),
    weekly: z.nullable(z.number()),
    monthly: z.nullable(z.number()),
  }),
  seller_info: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.coerce.string().email(),
  }),
  images: z.string().array(),
});

interface AddPropertyFormState {
  errors: {
    type?: string[];
    name?: string[];
    description?: string[];
    location?: string[];
    beds?: string[];
    baths?: string[];
    square_feet?: string[];
    amenities?: string[];
    rates?: string[];
    seller_info?: string[];
    images?: string[];
    _form?: string[];
  };
}

export async function addProperty(formState: AddPropertyFormState, formData: FormData): Promise<AddPropertyFormState> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in"],
      },
    };
  }

  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => image instanceof File)
    .filter((image) => image.name !== "");

  const imagesUrls = await actions.uploadImagesToCloudinary(images);

  const street = formData.get("location.street");
  const city = formData.get("location.city");
  const state = formData.get("location.state");
  const zipcode = formData.get("location.zipcode");
  const full_address = street + " " + city + " " + state + " " + zipcode;

  const result = addPropertyFormSchema.safeParse({
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: street,
      city: city,
      state: state,
      zipcode: zipcode,
    },
    beds: Number(formData.get("beds")),
    baths: Number(formData.get("baths")),
    square_feet: Number(formData.get("square_feet")),
    amenities: amenities,
    rates: {
      nightly: Number(formData.get("rates.nightly")),
      weekly: Number(formData.get("rates.weekly")),
      monthly: Number(formData.get("rates.monthly")),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images: imagesUrls,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let newProperty: Property;
  try {
    newProperty = await prisma.property.create({
      data: {
        ...result.data,
        owner: session.user.id,
        full_address: full_address,
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

  revalidatePath("/");
  revalidatePath("/properties");
  redirect(`/properties/${newProperty.id}`);
}
