import {
  createContext,
  ReactNode,
  useEffect,
  useCallback,
  useState,
} from "react";
import useStore from "../zustand/Zustand";
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  isAuth: boolean;
  login: (jwt: string) => void;
  logout: () => void;
  loading: boolean;
  jwt: string;
}

interface Decoded {
  id: number;
  name: string;
  type: string;
  exp: number;
  iat: number;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isAuth, login: stateLogin, logout: stateLogout } = useStore();
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useState<string>("");

  const login = useCallback(
    (jwt: string) => {
      localStorage.setItem("jwt", jwt);
      setJwt(jwt);
      stateLogin();
    },
    [stateLogin]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    setJwt("");
    stateLogout();
  }, [stateLogout]);

  useEffect(() => {
    const checkJWT = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const decoded: Decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            setJwt("");
            stateLogout();
            return;
          }
          login(token);
        } catch (error) {
          stateLogout();
          setJwt("");
        } finally {
          setLoading(false);
        }
        return
      }
      setJwt("");
      stateLogout();
      setLoading(false);
      return;
    }
    checkJWT();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // O cualquier componente de carga que desees
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading, jwt }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
