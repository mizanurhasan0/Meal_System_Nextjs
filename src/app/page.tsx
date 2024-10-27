// "use client"
// import { useEffect, useState } from "react";
import { dbConnect } from "@/service/mongo";
import User from "./users/User";
import Link from "next/link";

import { Label } from "@/components/ui/label";
import Lbl_Input from "@/components/c_input/Lbl_Input";
import Upload from "@/components/c_upload/Upload";
import Dropdown from "@/components/c_dropdown/Dropdown";

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
    <main className="flex min-h-screen bg-gray-900">
      <div className="fixed xl:relative
       inset-y-0 flex-wrap items-center justify-between block w-full p-0 my-4 overflow-y-auto antialiased transition-transform duration-200  bg-white border-0 shadow-xl  max-w-64 ease-nav-brand z-990 xl:ml-6 rounded-2xl xl:left-0 -translate-x-full xl:translate-x-0">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div>
            <li>Dashboard</li>
            <Link href={"/members"}>Members</Link>
          </div>
        </div>
      </div>
      <div className="relative h-full min-h-screen transition-all duration-200 ease-in-out xl:ml-68 rounded-xl w-full flex flex-col">
        <nav className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 my-6 transition-all ease-in shadow-none duration-250 rounded-2xl lg:flex-nowrap lg:justify-start bg-white">This is header</nav>
        <div className="flex-shrink flex-1 bg-white h-full mx-6 mb-6 rounded-xl">
          <p>This is paragraph</p>
          {/* // <input type="file" onChange={(e) => onSet(e)} /> */}
          <User />
          <div className="bg-secondary">
            <Lbl_Input lbl="Email address" htmlFor="email" placeholder="Type email address.." />
          </div>
          <Upload />
          <Dropdown />
        </div>
      </div>
    </main>
  );
}
