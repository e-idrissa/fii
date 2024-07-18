"use client"

import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {}

const Complete = (props: Props) => {
  const router = useRouter()
  return (
    <div className="container flex flex-col justify-around mt-4 pb-8 items-center">
        <h1 className="text-2xl font-semibold text-green-600"><span className="text-4xl">🎊</span>Felicitations<span className="text-4xl">🎊</span></h1>
        <div className="rounded-full transition duration-500 ease-in-out h-24 w-24 text-4xl flex items-center justify-center py-3 bg-green-600 text-white font-bold border border-green-600 my-4">&#10003;</div>
        <div className="font-medium text-gray-700 text-center">
          La fiche de Eddy a ete creee avec succes.
        </div>
        <a href="/" className="mt-8 font-semibold border-2 border-green-600 bg-green-600 text-white uppercase hover:text-white hover:border-slate-700 hover:bg-slate-700 transition duration-200 ease-in-out px-3 py-2 rounded-md">Close</a>
    </div>
  )
}

export default Complete