import { createContext, ReactNode, useState } from "react";

interface IAuthContext {
  signIn: (email: string, password: string) => void,
  signOut: () => void,
  isAuthenticated?: boolean
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<IAuthContext>({
  signIn: () => {},
  signOut: () => {},
  isAuthenticated: undefined
})

const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const signIn = (email: string, password: string) => {
    setIsAuthenticated(true);
  }

  const signOut = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{signIn, signOut, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;