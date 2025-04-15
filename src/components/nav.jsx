import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useEffect } from "react"
import { UserContext } from "./user-context"
import ChatIcon from '@mui/icons-material/Chat';

export default function Nav(){
   
    const {user,setUser} = useContext(UserContext)

    return (
        <nav className="bg-slate-950 w-16 h-full flex flex-col gap-5 items-center justify-between py-5">
          
          <div className='text-white'>
             <ChatIcon></ChatIcon>
          </div>


          <div className='h-max flex flex-col gap-5 justify-center items-center'>

          <div className='text-slate-800 w-8/12'>
            <hr />
          </div>

          <div className='text-zinc-200 w-full grid place-items-center'>
            <SettingsIcon fontSize='medium'></SettingsIcon>
          </div>
          <div className='grid place-items-center'>
            <img className='rounded-full w-8/12' src={user?.img} alt="User icon" />
          </div>

          </div>

        </nav>
    )
}