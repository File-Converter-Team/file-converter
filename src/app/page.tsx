import React from "react";
import Convertor from "@/app/_components/convertor";
import Overview from "@/app/_components/overview";
import {auth} from "@/auth";
import {getIdByEmail} from "@/lib/getIdByEmail";

export default async function Home() {
  const session = await auth();
  let userId = null;
  if (session) {
    userId = await getIdByEmail(session?.user?.email as string) as string;
  }
  return (
    <>
      <Overview />
      <section id="convertor" className="bg-white py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <Convertor userId={userId} />
          </div>
        </div>
      </section>
    </>
  );
}
