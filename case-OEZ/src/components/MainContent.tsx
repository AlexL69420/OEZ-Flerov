"use client";

import { Link } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useState } from "react";

export function MainContent() {
  const [neuroResponse, setNeuroResponse] = useState("");

  const getNeuroResponse = () => {
    axios
      .get("")
      .then((response) => {
        setNeuroResponse(response.data.title.content);
      })
      .catch((error) => {
        setNeuroResponse("error");
      });
  };

  return (
    <main className="flex min-h-screen w-screen flex-row justify-center  gap-2 bg-white p-3 text-black dark:bg-slate-600 dark:text-white">
      <div className="flex w-1/2 flex-col gap-4 rounded-2xl border-2 p-5">
        <div className="flex w-11/12 flex-col">
          <div className="mb-2 block">
            <Label htmlFor="base" value="Введите ФИО" />
          </div>
          <div className="flex flex-row items-center gap-2">
            <TextInput
              id="base"
              type="text"
              placeholder="ФИО"
              className="w-5/6"
            />
            <Link to="/Help">
              <Button
                color="blue"
                className="max-h-12 max-w-12 items-center rounded-full bg-blue-700 p-1 text-white dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
              >
                ?
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex w-11/12 flex-col">
          <div className="mb-2 block">
            <Label htmlFor="base2" value="Введите историю болезни" />
          </div>
          <div className="flex w-full flex-row items-center gap-2">
            <TextInput
              id="base2"
              type="text"
              placeholder="история болезни"
              className="w-5/6"
            />
            <Link to="/Help">
              <Button
                color="blue"
                className="max-h-12 max-w-12 items-center rounded-full bg-blue-700 p-1 text-white dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
              >
                ?
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex w-11/12 flex-col">
          <div className="mb-2 block">
            <Label htmlFor="base3" value="Введите симптомы" />
          </div>
          <div className="flex flex-row items-center gap-2">
            <TextInput
              id="base3"
              type="text"
              placeholder="симптомы"
              className="w-5/6"
            />
            <Link to="/Help">
              <Button
                color="blue"
                className="max-h-12 max-w-12 items-center rounded-full bg-blue-700 p-1 text-white dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
              >
                ?
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex w-11/12 flex-col">
          <div className="mb-2 block">
            <Label htmlFor="base4" value="Введите свой диагноз" />
          </div>
          <div className="flex flex-row items-center gap-2">
            <TextInput
              id="base4"
              type="text"
              sizing="md"
              placeholder="диагноз"
              className="w-5/6"
            />
            <Link to="/Help">
              <Button
                color="blue"
                className="max-h-12 max-w-12 items-center rounded-full bg-blue-700 p-1 text-white dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
              >
                ?
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <Button
            color="blue"
            className="max-w-36 hover:bg-blue-500 dark:bg-black dark:hover:bg-slate-700"
          >
            Сохранить
          </Button>
          <Button
            outline
            gradientDuoTone="greenToBlue"
            className="max-w-36 dark:bg-black "
            onClick={getNeuroResponse}
          >
            Диагноз ИИ
          </Button>
        </div>
      </div>
      <div className="flex w-1/3 flex-col gap-2 rounded-2xl border-2 p-5">
        <h1> AI diagnosis</h1>
        <p> {neuroResponse}</p>
        <h1> AI cure</h1>
      </div>
    </main>
  );
}
