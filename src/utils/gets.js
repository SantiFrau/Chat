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
      console.error("Error al verificar token:", error);
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
      return chats;
    } catch (error) {
      console.error("Error al verificar token:", error);
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
      return messages;
    } catch (error) {
      console.error("Error al verificar token:", error);
      return null;
    }
  }