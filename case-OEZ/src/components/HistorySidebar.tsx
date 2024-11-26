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
    created_at: number;
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

  const handleCardSelection = (item) => {
    setCard(
      item.diagnosis,
      String(item.visiting),
      item.complains.join(", "),
      item.status.join(", "),
      String(item.anamnesis),
      String(item.history),
      item.recommendations.join(", "),
      item.patient,
    );
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
                onClick={() => handleCardSelection(item)}
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
