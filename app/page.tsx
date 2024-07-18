"use client"

import { FormProvider } from "@/components/custom/context";
import Steps from "@/components/custom/steps";

export default function Home() {
  return (
    <div className="bg-white md:w-1/2 mx-4 md:mx-auto shadow-xl rounded-2xl">
      <div className="container horizontal mt-5">
        <FormProvider>
          <div className="px-10"><Steps/></div>
        </FormProvider>
      </div>
    </div>
  );
}
