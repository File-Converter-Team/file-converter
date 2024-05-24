'use client';

import Link from "next/link";
import {FileIcon} from "lucide-react";
import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/app/_components/ui/avatar";
import {Button} from "@/app/_components/ui/button";
import {signOut, useSession} from "next-auth/react";


const Header = () => {
  const {data: session} = useSession();
  return (
    <header className="w-full bg-gray-900 py-6 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="flex items-center gap-2 text-white" href="/">
          <FileIcon className="h-6 w-6"/>
          <span className="text-lg font-semibold">File Converter</span>
        </Link>
        {!session?.user ? (
          <div className="flex items-center space-x-4">
            <Link
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              href="/auth"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage alt="@shadcn" src={session?.user?.image || undefined}/>
                <AvatarFallback>{session?.user?.name?.[0]?.toUpperCase() ?? 'G'}</AvatarFallback>
              </Avatar>
              <span className="text-white">{session.user.name}</span>
            </Link>
            <Button
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
