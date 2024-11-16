import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { Avatar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";

("use client");

import { VscAccount } from "react-icons/vsc";

export default function Header() {
  return (
    <main className="bg-tmpk-blue flex h-16 w-full items-center justify-between gap-2 bg-blue-700 dark:bg-slate-800">
      <div className="flex h-12 flex-wrap items-center gap-1">
        <Avatar
          className={"w-12"}
          img="src\assets\logo.svg"
          alt="logo"
          rounded
        />
        <h1 className="text-2xl text-white ">Флерова</h1>
      </div>

      <Button className="bg-inherit dark:bg-inherit">
        <Link to="/options">
          <Avatar img={VscAccount} rounded />
        </Link>
      </Button>
      <DarkThemeToggle />
    </main>
  );
}
