import { NavbarItem } from "./INavbarItem";

export const NavbarData: NavbarItem[] = [
    {
        name: "Stwórz ankietę",
        path: "/",
        variant: "white"
    },
    {
        name: "Moje ankiety",
        path: "MyPolls",
        signRequired: true,
    },
    {
        name: "Zaloguj się",
        path: "/signIn",
        hideAfterSigned: true,
    },
    {
        name: "Zarejestruj się",
        path: "/signUp",
        hideAfterSigned: true,
    },
    {
        name: "Wyloguj się",
        path: "/signout",
        signRequired: true
    }
]