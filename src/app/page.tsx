import React from "react";
import Convertor from "@/app/_components/convertor";
import Overview from "@/app/_components/overview";

export default function Home() {
  return (
    <>
      <Overview />
      <section id="convertor" className="bg-white py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <Convertor />
          </div>
        </div>
      </section>
    </>
  );
}
