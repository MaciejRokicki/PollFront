import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './button.module.scss';

export type ButtonVariant = "transparent" | "white" | "brown";

interface IButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: ButtonVariant;
}

const Button: React.FC<IButton> = ({
    className,
    variant = "transparent",
    children,
    ...rest
    }) => {
        return(
            <button className={clsx(styles["btn"], className, styles[variant])} {...rest}>{children}</button>
        );
    }
    
export default Button;