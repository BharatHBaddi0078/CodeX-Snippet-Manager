"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";

export function BackgroundGradientDemo() {
  return (
    <div className="flex justify-center items-center p-8">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="flex justify-center mb-4">
          <IconAppWindow size={100} className="text-blue-500" />
        </div>
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 font-bold text-center">
          CodeX Snippet Manager
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
          Manage your code snippets with style. Store, organize, and access your 
          favorite code snippets with syntax highlighting and search functionality.
        </p>
        <button className="w-full rounded-full pl-4 pr-1 py-2 text-white flex items-center justify-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800 hover:bg-gray-800 transition-colors">
          <span>Explore Features</span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-1 text-white">
            ✨
          </span>
        </button>
      </BackgroundGradient>
    </div>
  );
}