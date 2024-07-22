import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchError, fetchProducts, setopenEdit } from "../store/products-slice";
import { useContext, useState } from "react";
import MyContext from "../context";

export default function Card({ props }) {
  // console.log(props);
  const {setProductById} = useContext(MyContext)
  const dispatch = useDispatch();
  const { name, imgUrl, description, price, stock, id } = props;

  function handleDelete(ID) {
    async function deleteById() {
      try {
        const response = await axios({
          method: "delete",
          url: import.meta.env.VITE_BASE_URL + `/products/${ID}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        console.log(response);
        dispatch(fetchProducts());
      } catch (error) {
        // console.log(error);
        const errMessage = error.response.data;
        dispatch(fetchError(errMessage));
      }
    }
    deleteById();
  }

  function handleEdit(id){
    async function editProduct(){
      try {
        const response = await axios({
          method: "put",
          url: import.meta.env.VITE_BASE_URL + "/products/" + id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          }
        })
        console.log(response);
        setProductById(response.data)
        dispatch(setopenEdit(true))
      } catch (error) {
        console.log(error);
      }
    }
    editProduct()
  }

  return (
    <div className=" p-10 flex flex-col items-center md:relative gap-4 shadow-lg h-[400px] md:h-[450px] rounded-md">
      <h1 className="text-sm font-bold h-[110px] w-full  md:text-2xl  md:font-bold">
        {name}
      </h1>

      <img className="h-[50px] md:h-[50%]" src={imgUrl} alt="" />
      <p className="text-xs md:text-sm bg-amber-800 text-white p-3 md:rounded-md md:absolute md:top-0 md:right-1">
        Rp.{price},-
      </p>
      <p className="">Available Stock : {stock}</p>
      <div className="flex gap-2">
        <button
          className="bg-red-600 text-white p-3 rounded-sm hover:bg-red-900"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </button>
        <button
          className="bg-green-600 text-white p-3 rounded-sm hover:bg-red-900"
          onClick={() => {
            handleEdit(id);
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
