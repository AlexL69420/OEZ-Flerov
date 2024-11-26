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

        let complains: string[] = response.data.complains;
        let status: string[] = response.data.status;
        let recommendations: string[] = response.data.recommendations;

        // Преобразование строки в массив, если это необходимо
        if (typeof complains === "string") {
          console.log("complains is string");
          complains = JSON.parse(complains);
        }
        if (typeof status === "string") {
          console.log("status is string");
          status = JSON.parse(status);
        }
        if (typeof recommendations === "string") {
          console.log("recommendations is string");
          recommendations = JSON.parse(recommendations);
        }

        if (Array.isArray(complains)) {
          console.log("complains is not an array");
        }

        if (Array.isArray(status)) {
          console.log("status is not an array");
        }

        if (Array.isArray(recommendations)) {
          console.log("recommendations is not an array");
        }

        // Проверка на массив
        if (
          Array.isArray(complains) &&
          Array.isArray(status) &&
          Array.isArray(recommendations)
        ) {
          const scomplains: string = complains.join(", ");
          const sstatus: string = status.join(", ");
          const srecommendations: string = recommendations.join(", ");
          setCard(
            response.data.diagnosis,
            String(response.data.visiting),
            scomplains,
            sstatus,
            String(response.data.anamnesis),
            String(response.data.history),
            srecommendations,
            response.data.patient,
          );
        } else {
          console.log("somebody is not an array");

          console.log(typeof complains);
          console.log(typeof recommendations);
          console.log(typeof status);
        }
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
