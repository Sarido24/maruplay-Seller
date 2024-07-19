import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useContext, useState } from "react";
import MyContext from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPageUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const [dataLoginUser, setDataLoginUser] = useState({
    email: "",
    password: "",
  });

  async function loginUser(data) {
    try {
      setLoading(true)
      const response = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/login",
        data,
      });
      if (response.statusText === "OK") {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/seller")
      }
    } catch (error) {
      console.log(error);
      setError(error)
    }finally{
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setDataLoginUser({
        ...dataLoginUser,
        email: value,
      });
    } else {
      setDataLoginUser({
        ...dataLoginUser,
        password: value,
      });
    }
  }

  function handleLogin(e) {

    loginUser(dataLoginUser);
  }
  return (
    <div className="flex w-full justify-center items-center h-[100vh] bg-secondary md:bg-white">
      <div className="flex flex-col items-center h-[50vh] md:h-[70vh] md:w-[70vh] md:bg-secondary md:shadow-xl">
        <h1 className="text-3xl font-bold text-center p-10 text-amber-900">
          Login User
        </h1>
        <div className=" h-[700px] p-10">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="relative">
              <input
                onChange={handleSubmit}
                type="email"
                name="email"
                placeholder="_@gmail.com"
                className="block object-cover pl-10 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
              />
              <span className="absolute top-0 p-2">
                <PersonIcon />
              </span>
            </div>
            <div className="relative">
              <input
                onChange={handleSubmit}
                type="password"
                name="password"
                placeholder="password"
                className="block object-cover pl-10 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900 sm:text-sm sm:leading-6"
              />
              <span className="absolute top-0 p-2">
                <LockIcon />
              </span>
            </div>

            <div className="flex justify-evenly py-10 gap-5">
              <button className="p-2 py-1 underline text-indigo-900 hover:transition-transform hover:scale-105 hover:duration-500">
                Register
              </button>
              <button
                onClick={handleLogin}
                className="p-2 bg-amber-900 hover:transition-transform hover:scale-105 hover:duration-500  text-white rounded-md w-16"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
