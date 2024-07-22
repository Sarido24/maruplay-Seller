import { RouterProvider } from "react-router-dom";
import router from "./router";
import MyContext from "./context";
import { useState } from "react";
import axios from "axios";
import store from "../src/store";
import { Provider } from "react-redux";
const App = () => {
  const [loading, setLoading] = useState(false);
  const [productById, setProductById]= useState(null)

  return (
    <Provider store={store}>
      <MyContext.Provider
        value={{
          loading,
          setLoading,
          productById,
          setProductById
        }}
      >
        <RouterProvider router={router}></RouterProvider>;
      </MyContext.Provider>
    </Provider>
  );
};

export default App;
