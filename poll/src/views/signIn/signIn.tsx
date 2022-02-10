import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signIn.module.scss";

interface SignInData {
    email: string,
    password: string
}

const SignIn = () => {
    const schema = yup.object().shape({
        email: yup.string().email("Nieprawidłowy format adresu email.").required("Musisz podać adres email."),
        password: yup.string().min(6, "Hasło musi składać się z przynajmniej 6 znaków.").required("Musisz podac hasło."),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<SignInData>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema),
    })

    const handleSignIn = (data: SignInData) => {
        console.log(data);
    }

    return (
        <main>
            <section className={styles.signInBlock}>
                <h2 className={styles.signInTitle}>Zaloguj się</h2>
                <form onSubmit={handleSubmit(handleSignIn)} className={styles.signInForm}>
                    {(errors.email || errors.password) &&
                        <ul className={styles.error}>
                            {errors.email && <li className={styles.errorLabel}>{errors.email.message}</li>}
                            {errors.password && <li className={styles.errorLabel}>{errors.password.message}</li>}
                        </ul>
                    }
                    <label htmlFor="femail" className={styles.label}>Adres email</label>
                    <input id="femail" type="text" className={styles.inputSignIn} {...register("email")} />
                    <label htmlFor="fpassword" className={styles.label}>Hasło</label>
                    <input id="fpassword" type="password" className={styles.inputSignIn} {...register("password")} />
                    <Button type="submit" className={styles.btnSignIn} variant="brown">Zaloguj się</Button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;