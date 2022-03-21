import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signIn.module.scss";
import { AuthContext } from "../../contexts/auth.context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { ResponseExceptions } from "../../utils/ResponseExceptions";
import Loader from "../../components/loader/Loader";

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

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [responseErrors, setResponseErrors] = useState<string>("");
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const handleSignIn = async (data: SignInData) => {
        try {
            setShowSpinner(true);
            await signIn(data.email, data.password);
            navigate("/MyPolls");
        } 
        catch (exception) {
            setResponseErrors(ResponseExceptions.TranslateException(await exception as string))
        }

        setShowSpinner(false);
    }

    return (
        <main className={styles.main}>
            {!showSpinner ? (
                <section className={styles.signInBlock}>
                    <h2 className={styles.signInTitle}>Zaloguj się</h2>
                    <form onSubmit={handleSubmit(handleSignIn)} className={styles.signInForm}>
                        {(errors.email || errors.password || responseErrors) &&
                            <ul className={styles.error}>
                                {errors.email && <li className={styles.errorLabel}>{errors.email.message}</li>}
                                {errors.password && <li className={styles.errorLabel}>{errors.password.message}</li>}
                                {responseErrors && <li className={styles.errorLabel}>{responseErrors}</li>}
                            </ul>
                        }
                        <label htmlFor="femail" className={styles.label}>Adres email</label>
                        <input id="femail" type="text" className={styles.inputSignIn} {...register("email")} />
                        <label htmlFor="fpassword" className={styles.label}>Hasło</label>
                        <input id="fpassword" type="password" className={styles.inputSignIn} {...register("password")} />
                        <Button type="submit" className={styles.btnSignIn} variant="brown">Zaloguj się</Button>
                    </form>
                </section>
            ) : (
                <Loader/>
            )}
        </main>
    );
}

export default SignIn;