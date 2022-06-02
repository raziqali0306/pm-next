import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SiVault } from 'react-icons/si';
import { AiOutlineSafety } from 'react-icons/ai';
import { CgCopyright } from "react-icons/cg";

export default function Home() {
  const Router = useRouter();



  useEffect(() => {
    if (sessionStorage.getItem('token-details') !== null) {
      Router.replace('/app')
    }
  })

  return (
    <div className="pt-20 select-none">
      <p className="uppercase text-6xl font-bold text-primaryHeading tracking-widest">Vault</p>
      <p className="text-xl font-semibold mt-6 mb-8">We often tend to forget passwords as we cannot remember all the passwords for all the accounts.
      </p>
      <div className="flex justify-around items-center text-center mx-8">
        <div className="w-full">
          <SiVault className="h-2/3 w-2/3 mx-auto" />
          <p className="font-bold">Encrypted Passwords</p>
        </div>
        <div className="w-full">
          <AiOutlineSafety className="h-2/3 w-2/3 mx-auto" />
          <p className="font-bold">Safe and Secure</p>
        </div>
      </div>

      <p className="text-base font-semibold mt-6 mb-8">With Password Manager, we can say goodbye to memorizing passwords. This application does this job for us.</p>

      <div className="text-sm mt-8">
        <div className="mb-1 inline-flex items-center gap-1">
          <CgCopyright />
          <p>2022, Vault Inc.</p>
        </div>
        <p>Version 1.0.0</p>
      </div>
    </div>
  )
}