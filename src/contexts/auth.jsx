import { message } from "antd";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser));
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  const logoutAuth = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/");
  };

  const loginAuth = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      const loggedUser = response.data.user;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(loggedUser);
      navigate("/period/create");
      message.success("Login realizado com sucesso!");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loginAuth, loading, logoutAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
