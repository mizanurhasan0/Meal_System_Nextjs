'use client';
import React, { useRef } from 'react'
import UsrTitle from '../../../components/title/UsrTitle'
import Upload from "@/components/c_upload/Upload";
import Lbl_Input from "@/components/c_input/Lbl_Input";
import Button from '@/components/c_button/Button';

export default function UsrFrm() {
  const frmRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fetch("/api/user", { method: "POST", body: fd }).then((res) => res.json()).then(data => {
      console.log(data);
      e.target.reset();
    }).catch((e) => console.log(e));
  }

  const onClean = () => frmRef.current.reset();

  return (
    <div>
      <UsrTitle title="User Editor" />

      <div className="px-2 py-4 flex justify-center">
        <form onSubmit={onSubmit} ref={frmRef}>
          <div className="flex space-x-4">
            <Upload name="file" />
            <div className="space-y-2 xl:w-96">
              <Lbl_Input lbl="Name" name="name" placeholder="Type name ..." />
              <Lbl_Input lbl="Email" name="email" placeholder="Type email ..." />
              <Lbl_Input lbl="Phone" name="phone" placeholder="Type phone ..." />
              <Lbl_Input lbl="Password" name="password" placeholder="Type password ..." />
              <div className="flex items-center space-x-2">
                <Button type='submit' className="bg-cgreen text-white" Icon="save">Save</Button>
                <Button Icon='cross' onClick={onClean}>Clear</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
