import * as React from "react";

type Action = {type: "signIn"} | {type: "signUp"} | {type: "signOut"}
type Dispatch = (action: Action) => void
type State = {isAuthenticated: boolean}
type AuthProviderProps = {children: React.ReactNode}

const AuthStateContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

function authReducer(state: State, action: Action) {
    switch (action.type) {
        case "signIn": {
            return {isAuthenticated: true};
        }

        case "signUp": {
            return {isAuthenticated: true};
        }

        case "signOut": {
            return {isAuthenticated: false};
        }
    }
}

function AuthProvider({children}: AuthProviderProps) {
    const [state, dispatch] = React.useReducer(authReducer, {isAuthenticated: false})
    const value = {state, dispatch}
    
    return (
      <AuthStateContext.Provider value={value}>
        {children}
      </AuthStateContext.Provider>
    )
  }

  function useAuth() {
    const context = React.useContext(AuthStateContext)

    if (context === undefined) {
      throw new Error('useCount must be used within a CountProvider')
    }

    return context
  }

export {AuthProvider, useAuth}