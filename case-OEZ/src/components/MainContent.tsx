"use client";

import { Label, TextInput, Button } from "flowbite-react";

export function MainContent() {
  return (
    <main className="flex min-h-screen w-screen flex-col  gap-2 bg-white p-2 text-black dark:bg-slate-600 dark:text-white">
      <div className="flex flex-col gap-4">
        <div className="flex max-w-screen-lg flex-col">
          <div className="mb-2 block">
            <Label htmlFor="base" value="Введите симптомы" />
          </div>
          <TextInput id="base" type="text" sizing="md" />
        </div>
        <Button
          color="blue"
          className="max-w-36 hover:bg-blue-500 dark:bg-black dark:hover:bg-slate-700"
        >
          Отправить
        </Button>
      </div>
    </main>
  );
}
