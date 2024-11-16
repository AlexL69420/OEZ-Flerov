import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";

("use client");

import { VscAccount } from "react-icons/vsc";

export default function Header() {
  return (
    <main className="flex h-16 w-full items-center justify-around bg-blue-700 dark:bg-slate-800">
      <div className="flex w-11/12 justify-between gap-2">
        <div className="flex h-12 flex-wrap items-center gap-1">
          <Avatar
            className={"w-12"}
            img="src\assets\logo.svg"
            alt="logo"
            rounded
          />
          <h1 className="text-2xl text-white ">Флерова</h1>
        </div>

        <div className="flex w-1/6 flex-row items-center justify-around">
          <div className="flex flex-row gap-4">
            <Button
              color="blue"
              className="max-h-12 max-w-12 items-center rounded-full bg-blue-700 p-1 text-white dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <Link to="/options">
                <Avatar img={VscAccount} rounded />
              </Link>
            </Button>
            <DarkThemeToggle className="flex size-12 items-center justify-around rounded-full  text-white  hover:bg-blue-600 dark:text-slate-500 dark:hover:bg-slate-700" />
          </div>
        </div>
      </div>
    </main>
  );
}
