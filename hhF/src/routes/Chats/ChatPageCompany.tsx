
import {useState} from "react";
import style from './styles.module.css'
import useChatsCompany from "../../hooks/useChatsCompany.ts";
import {useParams} from "react-router-dom";

const ChatsPageCompany: React.FC = () => {
    const { companyId } = useParams<{ companyId: string }>();

    if (!companyId) {
        return <div>Загрузка...</div> // Или 404, или другая обработка
    }

    const { chats, currentChatId, messages, loading, error, handleChatSelect, handleSendMessage } = useChatsCompany(companyId);
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
                                <div key={message.createdAt.toString()} className={`${style.message} ${message.sender.id === companyId ? style.sent : style.received}`}>
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

export default ChatsPageCompany;