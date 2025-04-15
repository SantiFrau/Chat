import { useContext, useEffect } from "react"
import { UserContext } from "./components/user-context"
import {userPrueba} from "./components/chats.js"
import Nav from "./components/nav"
import Chats from "./components/chats.jsx"
import ChatSelected from "./components/chatSelected"
import { chats } from './components/chats';

function App() {
   
    const {user,setUser,setChats} = useContext(UserContext)
  
   useEffect(()=>{
    setUser(userPrueba)
    setChats(chats)
     },[])

  return (
   
    <div className="w-full h-screen flex flex-row">
        
        <Nav></Nav>
        
        <Chats></Chats>
  <ChatSelected></ChatSelected>



    </div>
  )
}

export default App
