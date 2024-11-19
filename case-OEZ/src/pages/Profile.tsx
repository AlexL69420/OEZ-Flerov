import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Profile() {
  return (
    <main className="flex min-h-screen  justify-center bg-blue-500 py-8 text-black dark:bg-slate-700 dark:text-white">
      <div className="flex w-2/3 flex-col gap-2 rounded-2xl bg-white text-black dark:bg-slate-800 dark:text-white">
        <div className="flex h-20 w-11/12 flex-row items-center justify-end">
          <div className="flex w-5/6 justify-center">
            <h1 className="text-3xl">Профиль</h1>
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
        <div></div>
      </div>
    </main>
  );
}
