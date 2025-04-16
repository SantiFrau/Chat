import { useContext, useEffect } from "react";
import { UserContext } from "../components/user-context";
import { useNavigate, Link } from "react-router-dom";
import { getUserFromToken, loginUser } from "../utils/gets.js";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleclick = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await loginUser(username, password);

      if (res.token) {
        localStorage.setItem("token", res.token);
        const user = await getUserFromToken(res.token);
        setUser(user);
        navigate("/chat");
      } else {
        console.error("Token no recibido");
      }
    } catch (err) {
      console.error("Error en login:", err.message);
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
        onSubmit={handleclick}
        className="flex flex-col gap-3 justify-around items-center text-zinc-200 w-2/4 h-max backdrop-blur-3xl bg-gray-800/40 border border-white/30 rounded-xl shadow-lg p-6"
      >
        <h3 className="text-white font-bold text-2xl py-5">Iniciar Sesión</h3>
        <div className="flex flex-col items-center justify-center w-full gap-7 p-5">
          <input
            type="text"
            placeholder="Ingrese usuario"
            className="focus:outline-none w-2/3 border-b-4 border-blue-500/70 p-2 rounded-md focus:border-blue-500 transition-all duration-300"
            required
          />
          <input
            type="password"
            placeholder="Ingrese contraseña"
            className="focus:outline-none w-2/3 border-b-4 border-blue-500/70 p-2 rounded-md focus:border-blue-500 transition-all duration-300"
            required
          />
        </div>

        <input
          type="submit"
          value="Ingresar"
          className="py-2 px-10 bg-slate-950/30 borde border-blue-500/50 rounded-md shadow-lg shadow-blue-300/20 cursor-pointer"
        />

        <p className="text-sm pt-3">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
