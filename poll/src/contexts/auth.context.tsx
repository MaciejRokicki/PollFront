import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../api";
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
	const navigate = useNavigate();

	const fetch = window.fetch;
	window.fetch = (...args) => (async(args) => {
		var response = await fetch(...args);
		
		if(response.status === 401) {
			navigate("/signIn");
		}

		return response;
	})(args);

	const signIn = async (email: string, password: string) => {
		try {
			const response: any = await http.post(`${apiUrl}/Authentication/SignIn`, {email, password} as SignInRequest);

			const signInResponse: SignInResponse = { email: response.email, token: response.token } as SignInResponse;
	
			setToken(signInResponse.token);
			setIsAuthenticated(true);
		} catch {

		}
	}

	const signOut = async () => {
		try {
			await http.post(`${apiUrl}/Authentication/RevokeToken`, {});

			setToken("");
			setIsAuthenticated(false);
		} catch {

		}
	}

	const refreshToken = async () => {
		try {
			const response: any = await http.post(`${apiUrl}/Authentication/RefreshToken`, {});

			setToken(response.token);
			setIsAuthenticated(true);
		} catch {

		}
	}

	useEffect(() => {
		refreshToken();
	}, []);

	return (
		<AuthContext.Provider value={{signIn, signOut, isAuthenticated, token}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider;