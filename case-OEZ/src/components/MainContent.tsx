"use client";

import { Link } from "react-router-dom";
import { FileInput, Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { BsArrowBarLeft } from "react-icons/bs";
import HistorySidebar from "./HistorySidebar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LOCAL_API_URL } from "../enviroment";

export function MainContent() {
  const [diagnosis, setDiagnosis] = useState("");
  const [visit, setVisit] = useState("");
  const [complaints, setComplaints] = useState("");
  const [status, setStatus] = useState("");
  const [anamnesis, setAnamnesis] = useState("");
  const [history, setHistory] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [patient, setPatient] = useState("");
  const [aiDiagnosis, setAiDiagnosis] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const { isAuthenticated, refresh } = useAuth();
  const navigate = useNavigate();

  const setCard = (
    diagnosis: string,
    visit: string,
    complains: string,
    status: string,
    anamnesis: string,
    history: string,
    recommendations: string,
    patient: string,
  ) => {
    setDiagnosis(diagnosis);
    setVisit(visit);
    setComplaints(complains);
    setStatus(status);
    setAnamnesis(anamnesis);
    setHistory(history);
    setRecommendations(recommendations);
    setPatient(patient);
  };

  const getNeuroResponse = () => {
    const data = {
      complaints,
      status,
      history,
      visit,
    };

    axios
      .post(
        `${LOCAL_API_URL}cards/api/ai-recommendations/create_suggestion/`,
        data,
      )
      .then((response) => {
        setAiDiagnosis(response.data.diagnosis);
        setAiResponse(response.data.ai_response);
      })
      .catch((error) => {
        console.error("Error fetching AI response:", error);
      });
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate("/Registration");
      return;
    }
    const data = {
      ai_suggestion_id: 0,
      anamnesis: parseInt(anamnesis),
      visiting: parseInt(visit),
      patient,
      diagnosis,
      complaints,
      status,
      history,
      recommendations,
    };
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      refresh();
    }
    console.log("accessToken", accessToken);

    await axios
      .post(`${LOCAL_API_URL}cards/api/medicine/create_card/`, data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      .then((response) => {
        console.log("Card created successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error creating card:", error);
      });
  };

  const handleHistoryButtonClick = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  return (
    <main className="flex min-h-screen w-screen flex-row justify-center  gap-2 bg-white px-1 py-3 text-black dark:bg-slate-600 dark:text-white">
      <div className="flex flex-row">
        {isHistoryVisible && <HistorySidebar setCard={setCard} />}
        <Button
          color="blue"
          className="h-6 w-8 items-center bg-blue-700 p-1 text-white dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700"
          onClick={handleHistoryButtonClick}
        >
          <BsArrowBarLeft />
        </Button>
      </div>
      <div className="flex size-full flex-row justify-center gap-2">
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
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
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
                value={history}
                onChange={(e) => setHistory(e.target.value)}
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
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
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
              <Label htmlFor="base4" value="Введите осложнения" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <TextInput
                id="base4"
                type="text"
                placeholder="осложнения"
                className="w-5/6"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
              <Label htmlFor="base5" value="Введите свой диагноз" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <TextInput
                id="base5"
                type="text"
                sizing="md"
                placeholder="диагноз"
                className="w-5/6"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
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
              <Label htmlFor="base6" value="Введите рекомендации" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <TextInput
                id="base6"
                type="text"
                placeholder="рекомендации"
                className="w-5/6"
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
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
              <Label htmlFor="base7" value="Введите анамнезис" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <TextInput
                id="base7"
                type="text"
                placeholder="анамнезис"
                className="w-5/6"
                value={anamnesis}
                onChange={(e) => setAnamnesis(e.target.value)}
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
              <Label htmlFor="base8" value="Введите день визита" />
            </div>
            <div className="flex flex-row items-center gap-2">
              <TextInput
                id="base8"
                type="text"
                placeholder="день визита"
                className="w-5/6"
                value={visit}
                onChange={(e) => setVisit(e.target.value)}
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

          <div className="flex flex-col gap-2">
            <Label>Или выберите файл</Label>
            <div className="flex w-full ">
              <Label
                htmlFor="dropzone-file"
                className="flex h-64 w-3/4 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 size-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      Нажмите или перетащите файл
                    </span>{" "}
                    для загрузки
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    mp3, ......, .... (MAX. 100mb (?))
                  </p>
                </div>
                <FileInput id="dropzone-file" className="hidden" />
              </Label>
            </div>
            <div className="w-3/4">
              <div>
                <Label
                  htmlFor="file-upload-helper-text"
                  value="Альтернативная загрузка"
                />
              </div>
              <FileInput
                id="file-upload-helper-text"
                helperText="mp3, ......, .... (MAX. 100mb (?))"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <Button
              color="blue"
              className="max-w-36 hover:bg-blue-500 dark:bg-black dark:hover:bg-slate-700"
              onClick={handleSubmit}
            >
              Отправить
            </Button>
            <Button
              outline
              gradientDuoTone="greenToBlue"
              className="max-w-36 dark:bg-black"
              onClick={getNeuroResponse}
            >
              Диагноз ИИ
            </Button>
          </div>
        </div>
        <div className="flex w-1/3 flex-col gap-2 rounded-2xl border-2 p-5">
          <h1> AI diagnosis</h1>
          <div className="h-40 w-11/12 rounded-2xl border-2 p-2">
            <p> {aiDiagnosis}</p>
          </div>
          <h1> AI cure</h1>
          <div className="h-40 w-11/12 rounded-2xl border-2 p-2">
            <p> {aiResponse}</p>
          </div>
          <Button color="success" className="w-10 dark:bg-black">
            <FaRegThumbsUp />
          </Button>
        </div>
      </div>
    </main>
  );
}
