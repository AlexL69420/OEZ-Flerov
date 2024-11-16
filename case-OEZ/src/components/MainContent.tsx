"use client";

import { Label, TextInput } from "flowbite-react";

export function MainContent() {
  return (
    <main className="flex min-h-screen w-screen flex-col  gap-2 bg-white p-2 text-black dark:bg-slate-600 dark:text-white">
      <div className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="base" value="Base input" />
          </div>
          <TextInput id="base" type="text" sizing="md" />
        </div>
      </div>
    </main>
  );
}
