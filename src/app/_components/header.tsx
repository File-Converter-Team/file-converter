import Link from "next/link";
import {FileIcon} from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-gray-900 py-6 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="flex items-center gap-2 text-white" href="/">
          <FileIcon className="h-6 w-6"/>
          <span className="text-lg font-semibold">File Converter</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            href="/auth?tab=signin"
          >
            Sign In
          </Link>
          <Link
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            href="/auth?tab=signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
