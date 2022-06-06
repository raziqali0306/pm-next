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
      <p className="text-xs font-semibold mt-1 mx-auto w-2/3 mb-4">Save all your login credentials at once place</p>
      <p className="text-sm mt-6 mx-auto w-2/3 mb-8">We often tend to forget passwords as we cannot remember all the passwords for all the accounts.</p>
      <div className="border-8 border-secondary_light w-1/2 mx-auto p-1 rounded-xl shadow-lg shadow-secondary_light/60">
        <div className="text-center border-4 border-secondary rounded-lg p-6">
          <div className="grid grid-cols-2 items-center mx-auto">
            <SiVault className="h-full w-full mx-auto" />
            <p className="font-bold animate-pulse">Encrypted Passwords</p>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center mx-auto">
            <p className="font-bold animate-pulse">Safe and Secure</p>
            <AiOutlineSafety className="h-full w-full mx-auto" />
          </div>
        </div>
      </div>

      <p className="text-sm mt-6 mx-auto w-2/3 mb-8">With Password Manager, we can say goodbye to memorizing passwords. This application does this job for us.</p>

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