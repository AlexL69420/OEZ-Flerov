import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import { LOCAL_API_URL } from "../enviroment";

("use client");

interface HistorySidebarProps {
  setCard: (
    diagnosis: string,
    visit: string,
    complains: string,
    status: string,
    anamnesis: string,
    history: string,
    recommendations: string,
    patient: string,
  ) => void;
}

export default function HistorySidebar({ setCard }: HistorySidebarProps) {
  const { isAuthenticated } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Для отображения загрузки
  const [error, setError] = useState(null); // Для обработки ошибок;

  /*
  type Item = {
    id: number;
    created_at: any;
    visiting: number;
    ai_suggestion: boolean;
    anamnesis: number;
    complains: string[];
    status: string[];
    history: boolean;
    diagnosis: string;
    recommendations: string[];
    patient: string;
  };
  */

  const handleCardSelection = (id: number) => {
    const test_token = localStorage.getItem("accessToken");
    axios
      .get(`${LOCAL_API_URL}cards/api/medicine/${id}/get_card/`, {
        headers: { Authorization: `Bearer ${test_token}` },
      })
      .then((response) => {
        console.log("Response data:", response.data); // Логирование данных

        if (
          !response.data.complaints ||
          !response.data.status ||
          !response.data.recommendations
        ) {
          console.error("Missing data in response:", response.data);
          return;
        }

        const complains: string[] = response.data.complaints;
        const status: string[] = response.data.status;
        const recommendations: string[] = response.data.recommendations;

        console.log("Type of complains:", typeof complains);
        console.log("Type of status:", typeof status);
        console.log("Type of recommendations:", typeof recommendations);

        // Проверка на массив
        if (!Array.isArray(complains)) {
          console.error("complaints is not an array:", complains);
          return;
        }
        if (!Array.isArray(status)) {
          console.error("status is not an array:", status);
          return;
        }
        if (!Array.isArray(recommendations)) {
          console.error("recommendations is not an array:", recommendations);
          return;
        }

        // Проверка на тип элементов массива
        if (!complains.every((item) => typeof item === "string")) {
          console.error("complaints contains non-string elements:", complains);
          return;
        }
        if (!status.every((item) => typeof item === "string")) {
          console.error("status contains non-string elements:", status);
          return;
        }
        if (!recommendations.every((item) => typeof item === "string")) {
          console.error(
            "recommendations contains non-string elements:",
            recommendations,
          );
          return;
        }

        if (Array.isArray(complains)) {
          setCard(
            String(response.data.diagnosis),
            String(response.data.visiting),
            String(complains.join(", ")),
            String(status.join(", ")),
            String(response.data.anamnesis),
            String(response.data.history),
            String(recommendations.join(", ")),
            String(response.data.patient),
          );
        } else if (typeof complains === "string") {
          setCard(
            String(response.data.diagnosis),
            String(response.data.visiting),
            String(complains),
            String(status),
            String(response.data.anamnesis),
            String(response.data.history),
            String(recommendations),
            String(response.data.patient),
          );
        } else {
          setCard(
            String(response.data.diagnosis),
            String(response.data.visiting),
            String(complains),
            String(status),
            String(response.data.anamnesis),
            String(response.data.history),
            String(recommendations),
            String(response.data.patient),
          );
        }

        setCard(
          String(response.data.diagnosis),
          String(response.data.visiting),
          complains.join(", "),
          status.join(", "),
          String(response.data.anamnesis),
          String(response.data.history),
          recommendations.join(", "),
          String(response.data.patient),
        );
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const test_token = localStorage.getItem("accessToken");
      // Делаем запрос только если пользователь аутентифицирован
      console.log(" (history) access token is ", test_token);
      axios
        .get(`${LOCAL_API_URL}cards/api/medicine/history/`, {
          headers: { Authorization: `Bearer ${test_token}` },
        }) // Проверьте URL на опечатку "ttp"
        .then((response) => {
          setHistory(response.data); // Устанавливаем данные из ответа
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="flex size-full flex-col items-center rounded border-2 bg-white p-3 text-black dark:bg-slate-600 dark:text-white">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-sans text-2xl">История диагнозов</h1>
          <div className="flex flex-col items-center gap-1 p-2">
            <h2>Чтобы увидеть историю диагнозов,</h2>
            <Link to="/Registration" className="text-blue-500 underline">
              войдите в аккаунт
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex h-full items-center justify-center">
        <h2>Загрузка...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex h-full items-center justify-center">
        <h2 className="text-red-500">{error}</h2>
      </main>
    );
  }

  return (
    <main className="flex size-full flex-col items-center rounded border-2 bg-white p-3 text-black dark:bg-slate-600 dark:text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-sans text-2xl">История диагнозов</h1>
        {history.length === 0 ? (
          <p>История пуста</p>
        ) : (
          <ul className="w-full">
            {history.map((item) => (
              <li
                onClick={() => handleCardSelection(item.id)}
                key={item.id}
                className="my-2 rounded border p-2 shadow-md hover:cursor-pointer dark:bg-slate-700"
              >
                <h3 className="text-lg font-semibold">
                  номер карточки {item.id}
                </h3>
                <p className="text-sm text-gray-500">
                  Дата создания: {new Date(item.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
