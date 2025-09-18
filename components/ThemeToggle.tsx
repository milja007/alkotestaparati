"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="relative inline-flex h-10 w-20 items-center rounded-full bg-gray-200">
        <span className="inline-block h-8 w-8 transform rounded-full bg-white shadow-lg translate-x-1">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-4 w-4 bg-gray-300 rounded-full" />
          </div>
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Prebaci na ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span
        className={`inline-block h-8 w-8 transform rounded-full bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-10" : "translate-x-1"
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-yellow-500" />
          ) : (
            <Moon className="h-4 w-4 text-blue-400" />
          )}
        </div>
      </span>
    </button>
  );
}

// Kompaktna verzija za header
export function ThemeToggleCompact() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-gray-100">
        <div className="h-5 w-5 bg-gray-300 rounded-full" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Prebaci na ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-500" />
      )}
    </button>
  );
}
