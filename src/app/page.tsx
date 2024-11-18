import { dbConnect } from "@/service/mongo";
import Home from "./home/Home";

export default async function page() {
  const d = await dbConnect();
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
      <Home />
    </div>
  );
}
