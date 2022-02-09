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
            <form onSubmit={handleSubmit(handleSignIn)} className={styles["signUpForm"]}>
                <label htmlFor="femail" 
                       className={styles["labelSignUp"]}>
                    Adres email
                </label>
                <input id="femail" 
                       type="text" 
                       className={styles["inputSignUp"]} 
                       {...register("email", { required: {
                           value: true, 
                           message: "Te pole jest wymagane."
                        }, pattern: { 
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                           message: "Nieprawidłowy format adresu email." 
                           }})} />
                {errors.email && <div>{errors.email.message}</div>}
                <label htmlFor="fpassword" 
                       className={styles["labelSignUp"]}>
                    Hasło
                </label>
                <input id="fpassword" 
                       type="password" 
                       className={styles["inputSignUp"]} 
                       {...register("password", { required: true, minLength: 6 })} />
                <label htmlFor="fconfirmPassword" 
                       className={styles["labelSignUp"]}>
                    Powtórz hasło
                </label>
                <input id="fconfirmPassword" 
                       type="password" 
                       className={styles["inputSignUp"]} 
                       {...register("confirmPassword", { required: true, minLength: 6 })} />
                <Button type="submit" className={styles["btnSignUp"]} variant="brown">Zaloguj się</Button>
            </form>
        </div>
    );
}

export default SignUp;