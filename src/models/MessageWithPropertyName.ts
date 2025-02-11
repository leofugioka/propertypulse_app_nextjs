import type { Message } from "@prisma/client";

export interface MessageWithPropertyName extends Message {
  property: {
    name: string;
  };
}
