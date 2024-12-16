import {useState} from "react";
import useChats from "../../hooks/useChats.ts";
import style from "./styles.module.css"

const ChatsPage: React.FC = () => {
    const userId = sessionStorage.getItem("userId");
    const { chats, currentChatId, messages, loading, error, handleChatSelect, handleSendMessage } = useChats(userId);
    const [newMessage, setNewMessage] = useState("");



    if (loading) {
        return <div>Загрузка чатов...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    console.log("Выбранный чат: " + currentChatId, messages);


    return (
        <div className={`${style.chatPage}`}>
            <div className={`${style.chatList}`}>
                <h2>Ваши чаты</h2>
                <ul>
                    {chats.map((chat) => (
                        <li key={chat.id} onClick={() => handleChatSelect(chat)} className={`${style.chatItem}`}>
                            <span>Chat: {chat.id}</span>
                            {/* Отображаем последние 20 символов последнего сообщения, если оно существует */}
                            {chat.messages && chat.messages.length > 0 && (
                                <span className={`${style.lastMessage}`}>
                                     {chat.messages[0].content.slice(0, 20)}...
                                 </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`${style.chatWindow}`}>
                {currentChatId && (
                    <>
                        <div className={`${style.messageList}`}>
                            {messages.map((message) => (
                                <div key={message.createdAt.toString()} className={`${style.message} ${message.sender.id === userId ? style.sent : style.received}`}>
                                    <p>{message.content}</p>
                                    <span className={`${style.messageSender}`}>{message.sender.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className={`${style.inputArea}`}>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Введите сообщение..."
                            />
                            <button onClick={() => handleSendMessage(newMessage)}>Отправить</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatsPage;