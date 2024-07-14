import { Outlet } from "@remix-run/react";
import { useNoAuthGuard } from "~/hooks/useNoAuthCuard";

export default function Auth() {
  const { checkingLoggedIn } = useNoAuthGuard();

  if (checkingLoggedIn) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
        <Outlet />
      </div>
    </div>
  );
}
