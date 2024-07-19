
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { jwtDecode } from "jwt-decode";
import Seller from "../pages/Seller";
import RegisterSeller  from "../pages/RegisterSeller";
import RegisterUser from "../pages/RegisterUser";
import User from "../pages/User";

const router = createBrowserRouter([
  {
    path: "/login",    
    element: <LoginPage />,
    loader: () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded, "< decoded");
                return redirect("/seller");
            } catch (err) {
                console.log(err, "< error dari jwt decode");
                return null;
            }
        } else {
            return null;
        }
    },
  },
  {
    path: "/seller",
    element: <Seller />,
    loader: () => {
        const token = localStorage.getItem("access_token");
        // const redirectUrl =
        //     "/login/seller?errorMsg=You must be logged in to access the page";
        const redirectUrl = "/login";
        if (!token) {
            sessionStorage.setItem(
                "errorMsg",
                "You must be logged in to access the page"
            );
            return redirect(redirectUrl);
        } else {
            try {
                const decoded = jwtDecode(token);
                console.log(decoded, "< decoded");
                return null;
            } catch (err) {
                console.log(err, "< error dari jwt decode");
                sessionStorage.setItem(
                    "errorMsg",
                    "You must be logged in to access the page"
                );
                return redirect(redirectUrl);
            }
        }
    },
  },
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/register/seller",
    element: <RegisterSeller />,
    loader: () => {
        const token = localStorage.getItem("access_token");
        // const redirectUrl =
        //     "/login/seller?errorMsg=You must be logged in to access the page";
       if(token){
        return redirect("/seller")
       }else{
        return null
       }
    },
  },
  {
    path: "/register/user",
    element: <RegisterUser />,
    loader: () => {
        const token = localStorage.getItem("access_token");
        // const redirectUrl =
        //     "/login/seller?errorMsg=You must be logged in to access the page";
       if(token){
        return redirect("/user")
       }else{
        return null
       }
    },
  },
]);

export default router;
