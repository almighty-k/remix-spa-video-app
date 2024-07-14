import type { MetaFunction } from "@remix-run/node";
import {
  ClientActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from "~/components/Button";
import { FileInput } from "~/components/FileInput";
import { Input } from "~/components/Input";
import { db, storage } from "~/firebase";
import { useAuthGuard } from "~/hooks/useAuthCuard";

export const meta: MetaFunction = () => {
  return [
    { title: "Video App" },
    { name: "description", content: "Video App" },
  ];
};

export const clientLoader = async () => {
  const querySnapshot = await getDocs(collection(db, "videos"));
  const videos: { id: string; title: string; url: string }[] =
    querySnapshot.docs.map((doc) => {
      const id = doc.id;
      const { title, url } = doc.data();

      return { id, title, url };
    });
  return videos;
};

export const clientAction = async ({ request }: ClientActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const video = formData.get("video") as File;

  const videoRef = ref(storage, "video/" + video.name);

  // 書き込み許可のため、metaDataを渡す。(firebase storage側で allow write: if request.resource.metadata.arrowPostVideo == 'true'; を設定)
  const metaData = {
    customMetadata: {
      arrowPostVideo: "true",
    },
  };

  const uploadTask = uploadBytesResumable(videoRef, video, metaData);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // アップロードの進捗を確認できるが、今回は割愛
      console.log("snapshot", snapshot);
    },
    (error) => {
      console.log("error", error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      try {
        await addDoc(collection(db, "videos"), {
          title,
          url: downloadURL,
        });
      } catch (error) {
        console.log("firestore error", error);
      }
    }
  );

  return {
    message:
      "アップロード完了にはしばらく時間がかかります。時間をおいて、画面のリロードをしてください。",
  };
};

export default function Index() {
  const { checkingLoggedIn } = useAuthGuard();

  const submitting = useNavigation().state === "submitting";

  const videos = useLoaderData<typeof clientLoader>();
  const actionMessage = useActionData<typeof clientAction>();

  if (checkingLoggedIn) return null;

  return (
    <div className="container mx-auto">
      <p className="text-sm text-gray-700">
        ※ firebase
        storage無料枠で、上限制限があるため、投稿ボタンをdisabledにしている
      </p>
      {actionMessage?.message && (
        <p className="text-indigo-700 my-2">{actionMessage.message}</p>
      )}
      <Form
        className="flex items-center justify-end gap-3"
        encType="multipart/form-data"
        method="post"
      >
        <Input name="title" placeholder="タイトル" />
        <FileInput name="video" accept=".mp4" />
        {/* <Button disabled={submitting}>{submitting ? "投稿中" : "投稿"}</Button> */}
        <Button disabled>{submitting ? "投稿中" : "投稿"}</Button>
      </Form>

      <div className="grid grid-cols-3 place-items-center gap-6 py-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-full overflow-hidden rounded-lg shadow-md"
          >
            <video
              src={video.url}
              controls
              className="h-80 w-full object-cover"
            />
            <p className="p-4 text-indigo-700">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
