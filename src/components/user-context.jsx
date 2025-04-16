// src/context/MyContext.jsx
import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [chats,setChats] = useState([])
  const [selectedChat,setSelectedChat] = useState({})
  const [mensajes,setMensajes] = useState([])

  return (
    <UserContext.Provider value={{ user,setUser,chats,setChats ,selectedChat,setSelectedChat}}>
      {children}
    </UserContext.Provider>
  );
};


