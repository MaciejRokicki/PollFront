import { useForm } from "react-hook-form";
import Button from "../../components/button/button";
import styles from "./signUp.module.scss";

interface SignUpData {
    email: string,
    password: string,
    confirmPassword: string
}

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const handleSignIn = (data: SignUpData) => {
        console.log(data);
    }

    return (
        <div className={styles["content"]}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles["sign-up-form"]}>
                <label htmlFor="femail" 
                       className={styles["label-sign-up"]}>
                    Adres email
                </label>
                <input id="femail" 
                       type="text" 
                       className={styles["input-sign-up"]} 
                       {...register("email", { required: {
                           value: true, 
                           message: "Te pole jest wymagane."
                        }, pattern: { 
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                           message: "Nieprawidłowy format adresu email." 
                           }})} />
                {errors.email && <div>{errors.email.message}</div>}
                <label htmlFor="fpassword" 
                       className={styles["label-sign-up"]}>
                    Hasło
                </label>
                <input id="fpassword" 
                       type="password" 
                       className={styles["input-sign-up"]} 
                       {...register("password", { required: true, minLength: 6 })} />
                <label htmlFor="fconfirmPassword" 
                       className={styles["label-sign-up"]}>
                    Powtórz hasło
                </label>
                <input id="fconfirmPassword" 
                       type="password" 
                       className={styles["input-sign-up"]} 
                       {...register("confirmPassword", { required: true, minLength: 6 })} />
                <Button type="submit" className={styles["btn-sign-up"]} variant="brown">Zaloguj się</Button>
            </form>
        </div>
    );
}

export default SignUp;