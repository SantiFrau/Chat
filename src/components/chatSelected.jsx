import { useContext } from "react"
import { UserContext } from "./user-context"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';


export default function ChatSelected(){

    const {selectedChat} = useContext(UserContext)


    return(
        <div className="w-2/3 h-full degradado shadow-md shadow-blue-400 border-blue-400">
            {
                (selectedChat.chatid) ? 
                <div className="w-full h-full flex flex-col">
                     <div className="w-full h-1/10 bg-slate-900 shadow-sm shadow-blue-400 flex flex-row justify-between">
                        <div className="w-1/3 h-full flex flex-row gap-2 items-center px-5">
                          <img src={selectedChat.user.img} className=" rounded-full h-7/12 max-w-min" alt="" />
                          <h5 className="text-white font-bold p-3 ">{selectedChat.user.username}</h5>
                        </div>
                        <div className="w-1/3 flex flex-row gap-2 items-center justify-end px-5 text-zinc-400">
                            <div className="rounded-full hover:bg-slate-800 transition-colors p-2 cursor-pointer hover:text-white">
                                <SearchIcon></SearchIcon>
                            </div>
                            <div className="rounded-full hover:bg-slate-800 transition-colors p-2 cursor-pointer hover:text-white">
                                <MoreVertIcon></MoreVertIcon>
                            </div>
                        </div>
                       
                     </div>

                     <div className="w-full h-8/10">

                     </div>

                     <form action="#" className="w-full h-1/10 flex items-center justify-center">
                        <div className="relative w-9/10 p-3 rounded-full bg-blue-950 px-20 text-zinc-400">
                        
                        <div className="absolute inset-y-2 flex items-center justify-center cursor-pointer  left-3 hover:bg-slate-600 transition-colors rounded-full p-1">
                            <AddIcon></AddIcon>
                        </div>
                        <div className="absolute left-10 inset-y-2 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors rounded-full p-1">
                            <EmojiEmotionsIcon></EmojiEmotionsIcon>
                        </div>

                        <input type="text" className=" text-zinc-400 focus:outline-none w-full" placeholder="Escribe un mensaje" />
                        </div>
                       
                     </form>

                </div> 
                

                : null
            }
         
      </div>
    )
}