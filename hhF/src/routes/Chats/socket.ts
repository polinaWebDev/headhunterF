import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000"; // Убедитесь, что ваш сервер работает на этом адресе

// Функция для подключения сокета
export const socket: Socket = io(SERVER_URL, {
    transports: ['websocket'], // Обеспечивает подключение через вебсокеты
});