import { createContext, ReactNode, useState, useEffect } from "react";

// Create context that validates if user is authenticated with a JWT

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (jwt: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (jwt: string) => {
        localStorage.setItem("jwt", jwt);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
