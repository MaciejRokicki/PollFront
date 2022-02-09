import { useForm } from "react-hook-form";
import Button from "../../components/button/button";
import styles from "./signIn.module.scss";

interface SignInData {
    email: string,
    password: string
}

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInData>({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSignIn = (data: SignInData) => {
        console.log(data);
    }

    return (
        <div className={styles["content"]}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles["signInForm"]}>
                <label htmlFor="femail" className={styles["labelSignIn"]}>Adres email</label>
                <input id="femail" type="text" className={styles["inputSignIn"]} {...register("email", { required: true})} />
                <label htmlFor="fpassword" className={styles["labelSignIn"]}>Hasło</label>
                <input id="fpassword" type="password" className={styles["inputSignIn"]} {...register("password", { required: true})} />
                <Button type="submit" className={styles["btnSignIn"]} variant="brown">Zaloguj się</Button>
            </form>
        </div>
    );
}

export default SignIn;