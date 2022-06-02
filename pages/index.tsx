import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const Router = useRouter();



  useEffect(() => {
    if(sessionStorage.getItem('token-details') !== null) {
      Router.replace('/app')
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center font-semibold text-2xl">
      In Progress..!
    </div>
  )
}