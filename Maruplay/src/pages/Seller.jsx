import { useContext, useEffect, useState } from "react";
import MyContext from "../context";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetch, fetchLoading } from "../store/products-slice";

export default function Seller() {


  const products = useSelector((state) => state.products.items)
  const loading = useSelector((state) => state.products.loading)
  const dispatch = useDispatch()

  // const [products, setProucts] = useState(null);

  async function fetchProducts() {
    try {
        dispatch(fetchLoading(true))
      const response = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "/products?category=2",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(response);
      // setProucts(response.data.rows);
      dispatch(fetch(response.data.rows))
    } catch (error) {
      // console.log(response);
    }finally{
      dispatch(fetchLoading(false))
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

 
  return (
    <>
      <Navbar />
      {loading&& <div className="text-center p-10">Wait...</div>}
      <div className="grid grid-cols-3 gap-3 md:gap-10 p-5">
        {products?.map((el, i) => {
          return <Card props={el} key={i}/>
        })}
      </div>
    </>
  );
}
