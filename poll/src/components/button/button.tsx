import './button.scss';

export enum ButtonVariant {
    TRANSPARENT = "transparent",
    WHITE = "white"
}

interface IButton {
    name: string;
    variant?: ButtonVariant;
}

const Button: React.FC<IButton> = ({
    name,
    variant = ButtonVariant.TRANSPARENT
    }) => (
        <div>
            <a className={"btn " + variant}>{name}</a>
        </div>
    )
    
export default Button;