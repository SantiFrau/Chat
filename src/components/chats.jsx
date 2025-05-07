import AddCommentIcon from '@mui/icons-material/AddComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useContext, useState } from 'react';
import { UserContext } from './user-context';

export default function Chats() {
  const { setSelectedChat, selectedChat, chats } = useContext(UserContext);
  const [busqueda, setBusqueda] = useState("");

  function formatearFechaChat(fechaString) {
    const fechaMensaje = new Date(fechaString);
    const ahora = new Date();
    const diferenciaMs = ahora - fechaMensaje;
    const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
    const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);

    if (diferenciaHoras < 24) {
      return fechaMensaje.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diferenciaDias < 7) {
      return fechaMensaje.toLocaleDateString('es-ES', { weekday: 'short' });
    } else {
      return fechaMensaje.toLocaleDateString('es-ES');
    }
  }

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

  const chatsOrdenados = ordenarChatsPorFecha(chats);
  const chatsFiltrados = chatsOrdenados.filter(chat =>
    chat.user.username.toLowerCase().includes(busqueda)
  );

  return (
    <div className="w-1/3 h-full bg-slate-900 border-x shadow-md shadow-blue-400 border-blue-400">
      <div className='flex flex-col gap-2 h-2/10'>
        <div className='flex flex-row justify-between items-center p-5'>
          <h3 className='text-2xl text-white'>Chats</h3>
          <div className=' flex flex-row gap-2'>
            <div className='text-zinc-400 transition-colors cursor-pointer hover:bg-slate-800 rounded-full p-2'>
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
              onClick={() => { handleclick(chat) }}>
              <div className='w-4/5 h-full flex flex-row gap-4 ' >
                <div className='h-full w-max flex items-center justify-center '>
                  <img className='rounded-full h-8/12 max-w-min' src={chat.user.img} alt="" />
                </div>
                <div className='text-zinc-400 w-full overflow-hidden text-nowrap flex flex-col justify-center'>
                  <h5 className='text-white text-md'>{chat.user.username}</h5>
                  {chat.lastMessage.mine ?
                    <div className='flex flex-row'>
                      <DoneAllIcon fontSize='small' />
                      <p>{chat.lastMessage.description}</p>
                    </div>
                    : <p>{chat.lastMessage.description}</p>}
                </div>
              </div>

              <div className='text-zinc-400'>
                <p>{hora}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
