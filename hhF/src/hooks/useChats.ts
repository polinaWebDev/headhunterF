import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { apiClient } from "../api/axios";

interface Chat {
    id: number;
    company: {
        company_id: string;
        name: string;
        avatar: string | null;
    };
    user: {
        id: string;
    };
    messages: { content: string, createdAt: Date, sender: {id: string, name: string} }[];
}

// interface Message {
//     content: string;
//     createdAt: Date;
//     senderUser?: {
//         id: string;
//         name: string;
//     };
//     senderCompany?: {
//         company_id: string;
//         name: string;
//     } | null;
// }


interface Message {
    content: string;
    createdAt: Date;
    sender: {
        id: string;
        name: string;
        type: string;
    }
}


const useChats = (id: string | null) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState<number | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true); // состояние загрузки
    const [error, setError] = useState<string | null>(null); // состояние ошибки


    useEffect(() => {
        const fetchChats = async () => {
            if (!id) {
                return;
            }
            try {
                const response = await apiClient.get<Chat[]>("/chat/user");
                setChats(response.data);
            } catch (err) {
                console.error("Ошибка при получении чатов:", err);
                setError("Ошибка при загрузке чатов");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchChats();
        }

        const newSocket = io("ws://localhost:3000/");
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };

    }, [id]);

    useEffect(() => {
        if (socket && currentChatId && id) {
            socket.emit("joinChat", currentChatId);

            socket.on("receiveMessage", (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            socket.on("loadMessages", (loadedMessages: Message[]) => {
                setMessages(loadedMessages);
            });

            console.log(currentChatId);

            return () => {
                if (socket) {
                    socket.off("receiveMessage");
                    socket.off("loadMessages");
                    if (currentChatId) {
                        socket.emit("leaveChat", {
                            chatId: currentChatId,
                        });
                    }
                }
            };
        }
    }, [socket, currentChatId, id]);

    const handleChatSelect = (chat: Chat) => {
        setCurrentChatId(chat.id);
        setMessages([]);
    };

    const handleSendMessage = (messageContent: string) => {
        console.log(messageContent);
        if (socket && currentChatId && messageContent && id) {
            socket.emit("sendMessage", {
                chatId: currentChatId,
                content: messageContent,
                senderId: id,
                type: "user",
            });
        }
    };


    return { chats, currentChatId, messages, loading, error, handleChatSelect, handleSendMessage };
};

export default useChats;