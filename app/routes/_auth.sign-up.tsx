import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Button } from "~/components/Button";
import { Input } from "~/components/Input";
import { auth } from "~/firebase";

// 参考としてコードを残すが、新しいユーザーを作成したくない(不要なメールアドレスを持ちたくない)ので、ログイン画面にリダイレクトさせる
export const clientLoader = () => {
  return redirect("/sign-in");
};

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return redirect("/");
  } catch (error) {
    console.log(error);
  }
};

export default function SignUp() {
  return (
    <>
      <h2 className="text-center text-2xl font-bold">新規登録</h2>

      <Form className="space-y-6" method="post">
        <Input id="email" name="email" label="メールアドレス" />
        <Input id="password" name="password" label="パスワード" />
        <div className="flex justify-end">
          <Button type="submit">新規登録</Button>
        </div>
      </Form>
    </>
  );
}
