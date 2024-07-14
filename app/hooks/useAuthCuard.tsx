import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "~/firebase";

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const [isCheckLoggedIn, setIsCheckLoggedIn] = useState<
    "checking" | "finished"
  >("checking");

  const checkingLoggedIn = isCheckLoggedIn === "checking";

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user === null ? navigate("/sign-in") : setIsCheckLoggedIn("finished");
    });
  }, [navigate]);

  return { checkingLoggedIn };
};
