import {Button} from "@/app/_components/ui/button";
import {UploadIcon} from "lucide-react";
import Link from "next/link";
import React from "react";

const Overview = () => {
  return (
    <section className="bg-gray-900 py-20 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Convert Files to JSON</h1>
          <p className="text-gray-400">
            Easily convert CSV, JavaScript, and other file types to JSON format. Our simple and intuitive tool makes
            file conversion a breeze.
          </p>
          <div className="flex items-center space-x-4">
            <Button
              href="#convertor"
              className="flex items-center gap-2 rounded-md px-6 py-3 text-white"
              variant="default"
            >
              <UploadIcon className="h-5 w-5"/>
              Upload File
            </Button>
            <Link className="text-indigo-600 hover:text-indigo-500 focus:text-indigo-500" href="#">
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            alt="File Conversion"
            className="max-w-full"
            height={400}
            src="/my-love.png"
            style={{
              aspectRatio: "400/400",
              objectFit: "cover",
            }}
            width={400}
          />
        </div>
      </div>
    </section>
  );
}

export default Overview;
