import { useContext, useEffect, useState } from "react";
import MyContext from "../context";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Card from "../components/Card";

export default function User() {
  const [products, setProucts] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await axios({
        method: "get",
        url: import.meta.env.VITE_BASE_URL + "/pub/products?category=2",
      });
      console.log(response);
      setProucts(response.data.rows);
    } catch (error) {
      console.log(response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <div className="text-center p-10">Wait...</div>}
      <div className="grid grid-cols-3 gap-3 md:gap-10 p-5">
        {products?.map((el, i) => {
          return <Card props={el} key={i} />;
        })}
      </div>
    </>
  );
}
