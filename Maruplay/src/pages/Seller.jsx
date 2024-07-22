import { useContext, useEffect, useState } from "react";
import MyContext from "../context";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetch, fetchLoading, fetchProducts } from "../store/products-slice";
import PostItems from "../components/PostItems";
import EditItem from "../components/EditItem";

export default function Seller() {


  const products = useSelector((state) => state.products.items)
  const loading = useSelector((state) => state.products.loading)
  const error = useSelector((state) => state.products.error)
  const openEdit = useSelector((state) => state.products.openEdit)
  const dispatch = useDispatch()
  const [openAdd, setopenAdd] = useState(false)
  



  
  // const [products, setProucts] = useState(null);

  // async function fetchProducts() {
  //   try {
  //       dispatch(fetchLoading(true))
  //     const response = await axios({
  //       method: "get",
  //       url: import.meta.env.VITE_BASE_URL + "/products?category=2",
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("access_token"),
  //       },
  //     });
  //     console.log(response);
  //     // setProucts(response.data.rows);
  //     dispatch(fetch(response.data.rows))
  //   } catch (error) {
  //     // console.log(response);
  //   }finally{
  //     dispatch(fetchLoading(false))
  //   }
  // }

  useEffect(() => {
    // fetchProducts()
    dispatch(fetchProducts());
  }, []);

 
  return (
    <>
      <Navbar />
      <button onClick={()=>{
        setopenAdd(!openAdd)
      }} className="bg-blue-400 p-3 rounded-md w-fit text-white ml-1 mt-2 hover:bg-blue-600">{openAdd? "Cancel": "Add Product"}</button>

      {openAdd ?      <PostItems setOpenAdd={setopenAdd} /> : ""}

     

      {openEdit ?  <EditItem /> : ""}

      {error?.message == "Forbidden"? <p>You cant delete if the items is not your own</p> : ""}
      {loading&& <div className="text-center p-10">Wait...</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-10 p-5">
        {products?.map((el, i) => {
          return <Card props={el} key={i}/>
        })}
      </div>
    </>
  );
}
