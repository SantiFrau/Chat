import AddCommentIcon from '@mui/icons-material/AddComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext, useState } from 'react';
import { UserContext } from './user-context';
import { formatearFechaChat } from '../utils/fecha';
import { motion, AnimatePresence } from 'framer-motion';
import { CreateChat, GetChats, GetUsers } from '../utils/gets';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Chats() {
  const { setSelectedChat, selectedChat, chats ,setChats } = useContext(UserContext);
  const [busqueda, setBusqueda] = useState("");
  const [createChatMenu, setCreateChatMenu] = useState(false);

  function ordenarChatsPorFecha(c) {
    return [...c].sort((a, b) => {
      const fechaA = new Date(a.lastMessage?.date);
      const fechaB = new Date(b.lastMessage?.date);
      return fechaB - fechaA;
    });
  }

  const handleclick = (chat) => {
    setSelectedChat(chat);
  };

  const search = (e) => {
    e.preventDefault();
    const valor = e.target[0].value.toLowerCase();
    setBusqueda(valor);
  };

  const [usersChats,setUsersChats] = useState([])

  const submitSearchUser = async (e)=>{
    e.preventDefault()
    const valor = e.target[0].value.toLowerCase();

    if(valor==""){setUsersChats([]);return}

    const token = localStorage.getItem("token")
    const response = await GetUsers({token,username:valor})
    setUsersChats(response)

  }

  const HandleCreateChat = async (username) =>{
    const token = localStorage.getItem("token")
    const response = CreateChat({token,username})

    if(response){
        setCreateChatMenu((prev)=>{!prev})
        const c = await GetChats(token);
        setChats(c)
    }
  }

  const chatsOrdenados = ordenarChatsPorFecha(chats);
  const chatsFiltrados = chatsOrdenados.filter(chat =>
    chat.user.username.toLowerCase().includes(busqueda)
  );

  return (
    <AnimatePresence mode="wait">
      {!createChatMenu ? (
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
                <div className='text-zinc-400 transition-colors cursor-pointer hover:bg-slate-800 rounded-full p-2' onClick={() => setCreateChatMenu(true)}>
                  <AddCommentIcon />
                </div>
                <div className='text-white transition-colors cursor-pointer hover:bg-slate-800 rounded-full p-2'>
                  <MoreVertIcon />
                </div>
              </div>
            </div>

            <div className='w-full'>
              <form action="#" className="w-full flex items-center justify-center" onSubmit={search}>
                <div className="relative w-10/12 group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-blue-600 transition-colors">
                    <SearchIcon />
                  </div>
                  <input
                    onChange={(e) => setBusqueda(e.target.value.toLowerCase())}
                    placeholder="Buscar un chat"
                    className="transition-colors w-full pl-10 pr-4 py-2 bg-slate-800 text-slate-300 rounded-full focus:outline-none focus:border-2 focus:border-blue-600 hover:border-1 hover:border-slate-600"
                    type="text"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className='h-8/10 w-full overflow-y-auto overflow-x-hidden py-5 px-2'>
            {chatsFiltrados.map((chat, i) => {
              const hora = formatearFechaChat(chat.lastMessage.date);

              return (
                <div key={i}
                  className={`w-full cursor-pointer h-24 flex flex-row items-center ${chat.chatid === selectedChat?.chatid ? "bg-slate-800" : ""} justify-between px-5 hover:bg-slate-800 py-3 rounded-lg hover:scale-105 transition-all`}
                  onClick={() => handleclick(chat)}
                >
                  <div className='w-4/5 h-full flex flex-row gap-4'>
                    <div className='h-full w-max flex items-center justify-center'>
                      <img className='rounded-full h-8/12 max-w-min' src={chat.user.img} alt="" />
                    </div>
                    <div className='text-zinc-400 w-full overflow-hidden text-nowrap flex flex-col justify-center'>
                      <h5 className='text-white text-md'>{chat.user.username}</h5>
                      {chat.lastMessage.mine ? (
                        <div className='flex flex-row'>
                          <DoneAllIcon fontSize='small' />
                          <p>{chat.lastMessage.description}</p>
                        </div>
                      ) : (
                        <p>{chat.lastMessage.description}</p>
                      )}
                    </div>
                  </div>

                  <div className='text-zinc-400'>
                    <p>{hora}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="createChat"
          className="w-1/3 h-full bg-slate-900 border-x shadow-md shadow-blue-400 border-blue-400"
          initial={{ x: '-110%' }}
          animate={{ x: 0 }}
          exit={{ x: '-110%' }}
          transition={{ duration: 0.4 }}
        >
          <div className=' flex w-full h-full flex-col'>
            <div className='w-full flex flex-row px-2 py-4'>
              
              <div className='text-white font-bold p-2 hover:bg-slate-800 rounded-full w-max absolute' onClick={() => setCreateChatMenu(false)}>
                <ArrowBackIcon />
             </div>
             <h3 className='text-white text-2xl p-2 text-center w-full'>
                Agregar chat
              </h3>

            </div>


            <form action="#" className="w-full flex items-center justify-center py-2" onSubmit={submitSearchUser}>
                <div className="relative w-10/12 group">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-hover:text-blue-600 transition-colors">
                    <SearchIcon />
                  </div>
                  <input
                    placeholder="Buscar un chat"
                    className="transition-colors w-full pl-10 pr-4 py-2 bg-slate-800 text-slate-300 rounded-full focus:outline-none focus:border-2 focus:border-blue-600 hover:border-1 hover:border-slate-600"
                    type="text"
                  />
                </div>
              </form>


              <div className='h-8/10 w-full overflow-y-auto overflow-x-hidden py-5 px-2'>
            {usersChats.map((user, i) => {
              
              return (
                <div key={i}
                  className={`w-full cursor-pointer h-24 px-5 hover:bg-slate-800 py-3 rounded-lg hover:scale-105 transition-all`}
                  onClick={()=>{HandleCreateChat(user.username)}}
                  
                >
                  <div className='w-full h-full flex flex-row gap-4'>
                    <div className='h-full w-max flex items-center justify-center'>
                      <img className='rounded-full h-8/12 max-w-min' src={user.img} alt="" />
                    </div>
                    <div className='text-zinc-400 w-full overflow-hidden text-nowrap flex flex-col justify-center'>
                      <h5 className='text-white text-md'>{user.username}</h5>
                    </div>
                    <div className='h-full flex items-center justify-center text-white/55 px-2'>
                       <AddBoxIcon></AddBoxIcon>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>
          
         

          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
