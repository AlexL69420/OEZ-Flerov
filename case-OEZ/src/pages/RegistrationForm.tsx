"use client";

import { Link } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export function RegistrationForm() {
  return (
    <main className="flex min-h-screen  justify-center bg-blue-500 py-8 text-black dark:bg-slate-700 dark:text-white">
      <form className="flex w-1/3 min-w-72 max-w-md flex-col gap-4  rounded-2xl bg-white p-5 text-black dark:bg-slate-800 dark:text-white">
        <div className="flex h-20 w-11/12 flex-row items-center justify-end">
          <div className="flex w-5/6 justify-center">
            <h1 className="text-3xl">Вход в систему</h1>
          </div>
          <div className="flex w-1/6 justify-end">
            <Link to="/">
              <Button
                color="light"
                className="flex size-12 items-center justify-around rounded-full border-2 border-black bg-white text-black hover:bg-slate-300 disabled:pointer-events-none  dark:border-white dark:bg-slate-800 dark:text-white  dark:hover:bg-slate-700"
              >
                X
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Введите логин" />
          </div>
          <TextInput
            id="email1"
            type=""
            placeholder="doctor@gmail.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Введите пароль" />
          </div>
          <TextInput
            id="password1"
            type="password"
            placeholder="123456789"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Запомнить меня</Label>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            color="blue"
            className=" w-1/2  bg-blue-500  dark:bg-slate-900 dark:hover:bg-slate-500"
          >
            Отправить
          </Button>
        </div>
      </form>
    </main>
  );
}
