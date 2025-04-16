import { useContext, useEffect } from "react";
import { UserContext } from "../components/user-context";
import { useNavigate, Link } from "react-router-dom";
import { getUserFromToken, registerUser } from "../utils/gets.js";

export default function Register() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;
    const img = e.target[2].value || "https://imgs.search.brave.com/rwE-hC6ESt3hBJZhImPkb-KvU26bLDKVe-OKv1y50-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE0LzQz/LzU1LzE0NDM1NWQ3/YjM2YzVmNjQ2NDM1/NDIzNzk4MjgxY2U5/LmpwZw";

    try {
      const res = await registerUser(username, password, img);

      if (res.token) {
        localStorage.setItem("token", res.token);
        const user = await getUserFromToken(res.token);
        setUser(user);
        navigate("/chat");
      } else {
        console.error("Token no recibido");
      }
    } catch (err) {
      console.error("Error en registro:", err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserFromToken(token).then((user) => {
        if (user) {
          setUser(user);
          navigate("/chat");
        }
      });
    }
  }, []);

  return (
    <div className="w-full degradado h-screen grid place-items-center">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 justify-around items-center text-zinc-200 w-2/4 h-max backdrop-blur-3xl bg-gray-800/40 border border-white/30 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-white font-bold text-2xl py-5">Registrarse</h3>
        <div className="flex flex-col items-center justify-center w-full gap-7 p-5">
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="focus:outline-none w-2/3 border-b-4 border-blue-500/70 p-2 rounded-md focus:border-blue-500 transition-all duration-300"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="focus:outline-none w-2/3 border-b-4 border-blue-500/70 p-2 rounded-md focus:border-blue-500 transition-all duration-300"
            required
          />
          <input
            type="text"
            placeholder="URL de imagen (opcional)"
            className="focus:outline-none w-2/3 border-b border-blue-300/50 p-2 rounded-md"
          />
        </div>

        <input
          type="submit"
          value="Registrarse"
          className="py-2 px-10 bg-slate-950/30 borde border-blue-500/50 rounded-md shadow-lg shadow-blue-300/20 cursor-pointer"
        />

        <p className="text-sm pt-3">
          ¿Ya tenés una cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
