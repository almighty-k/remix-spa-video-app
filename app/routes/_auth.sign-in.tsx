import {
  ClientActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
  useNavigation,
} from "@remix-run/react";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { auth } from "~/firebase";
import { useNoAuthGuard } from "~/hooks/useNoAuthCuard";

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    return redirect("/");
  } catch (error) {
    console.log("error", error);
  }
};

export default function SignIn() {
  const { checkingLoggedIn } = useNoAuthGuard();
  const submitting = useNavigation().state === "submitting";

  if (checkingLoggedIn) return null;

  return (
    <>
      <h2 className="text-center text-2xl font-bold ">ログイン</h2>

      <div className="space-y-1 text-sm text-gray-700">
        <p>サンプルアプリのため、下記ユーザーのみログイン可能</p>
        <p>ユーザー名: test@example.com</p>
        <p>パスワード: testtest</p>
      </div>

      <Form className="space-y-6" method="post">
        <Input id="email" name="email" label="メールアドレス" />
        <Input id="password" name="password" label="パスワード" />
        <div className="flex justify-end">
          <Button type="submit" disabled={submitting}>
            {submitting ? "ログイン中..." : "ログイン"}
          </Button>
        </div>
      </Form>
    </>
  );
}
