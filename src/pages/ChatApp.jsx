import Nav from "../components/nav"
import Chats from "../components/chats.jsx"
import ChatSelected from "../components/chatSelected"


function ChatApp() {
  return (
    <div className="w-full h-screen flex flex-row">
      <Nav />
      <Chats />
      <ChatSelected />
    </div>
  )
}
export default ChatApp