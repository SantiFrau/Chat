// src/components/Chats.js
import { useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from './user-context';
import ChatList from './ChatList';
import CreateChatMenu from './CreateChatMenu';
import { GetChats, CreateChat } from '../utils/gets';

export default function Chats() {
  const { setSelectedChat, selectedChat, chats, setChats } = useContext(UserContext);
  const [busqueda, setBusqueda] = useState("");
  const [createChatMenu, setCreateChatMenu] = useState(false);
  const [usersChats, setUsersChats] = useState([]);

  const HandleCreateChat = async (username) => {
    const token = localStorage.getItem("token");
    const response = await CreateChat({ token, username });
    if (response) {
      setCreateChatMenu(false);
      const c = await GetChats(token);
      setChats(c);
      setUsersChats([]);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!createChatMenu ? (
        <ChatList
          chats={chats}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          setCreateChatMenu={setCreateChatMenu}
        />
      ) : (
        <CreateChatMenu
          setCreateChatMenu={setCreateChatMenu}
          HandleCreateChat={HandleCreateChat}
          usersChats={usersChats}
          setUsersChats={setUsersChats}
        />
      )}
    </AnimatePresence>
  );
}