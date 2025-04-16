import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useContext, useEffect } from "react"
import { UserContext } from "./components/user-context"
import { chats, userPrueba } from "./components/chats.js"
import ChatApp from "./pages/ChatApp"
import './index.css'


function App() {
  const { user ,setChats,setUser} = useContext(UserContext)
  
  useEffect(()=>{
  
  
  })

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/chat" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/chat" />} />
      <Route path="/chat" element={user ? <ChatApp /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? "/chat" : "/login"} />} />
    </Routes>
  )
}

export default App
