// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}auth/jwt/create/`, { username, password });
    console.log(response);
    return response.data;
};