import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";

("use client");

import { VscAccount } from "react-icons/vsc";
import { FiActivity } from "react-icons/fi";

export default function Header() {
  return (
    <main className="flex h-16 w-full items-center justify-around bg-blue-700 dark:bg-slate-800">
      <div className="flex w-11/12 justify-between gap-2">
        <div className="flex h-12 flex-wrap items-center gap-1">
          <Avatar
            className={"w-12 text-white dark:text-red-800"}
            img={FiActivity}
            alt="logo"
            rounded
          />
          <h1 className="font-mono text-3xl italic  text-white dark:text-red-800">
            Флерова
          </h1>
        </div>

        <div className="flex w-1/4 items-center justify-around  text-white dark:text-slate-300">
          <Link to="/Help">
            <h3 className="hover:underline">Помощь</h3>
          </Link>
          <Link to="/Registration">
            <h3 className="hover:underline">Регистрация</h3>
          </Link>
          <Link to="/History">
            <h3 className="hover:underline">История</h3>
          </Link>
        </div>

        <div className="flex w-1/6 flex-row items-center justify-around">
          <div className="flex flex-row gap-4">
            <Button
              color="blue"
              className="max-h-12 max-w-12 items-center rounded-full bg-blue-700 p-1 text-white dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
            >
              <Link to="/Profile">
                <Avatar img={VscAccount} rounded />
              </Link>
            </Button>
            <DarkThemeToggle className="flex size-12 items-center justify-around rounded-full border-2 border-white text-white  hover:bg-blue-600  dark:border-slate-500 dark:text-slate-500 dark:hover:bg-slate-700" />
          </div>
        </div>
      </div>
    </main>
  );
}
