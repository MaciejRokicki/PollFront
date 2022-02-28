import { NavbarItem } from "./INavbarItem";

export const NavbarData: NavbarItem[] = [
    {
        name: "Stwórz ankietę",
        path: "/",
        variant: "white"
    },
    {
        name: "Zaloguj się",
        path: "/signIn"
    },
    {
        name: "Zarejestruj się",
        path: "/signUp"
    },
]

export const SignedNavbarData: NavbarItem[] = [
    ...NavbarData,
    {
        name: "Wyloguj się",
        path: "/signout"
    }
]