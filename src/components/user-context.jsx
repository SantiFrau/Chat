import { createContext, useState, useEffect, useRef } from 'react';
import { GetChats } from '../utils/gets';
import { io } from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [mensajes, setMensajes] = useState([]);

  const socketRef = useRef(null); // Socket único

  useEffect(() => {
    const fetchData = async () => {
      if (user && !socketRef.current) {
        const token = localStorage.getItem("token");

        try {
          const c = await GetChats(token);
          setChats(c.chats);

          const newSocket = io("http://localhost:3001", {
            extraHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });

          socketRef.current = newSocket;

          // Se une a las salas cuando se conecta
          newSocket.on("connect", () => {
            console.log("Socket conectado:", newSocket.id);
            const chatsId = c.chats.map(chat => chat.chatid);
            newSocket.emit("join", chatsId);
          });

          // Escucha mensajes entrantes
          newSocket.on("receive-message", ({ username, message }) => {
            console.log("Nuevo mensaje de", username, ":", message);

            // Actualiza el chat con el nuevo último mensaje
            setChats(prevChats => {
              const updated = prevChats.map(chat =>
                chat.user.username === username
                  ? { ...chat, lastMessage: message }
                  : chat
              );
              console.log("Chats actualizados:", updated);
              return updated;
            });

            // Si está abierto ese chat, agregar el mensaje
            if (selectedChat?.user?.username === username) {
              setMensajes(prev => [...prev, { username, message }]);
            }
          });

        } catch (error) {
          console.error("Error al obtener los chats o conectar socket:", error);
        }
      }
    };

    fetchData();

    // Cleanup al desmontar
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Socket desconectado");
        socketRef.current = null;
      }
    };
  }, [user]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      chats,
      setChats,
      selectedChat,
      setSelectedChat,
      mensajes,
      setMensajes,
      socket: socketRef.current
    }}>
      {children}
    </UserContext.Provider>
  );
};
