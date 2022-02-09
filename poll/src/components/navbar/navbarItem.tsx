import { ButtonVariant } from "../button/button";

export interface NavbarItem {
    name: string;
    path: string;
    variant?: ButtonVariant;
}