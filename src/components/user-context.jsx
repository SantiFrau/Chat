import { createContext, useState, useEffect, useRef } from 'react';
import { GetChats, GetMessages } from '../utils/gets';
import { io } from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [mensajes, setMensajes] = useState([]);

  const selectedChatRef = useRef(selectedChat);
  const socketRef = useRef(null); // Referencia persistente del socket
  const initializedRef = useRef(false); // 👈 nueva bandera para evitar doble inicialización

  useEffect(() => {
    const fetchData = async ({chatId}) =>{
      const token = localStorage.getItem("token");
      if(chatId && token){

      const messages = await GetMessages({token,chatId})
      console.log(messages)
      if(messages?.success){
        setMensajes(messages.messages)
      }else{
        setMensajes([])
      }
    }
    }
    
    selectedChatRef.current = selectedChat;
    
    fetchData({chatId:selectedChat.chatid})
    
  }, [selectedChat]);


  useEffect(() => {
    const fetchData = async () => {
      // Solo para iniciar un socket en el caso de que react monte 2 veces el componente para evitar duplicidad en los mensajes
      if (initializedRef.current || !user) return;

      initializedRef.current = true;

      const token = localStorage.getItem("token");

      try {
        const c = await GetChats(token);
        console.log(c.chats)
        setChats(c.chats);

        const newSocket = io("http://localhost:3001", {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        socketRef.current = newSocket;

        newSocket.on("connect", () => {
          console.log("Socket conectado:", newSocket.id);
          const chatsId = c.chats.map(chat => chat.chatid);
          newSocket.emit("join", chatsId);
        });

        newSocket.on("receive-message", ({ username, message }) => {
          console.log("Nuevo mensaje de", username, ":", message);

          setChats(prevChats =>
            prevChats.map(chat =>
              chat.user.username === username
                ? { ...chat, lastMessage: message }
                : chat
            )
          );

          if (selectedChatRef.current?.user?.username === username) {
            setMensajes(prev => [...prev, message]);
          }
        });

      } catch (error) {
        console.error("Error al obtener los chats o conectar socket:", error);
      }
    };

    fetchData();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        initializedRef.current = false; // permitir reinicio si se desmonta
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
