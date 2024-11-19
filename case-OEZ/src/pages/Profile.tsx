import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const { logout } = useAuth();
  const { userEmail, userPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        <div className="flex  flex-col items-center justify-center">
          <div className="w-2/3 ">
            <div className="flex h-28 flex-col items-center gap-2">
              <h1>{userEmail}</h1>
              <h2>{userPassword}</h2>
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Введите новый пароль" />
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder="123456789"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-11/12 justify-end px-10">
            <Button
              color="failure"
              className="flex size-12 items-center justify-around border-2 border-black bg-red-600 text-black  dark:border-white dark:bg-red-800 dark:text-white  dark:hover:bg-red-700"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
