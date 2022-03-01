import { AuthContext } from "../../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import styles from "./signOut.module.scss";

const SignOut = () => {
    const {signOut} = useContext(AuthContext);
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        if(!timer) {
            signOut();
            return;
        }

        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [timer]);

    return (
        <main className={styles.main}>
            <div className={styles.signoutInfo}>
                Zostaniesz wylogowany za <b>{timer}</b>.
            </div>
        </main>
    );
}

export default SignOut;