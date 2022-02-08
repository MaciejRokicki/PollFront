import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import styles from './topbar.module.scss';
import closeMenuIcon from '../../assets/icons/close_black_24dp.svg';
import hamburgerMenuIcon from '../../assets/icons/menu_black_24dp.svg';

const TopBar: React.FC = ({}) => {
    let navigate = useNavigate();

    let navItems = [
        <Button key={0} className={styles["nav-item"]} onClick={() => {navigate("/")}}  variant="white">Stwórz ankietę</Button>,
        <Button key={1} className={styles["nav-item"]} onClick={() => {navigate("/signIn")}}>Zaloguj się</Button>,
        <Button key={2} className={styles["nav-item"]} onClick={() => {navigate("/signUp")}}>Zarejestruj się</Button>,
    ]

    let openSidebar = () => {
        let sideBarElement: HTMLElement = document.getElementsByClassName(styles["sidebar"])[0] as HTMLElement;
        let sideBarBackdropElement: HTMLElement = document.getElementsByClassName(styles["sidebar-backdrop"])[0] as HTMLElement;

        sideBarElement.classList.remove(styles["sidebar-close"])
        sideBarElement.classList.add(styles["sidebar-open"]);
        sideBarBackdropElement.classList.add(styles["sidebar-backdrop-show"]);
    }

    let closeSidebar = () => {
        let sideBarElement: HTMLElement = document.getElementsByClassName(styles["sidebar"])[0] as HTMLElement;
        let sideBarBackdropElement: HTMLElement = document.getElementsByClassName(styles["sidebar-backdrop"])[0] as HTMLElement;
        
        sideBarElement.classList.remove(styles["sidebar-open"])
        sideBarElement.classList.add(styles["sidebar-close"]);
        sideBarBackdropElement.classList.remove(styles["sidebar-backdrop-show"]);
    }

    return (
        <div>
            <div className={styles["container"]}>
                {navItems}
            </div>
            <div className={styles["sidebar-backdrop"]} onClick={closeSidebar}></div>
            <div className={styles["mobile-container"]}>
                <Button className={styles["sidebar-icon-hamburger"]} onClick={openSidebar}>
                    <img src={hamburgerMenuIcon}></img>
                </Button>
                <div className={styles["sidebar"]}>
                    <div className={styles["sidebar-topbar"]}>
                        <div className={styles["sidebar-title"]}>
                            Poll
                        </div>
                        <Button className={styles["sidebar-icon-close"]} onClick={closeSidebar}>
                            <img src={closeMenuIcon}></img>
                        </Button>
                    </div>
                    <div className={styles["sidebar-menu"]}>
                        {navItems}
                    </div>         
                </div>
            </div>
        </div>
    )
}

export default TopBar;