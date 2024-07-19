import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import AlternateEmailTwoToneIcon from '@mui/icons-material/AlternateEmailTwoTone';
import PhoneIcon from '@mui/icons-material/Phone';
import { useContext, useState } from "react";
import MyContext from "../context";
import Swal from "sweetalert2";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const [email, setEmail] = useState("")

  const [dataRegisterUser, setDataRegiterUser] = useState({
    email: "",
    password: "",
    phoneNumber:"",
    address: ""
  });

  async function registerUser(data) {
    try {
      setLoading(true)
      const response = await axios({
        method: "post",
        url: import.meta.env.VITE_BASE_URL + "/register",
        data,
      });
      console.log(response)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${response.data.email} has been registered`,
        showConfirmButton: false,
        timer: 1500
      });
      setEmail(response.data.email)
      navigate("/login/seller")
    } catch (error) {
      console.log(error);
      setError(error.response.data)
    }finally{
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    setError(null)
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setDataRegiterUser({
        ...dataRegisterUser,
        email: value,
      });
    } else if(name === "password") {
      setDataRegiterUser({
        ...dataRegisterUser,
        password: value,
      });
    }else if(name === "phoneNumber"){
        setDataRegiterUser({
            ...dataRegisterUser,
            phoneNumber: value,
          });
    }else {
        setDataRegiterUser({
            ...dataRegisterUser,
            address: value,
          });
    }
  }

  function handleRegister(e) {

    registerUser(dataRegisterUser);
  }
  return (
    <div className="flex w-full justify-center items-center h-[100vh] bg-secondary md:bg-white">
      <div className="flex flex-col items-center h-[50vh] md:h-[70vh] md:w-[70vh] md:bg-secondary md:shadow-xl">
        <h1 className="text-3xl font-bold text-center p-10 text-amber-900">
          Register User
        </h1>
      {loading&& <p>Loading...</p>}
      {error&&  <p className="text-red-500">{error.message}</p>}
        <div className=" h-[700px] p-10">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="relative">
              <input
                onChange={handleSubmit}
                type="email"
                name="email"
                placeholder="_@gmail.com"
                className="block pl-10 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
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
                className="block pl-10 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
              />
              <span className="absolute top-0 p-2">
                <LockIcon />
              </span>
            </div>
            <div className="relative">
              <input
                onChange={handleSubmit}
                type="number"
                name="phoneNumber"
                placeholder="08.."
                className="block pl-10 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
              />
              <span className="absolute top-0 p-2">
                <PhoneIcon />
              </span>
            </div>
            <div className="relative">
              <input
                onChange={handleSubmit}
                type="text"
                name="address"
                placeholder="address"
                className="block pl-10 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
              />
              <span className="absolute top-0 p-2">
                <AlternateEmailTwoToneIcon />
              </span>
            </div>

            <div className="flex justify-evenly w-full py-10 gap-5">
              <Link to={"/login"}  className="p-2 underline text-indigo-900 hover:transition-transform hover:scale-105 hover:duration-500">
                Login
              </Link>
              <button
                onClick={handleRegister}
                className="p-2 w-auto bg-amber-900 hover:transition-transform hover:scale-105 hover:duration-500  text-white rounded-md"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
