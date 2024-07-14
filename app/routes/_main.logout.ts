import { redirect } from "@remix-run/react";

import { signOut } from "firebase/auth";
import { auth } from "~/firebase";

export const clientAction = async () => {
  await signOut(auth);
  return redirect("/sign-in");
};
