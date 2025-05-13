import AddCommentIcon from '@mui/icons-material/AddComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { motion } from 'framer-motion';
import { formatearFechaChat } from '../utils/fecha';

export default function ChatList({ chats, busqueda, setBusqueda, selectedChat, setSelectedChat, setCreateChatMenu }) {
  const ordenarChatsPorFecha = (c) => [...c].sort((a, b) => new Date(b.lastMessage?.date) - new Date(a.lastMessage?.date));

  const chatsOrdenados = ordenarChatsPorFecha(chats);
  const chatsFiltrados = chatsOrdenados.filter(chat =>
    chat.user.username.toLowerCase().includes(busqueda)
  );

  return (
    <motion.div
      key="chatList"
      className="w-1/3 h-full bg-slate-900 border-x shadow-md shadow-blue-400 border-blue-400"
      initial={{ x: '-110%' }}
      animate={{ x: 0 }}
      exit={{ x: '-110%' }}
      transition={{ duration: 0.4 }}
    >
      <div className='flex flex-col gap-2 h-2/10'>
        <div className='flex flex-row justify-between items-center p-5'>
          <h3 className='text-2xl text-white'>Chats</h3>
          <div className='flex flex-row gap-2'>
            <div className='text-zinc-400 cursor-pointer hover:bg-slate-800 rounded-full p-2' onClick={() => setCreateChatMenu(true)}>
              <AddCommentIcon />
            </div>
            <div className='text-white cursor-pointer hover:bg-slate-800 rounded-full p-2'>
              <MoreVertIcon />
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className="w-full flex items-center justify-center">
            <div className="relative w-10/12 group">
              <div className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
                <SearchIcon />
              </div>
              <input
                onChange={(e) => setBusqueda(e.target.value.toLowerCase())}
                placeholder="Buscar un chat"
                className="w-full pl-10 pr-4 py-2 bg-slate-800 text-slate-300 rounded-full focus:outline-none focus:border-blue-600 hover:border-slate-600"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>

      <div className='h-8/10 w-full overflow-y-auto overflow-x-hidden py-5 px-2'>
        {chatsFiltrados.map((chat, i) => (
          <div key={i}
            className={`w-full cursor-pointer h-24 flex flex-row items-center ${chat.chatid === selectedChat?.chatid ? "bg-slate-800" : ""} justify-between px-5 hover:bg-slate-800 py-3 rounded-lg hover:scale-105 transition-all`}
            onClick={() => setSelectedChat(chat)}
          >
            <div className='w-full h-full flex flex-row gap-4'>
              <div className='h-full flex items-center'>
                 <div className="h-8/12 w-max rounded-full overflow-hidden flex items-center justify-center">
                   <img
                    src={chat.user.img}
                    alt=""
                    className="h-full w-full object-cover"
                   />
                  </div>
              </div>
              <div className='text-zinc-400 w-full flex flex-col justify-center'>
                <h5 className='text-white text-md'>{chat.user.username}</h5>
                {chat.lastMessage.mine ? (
                  <div className='flex flex-row items-center'>
                    <DoneAllIcon fontSize='small' />
                    <p>{chat.lastMessage.description}</p>
                  </div>
                ) : (
                  <p>{chat.lastMessage.description}</p>
                )}
              </div>
            </div>
            <div className='text-zinc-400'>
              <p>{formatearFechaChat(chat.lastMessage.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}