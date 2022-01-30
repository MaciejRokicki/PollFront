import Button, { ButtonVariant } from '../button/button';
import './topbar.scss';

const TopBar = () => {
    return (
        <div className="container">
            <Button name="Stwórz ankietę" variant={ButtonVariant.WHITE}/>
            <Button name="Zaloguj się"/>
            <Button name="Zarejestruj się"/>
        </div>
    )
}

export default TopBar;