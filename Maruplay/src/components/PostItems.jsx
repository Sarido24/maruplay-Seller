import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchError, fetchLoading, fetchProducts } from "../store/products-slice";

export default function PostItem() {
    const dispatch = useDispatch()
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categoryId: '2'
  });

  function handleChange(e) {
    const name = e.target.name;
    let value = e.target.value;
    if (e.target?.files) {
      value = e.target.files[0];
    }

    setData({
      ...data,
      [name]: value,
    });
  }
//   console.log(data);

  function handleSubmit(e) {
    console.log(e)
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("stock", data.stock)
    formData.append("image", data.image)
    formData.append("categoryId", data.categoryId)
    async function postProduct(e) {
        try {
            dispatch(fetchLoading(true))
            const response = await axios({
                method: "post",
                url: import.meta.env.VITE_BASE_URL + `/products?cloud_name=${import.meta.env.VITE_CLOUD_NAME}&api_key=${import.meta.env.VITE_CLOUD_API_KEY}&api_secret=${import.meta.env.VITE_CLOUD_API_SECRET}`,
                data: formData,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                }
            });
            console.log(response);
            dispatch(fetchProducts())
        setData({
            name: "",
            description: "",
            price: "",
            stock: "",
            image: "",
            categoryId: '2'
          })
        } catch (error) {
            console.log(error);
            dispatch(fetchError(error.response.data));
        } finally {
            dispatch(fetchLoading(false));
      }
    }

    postProduct()
  }

  return (
    <div className="w-full md:w-[50%] p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="name" className="">
          Name:
        </label>

        <input
            value={data.name}
          onChange={handleChange}
          type="text"
          id="name"
          name="name"
          className="block pl-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
        />

        <label className="">Description:</label>
        <input
         value={data.description}
          onChange={handleChange}
          type="text"
          name="description"
          className="block pl-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
        />

        <label className="">Price:</label>
        <input
         value={data.price}
          name="price"
          onChange={handleChange}
          type="number"
          className="block pl-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
        />

        <label className="">Stock:</label>
        <input
         value={data.stock}
          name="stock"
          onChange={handleChange}
          type="number"
          className="block pl-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
        />

        <label>Image:</label>
        <input
          onChange={handleChange}
          name="image"
          type="file"
          className="block pl-5 w-[50%] rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-900sm:text-sm sm:leading-6"
        />

        <div className="flex gap-5">
          <button type="submit" className="bg-green-600 p-3 text-white rounded-md w-full md:w-[20%]" >
            Add
          </button>
          <button
          onClick={()=>{
            setData({
                name: "",
                description: "",
                price: "",
                stock: "",
                image: "",
                categoryId: '2'
            })
          }}

            type="reset"
            className="bg-red-600 p-3 text-white rounded-md w-full md:w-[20%]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
