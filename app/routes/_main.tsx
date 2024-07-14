import { Form, Link, Outlet, redirect } from "@remix-run/react";
import { signOut } from "firebase/auth";

import { Button } from "~/components/Button";
import { useAuthGuard } from "~/hooks/useAuthCuard";

export default function () {
  const { checkingLoggedIn } = useAuthGuard();

  if (checkingLoggedIn) return null;

  return (
    <div className="flex h-screen">
      <div className="flex h-full w-40 flex-col border-r-2 border-indigo-200 px-4 py-4">
        <Link className="text-lg font-bold" to="/">
          動画アプリ
        </Link>

        <div className="flex-1" />

        {/* このファイル内にactionを定義できない(一番上のroute階層と判断され、remixでは最上位のroute階層にactionを定義できないため) */}
        {/* そのため、actionを別途_main.logout.tsに定義し、そのactionを呼び出すようにしている*/}
        <Form method="post" action="/logout">
          <Button>ログアウト</Button>
        </Form>
      </div>
      <main className="flex-1 overflow-y-auto px-8 py-4">
        <Outlet />
      </main>
    </div>
  );
}
