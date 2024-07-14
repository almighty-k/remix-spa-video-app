import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "~/firebase";

export const useNoAuthGuard = () => {
  const navigate = useNavigate();
  const [isCheckLoggedIn, setIsCheckLoggedIn] = useState<
    "checking" | "finished"
  >("checking");

  const checkingLoggedIn = isCheckLoggedIn === "checking";

  // ログイン状態であっても、firebaseのauthでは最初にnullの状態でわたってくる
  // そのため、clientLoaderでログインの判定をせず、useEffectを使い、userの状態を監視することで、ルートガードを実現する
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user !== null ? navigate("/") : setIsCheckLoggedIn("finished");
    });
  }, [navigate]);

  return { checkingLoggedIn };
};
