import {FileIcon} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 py-8 px-4 md:px-6 shrink-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 text-white">
          <FileIcon className="h-6 w-6"/>
          <span className="text-lg font-semibold">File Converter</span>
        </div>
        <p className="text-gray-400">© 2024 File Converter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
