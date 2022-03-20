import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signUp.module.scss";
import http from "../../utils/Http";
import { SignUpRequest } from "../../entities/authentication/SignUpRequest";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ResponseExceptions } from "../../utils/ResponseExceptions";
import { apiUrl } from "../../api";

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

    const [responseErrors, setResponseErrors] = useState<string>("");
    const [successfulSignUpMsg, setSuccessfulSignUpMsg] = useState<boolean>(false);

    const handleSignUp = async (data: SignUpData) => {
        try {
            await http.post(`${apiUrl}/Authentication/SignUp`, { email: data.email, password: data.password } as SignUpRequest);
            setSuccessfulSignUpMsg(true)
        } catch(exception) {
            setResponseErrors(ResponseExceptions.TranslateException(await exception as string))
        }
    }

    return (
        <main className={styles.main}>
            <section className={styles.signUpBlock}>
                <h2 className={styles.signUpTitle}>Zarejestruj się</h2>
                <form onSubmit={handleSubmit(handleSignUp)} className={styles.signUpForm}>
                    {(successfulSignUpMsg) &&
                        <ul className={styles.error}>
                            <li>Twoje konto zostało założone, możesz się teraz <Link to={"/SignIn"}>zalogować.</Link></li>
                        </ul>
                    }
                    {(errors.email || errors.password || errors.confirmPassword || responseErrors) &&
                        <ul className={styles.error}>
                            {errors.email && <li className={styles.errorLabel}>{errors.email.message}</li>}
                            {errors.password && <li className={styles.errorLabel}>{errors.password.message}</li>}
                            {errors.confirmPassword && <li className={styles.errorLabel}>{errors.confirmPassword.message}</li>}
                            {responseErrors && <li className={styles.errorLabel}>{responseErrors}</li>}
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