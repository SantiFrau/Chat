import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { motion } from 'framer-motion';
import { GetUsers } from '../utils/gets';

export default function CreateChatMenu({ setCreateChatMenu, HandleCreateChat, usersChats, setUsersChats }) {
  const submitSearchUser = async (e) => {
    e.preventDefault();
    const valor = e.target[0].value.toLowerCase();
    if (valor === "") { setUsersChats([]); return; }
    const token = localStorage.getItem("token");
    const response = await GetUsers({ token, username: valor });
    setUsersChats(response);
  };

  return (
    <motion.div
      key="createChat"
      className="w-1/3 h-full bg-slate-900 border-x shadow-md shadow-blue-400 border-blue-400"
      initial={{ x: '-110%' }}
      animate={{ x: 0 }}
      exit={{ x: '-110%' }}
      transition={{ duration: 0.4 }}
    >
      <div className='flex flex-col w-full h-full '>
        <div className='w-full flex flex-row px-2 py-4'>
          <div className='text-white font-bold p-2 hover:bg-slate-800 rounded-full w-max absolute' onClick={() => setCreateChatMenu(false)}>
            <ArrowBackIcon />
          </div>
          <h3 className='text-white text-2xl p-2 text-center w-full'>Agregar chat</h3>
        </div>
        <form className="w-full flex items-center justify-center py-2" onSubmit={submitSearchUser}>
          <div className="relative w-10/12 group ">
            <div className="absolute inset-y-0 left-3 flex items-center text-zinc-500">
              <SearchIcon />
            </div>
            <input
              placeholder="Buscar un usuario"
              className="w-full pl-10 pr-4 py-2 bg-slate-800 text-slate-300 rounded-full focus:outline-none focus:border-blue-600 hover:border-slate-600"
              type="text"
            />
          </div>
        </form>
        <div className='h-8/10 w-full overflow-y-auto overflow-x-hidden py-5 px-2'>
          {usersChats.map((user, i) => (
            <div key={i} className='w-full cursor-pointer h-24 px-5 hover:bg-slate-800 py-3 rounded-lg hover:scale-105 transition-all' onClick={() => HandleCreateChat(user.username)}>
              <div className='w-full h-full flex flex-row gap-4'>
                <div className='h-full flex items-center'>
                  <img className='rounded-full h-8/12' src={user.img} alt="" />
                </div>
                <div className='text-zinc-400 w-full flex flex-col justify-center'>
                  <h5 className='text-white text-md'>{user.username}</h5>
                </div>
                <div className='h-full flex items-center text-white/55 px-2'>
                  <AddBoxIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
