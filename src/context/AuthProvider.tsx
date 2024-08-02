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
  loading: boolean; // Estado de carga
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
  const [loading, setLoading] = useState(true); // Estado de carga

  const login = useCallback(
    (jwt: string) => {
      localStorage.setItem("jwt", jwt);
      stateLogin();
    },
    [stateLogin]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    stateLogout();
  }, [stateLogout]);

  useEffect(() => {
    const checkJWT = () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const decoded: Decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            stateLogout();
            return;
          }
          login(token);
        } catch (error) {
          stateLogout();
        } finally {
          setLoading(false); // Termina la carga
        }
        return
      }
      stateLogout();
      setLoading(false); // Termina la carga
      return;
    }
    checkJWT();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // O cualquier componente de carga que desees
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
