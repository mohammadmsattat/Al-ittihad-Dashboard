import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useLogInMutation } from "../../../rtk/AuthApi/authApi";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logIn, { isLoading, error, data }] = useLogInMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await logIn({ email, password }).unwrap();
      
      if (response && response.token) {
        // Save the JWT token to cookies
        Cookies.set("Token", response.token, { expires: 7 });

        console.log("Login successful and JWT token saved to cookies!");
      }
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Login failed:", err);
      return null;
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading,
    error,
    data,
  };
};

export default useLogin;
