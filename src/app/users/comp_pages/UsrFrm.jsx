import React from 'react'
import UsrTitle from '../components/UsrTitle'
import Upload from "@/components/c_upload/Upload";
import Lbl_Input from "@/components/c_input/Lbl_Input";
import Button from '@/components/c_button/Button';

export default function UsrFrm() {
  return (
    <div>
      <UsrTitle title="User Editor" />

      <div className="px-2 py-4 flex justify-center">
        <form>
          <div className="flex space-x-4">
            <Upload />
            <div className="space-y-2 xl:w-96">
              <Lbl_Input lbl="User Name" placeholder="Type name ..." />
              <Lbl_Input lbl="User Email" placeholder="Type email ..." />
              <Lbl_Input lbl="User Password" placeholder="Type password ..." />
              <div className="flex items-center space-x-2">
                <Button type='submit' className="bg-cgreen text-white" Icon="save">Save</Button>
                <Button Icon='cross'>Clear</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
