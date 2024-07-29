import {
  createContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import useStore from "../zustand/Zustand";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isAuth: boolean;
  login: (jwt: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {

  const { isAuth, login: stateLogin, logout: stateLogout } = useStore();
  const navigate = useNavigate();


  const login = useCallback(
    (jwt: string) => {
      localStorage.setItem("jwt", jwt);
      stateLogin();
    },
    [stateLogin]
  );

  const logout = () => {
    localStorage.removeItem("jwt");
    stateLogout();
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      login(jwt);
      navigate("/home");

    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
