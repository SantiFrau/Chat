export async function getUserFromToken(token) {
    try {
      const response = await fetch("http://localhost:3001/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Token inválido");
  
      const user = await response.json();
      return user;
    } catch (error) {
      
      return null;
    }
  }

  export async function loginUser(username, password) {
    const response = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }
  
    const data = await response.json();
    return data; // { token}
  }

  export async function registerUser(username, password, img = null) {
    const res = await fetch("http://localhost:3001/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, img }),
    });
  
    return await res.json();
  }


  export async function GetChats(token){
    try {
      const response = await fetch("http://localhost:3001/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Token inválido");
  
      const chats = await response.json();
      return chats.chats;
    } catch (error) {
      
      return null;
    }
  }

  export async function GetMessages({token,chatId}){
    try {
      const response = await fetch(`http://localhost:3001/chat/message/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Token inválido");
  
      const messages = await response.json();
      if(messages.success){
        return messages.messages;
      }else{
        return []
      }
     
    } catch (error) {
      
      return null;
    }
  }

  export async function CreateChat({token,username}){
    try {
      const response = await fetch(`http://localhost:3001/chat/create/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Token inválido");
      console.log(response)
      
      return response.success
    } catch (error) {
      return null;
    }
  }

  export async function GetUsers({token,username}){
    try {
      const response = await fetch(`http://localhost:3001/user/search?search=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Token inválido");
      
      const users = await response.json();
      
      if(users.success){
        return users.users
      }else{
        return []
      }
      
    } catch (error) {
      return null;
    }
  }