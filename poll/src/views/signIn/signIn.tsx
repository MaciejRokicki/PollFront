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
            <form onSubmit={handleSubmit(handleSignIn)} className={styles["sign-in-form"]}>
                <label htmlFor="femail" className={styles["label-sign-in"]}>Adres email</label>
                <input id="femail" type="text" className={styles["input-sign-in"]} {...register("email", { required: true})} />
                <label htmlFor="fpassword" className={styles["label-sign-in"]}>Hasło</label>
                <input id="fpassword" type="password" className={styles["input-sign-in"]} {...register("password", { required: true})} />
                <Button type="submit" className={styles["btn-sign-in"]} variant="brown">Zaloguj się</Button>
            </form>
        </div>
    );
}

export default SignIn;