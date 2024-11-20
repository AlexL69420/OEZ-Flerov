import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

("use client");

export default function HistorySidebar() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <main className="flex size-full flex-col items-center rounded border-2  bg-white p-3 text-black dark:bg-slate-600 dark:text-white">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-sans text-2xl"> История диагнозов </h1>
          <div className="flex flex-col items-center gap-1 p-2">
            <h2>Чтобы увидеть историю диагнозов,</h2>
            <Link to="/Registration" className="text-blue-500 underline">
              {" "}
              войдите в аккаунт
            </Link>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main>
      <h1>History</h1>
      <h1>Hi</h1>
    </main>
  );
}
