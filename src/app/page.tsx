import { dbConnect } from "@/service/mongo";
import Home from "./home/Home";

export default async function page() {
  const d = await dbConnect();
  return (
    <div>
      <Home />
    </div>
  );
}
