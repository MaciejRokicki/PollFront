import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import styles from './Navbar.module.scss';
import { NavbarData, SignedNavbarData } from './NavbarData';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import CloseIcon from '../icons/closeIcon/CloseIcon';
import HamburgerIcon from '../icons/hamburegerIcon/HamburgerIcon';
import { AuthContext } from '../../contexts/auth.context';
import { NavbarItem } from './INavbarItem';

const NavBar: React.FC = ({}) => {
    const [sidebar, setSidebar] = useState(false);
    let navigate = useNavigate();

    const toggleSidebar = () => setSidebar(!sidebar);

    const navigateHandler = (path: string) => {
        navigate(path);
        setSidebar(false);
    }

    window.addEventListener("resize", () => {
        if(sidebar && window.innerWidth > 600) {
            setSidebar(false);
        }
    })

    const authContext = useContext(AuthContext);

    const navbarData: NavbarItem[] = authContext.isAuthenticated ? SignedNavbarData : NavbarData;

    return (
        <div className={styles.navbar}>
            <div className={styles.container}>
                {navbarData.map((item, index) => 
                    <Button key={index} className={styles.navItem} onClick={() => navigateHandler(item.path)} variant={item.variant}>{item.name}</Button>
                )}
            </div>
            <div className={clsx(styles.sidebarBackdrop, sidebar ? styles.sidebarBackdropShow : "")} onClick={toggleSidebar}></div>
            <div className={styles.mobileContainer}>
                <HamburgerIcon className={styles.sidebarIcon} onClick={toggleSidebar}/>
                <div className={clsx(styles.sidebar, sidebar ? styles.sidebarOpen : styles.sidebarClose)}>
                    <div className={styles.sidebarTopbar}>
                        <div className={styles.sidebarTitle}>
                            Poll
                        </div>
                        <CloseIcon className={styles.sidebarIcon} onClick={toggleSidebar}/>
                    </div>
                    <div className={styles.sidebarMenu}>
                        {navbarData.map((item, index) => 
                            <Button key={index} className={styles.navItem} onClick={() => navigateHandler(item.path)} variant={item.variant}>{item.name}</Button>
                        )}
                    </div>         
                </div>
            </div>
        </div>
    )
}

export default NavBar;