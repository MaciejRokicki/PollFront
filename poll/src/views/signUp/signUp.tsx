import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signUp.module.scss";
import { useAuth } from "../../contexts/auth.context";

interface SignUpData {
    email: string,
    password: string,
    confirmPassword: string
}

const SignUp = () => {
    const schema = yup.object().shape({
        email: yup.string().email("Nieprawidłowy format adresu email.").required("Musisz podać adres email."),
        password: yup.string().min(6, "Hasło musi składać się z przynajmniej 6 znaków.").required("Musisz podac hasło."),
        confirmPassword: yup.string().required("Musisz potwierdzić hasło.").oneOf([yup.ref("password")], "Podane hasła różnią się od siebie."),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(schema),
    })

    const {dispatch} = useAuth();

    const handleSignIn = (data: SignUpData) => {
        console.log(data);
        dispatch({type: "signUp"});
    }

    return (
        <main className={styles.main}>
            <section className={styles.signUpBlock}>
                <h2 className={styles.signUpTitle}>Zarejestruj się</h2>
                <form onSubmit={handleSubmit(handleSignIn)} className={styles.signUpForm}>
                    {(errors.email || errors.password || errors.confirmPassword) &&
                        <ul className={styles.error}>
                            {errors.email && <li className={styles.errorLabel}>{errors.email.message}</li>}
                            {errors.password && <li className={styles.errorLabel}>{errors.password.message}</li>}
                            {errors.confirmPassword && <li className={styles.errorLabel}>{errors.confirmPassword.message}</li>}
                        </ul>
                    }
                    <label htmlFor="femail" 
                        className={styles.labelSignUp}>
                        Adres email
                    </label>
                    <input id="femail" 
                        type="text" 
                        className={styles.inputSignUp} 
                        {...register("email")} />
                    <label htmlFor="fpassword" 
                        className={styles.labelSignUp}>
                        Hasło
                    </label>
                    <input id="fpassword" 
                        type="password" 
                        className={styles.inputSignUp} 
                        {...register("password")} />
                    <label htmlFor="fconfirmPassword" 
                        className={styles.labelSignUp}>
                        Powtórz hasło
                    </label>
                    <input id="fconfirmPassword" 
                        type="password" 
                        className={styles.inputSignUp}
                        {...register("confirmPassword")} />
                    <Button type="submit" className={styles.btnSignUp} variant="brown">Zarejestruj się</Button>
                </form>
            </section>
        </main>
    );
}

export default SignUp;