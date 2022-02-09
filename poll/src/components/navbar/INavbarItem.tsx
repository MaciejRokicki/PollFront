import { ButtonVariant } from "../button/Button";

export interface NavbarItem {
    name: string;
    path: string;
    variant?: ButtonVariant;
}