"use server";

import * as auth from "@/auth";

export async function signInWithGoogle() {
  return auth.signIn("google");
}
