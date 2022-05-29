import { useState } from "react";
import BaseModal from "../components/base_modal";
import LoginModal from "../components/login_modal";

export default function Home() {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div 
        className="bg-secondary text-secondaryHeading px-4 py-2 cursor-pointer w-fit mx-auto rounded-lg" 
        onClick={() => {
          setOpen(!open);
        }}
      >
        Click!
      </div>
      <BaseModal open={open} setOpen={(value: boolean) => {setOpen(value)}}>
        <LoginModal />
      </BaseModal>

    </div>
  )
}