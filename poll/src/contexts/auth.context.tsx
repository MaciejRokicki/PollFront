import { createContext, ReactNode, useState } from "react";
import { apiUrl } from "../api";
import { RevokeTokenRequest } from "../entities/authentication/RevokeTokenRequest";
import { SignInRequest } from "../entities/authentication/SignInRequest";
import { SignInResponse } from "../entities/authentication/SignInResponse";
import http from "../utils/Http";

interface IAuthContext {
  signIn: (email: string, password: string) => void,
  signOut: () => void,
  isAuthenticated?: boolean,
  token: string
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<IAuthContext>({
  signIn: () => {},
  signOut: () => {},
  isAuthenticated: undefined,
  token: ""
})

const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [token, setToken] = useState<string>("");

  const signIn = async (email: string, password: string) => {
    const response: any = await http.post(`${apiUrl}/Authentication/SignIn`, {email, password} as SignInRequest);

    if(response?.Error) {
      console.log(response.Error);
    } else {
      const signInResponse: SignInResponse = { email: response.email, token: response.token } as SignInResponse;

      setToken(signInResponse.token);
      setIsAuthenticated(true);
    }
  }

  const signOut = async () => {
    const response: any = await http.post(`${apiUrl}/Authentication/RevokeToken`, {});

    if(response?.Error) {
      console.log(response.Error);
    } else {
      setToken("");
      setIsAuthenticated(false);
    }
  }

  return (
    <AuthContext.Provider value={{signIn, signOut, isAuthenticated, token}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;