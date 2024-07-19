import { RouterProvider} from "react-router-dom";
import router from "./router";
import MyContext from "./context";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [loading, setLoading] = useState(false)

  return (
    <MyContext.Provider
      value={{
        loading, setLoading
      }}
    >
      <RouterProvider router={router}></RouterProvider>;
    </MyContext.Provider>
  );
};

export default App;
