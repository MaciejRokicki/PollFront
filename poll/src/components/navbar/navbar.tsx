import { useNavigate } from 'react-router-dom';
import Button from '../button/button';
import styles from './navbar.module.scss';
import { NavbarData } from './navbarData';
import { useState } from 'react';
import clsx from 'clsx';
import CloseIcon from '../svg/closeIcon/closeIcon';
import HamburgerIcon from '../svg/hamburegerIcon/haburgerIcon';

const NavBar: React.FC = ({}) => {
    const [sidebar, setSidebar] = useState(false);
    let navigate = useNavigate();

    const toggleSidebar = () => setSidebar(!sidebar);

    const navigateHandler = (path: string) => {
        navigate(path);
        toggleSidebar();
    }

    return (
        <div>
            <div className={styles["container"]}>
                {NavbarData.map((item, index) => {
                    return (
                        <Button key={index} className={styles["navItem"]} onClick={() => navigateHandler(item.path)} variant={item.variant}>{item.name}</Button>
                    )
                })}
            </div>
            <div className={clsx(styles["sidebarBackdrop"], sidebar ? styles["sidebarBackdropShow"] : "")} onClick={toggleSidebar}></div>
            <div className={styles["mobileContainer"]}>
                <HamburgerIcon className={styles["sidebarIcon"]} onClick={toggleSidebar}/>
                <div className={clsx(styles["sidebar"], sidebar ? styles["sidebarOpen"] : styles["sidebarClose"])}>
                    <div className={styles["sidebarTopbar"]}>
                        <div className={styles["sidebarTitle"]}>
                            Poll
                        </div>
                        <CloseIcon className={styles["sidebarIcon"]} onClick={toggleSidebar}/>
                    </div>
                    <div className={styles["sidebarMenu"]}>
                        {NavbarData.map((item, index) => {
                            return (
                                <Button key={index} className={styles["navItem"]} onClick={() => navigateHandler(item.path)} variant={item.variant}>{item.name}</Button>
                            )
                        })}
                    </div>         
                </div>
            </div>
        </div>
    )
}

export default NavBar;