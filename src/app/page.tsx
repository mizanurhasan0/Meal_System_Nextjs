import { dbConnect } from "@/service/mongo";

export default async function Home() {
  const d = await dbConnect();
  // console.log({ d });
  // const onSet = async (e: any) => {
  //   const d = { id: 1, name: "username" }
  //   const fd = new FormData();
  //   fd.append('image', e.target.files[0]);
  //   // fd.append('image[]', e.target.files[1]);
  //   const res = await fetch("/api/upload", { method: 'POST', body: fd });
  //   console.log(await res.json());
  //   // if (e.target.files) locsetSelectFile(e.target.files[0]);
  // }

  return (
    <div>
      <h1>Main page</h1>
    </div>
  );
}
