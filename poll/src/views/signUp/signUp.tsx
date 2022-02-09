import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./signUp.module.scss";

interface SignUpData {
    email: string,
    password: string,
    confirmPassword: string
}

const SignUp = () => {
    const schema = yup.object().shape({
        email: yup.string().email("Nieprawidłowy format adresu email.").required("Te pole jest wymagane."),
        password: yup.string().min(6).required("Te pole jest wymagane."),
        confirmPassword: yup.string().min(6).required("Te pole jest wymagane."),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpData>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(schema),
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
                       {...register("email")} />
                {errors.email && <div>{errors.email.message}</div>}
                <label htmlFor="fpassword" 
                       className={styles["labelSignUp"]}>
                    Hasło
                </label>
                <input id="fpassword" 
                       type="password" 
                       className={styles["inputSignUp"]} 
                       {...register("password")} />
                <label htmlFor="fconfirmPassword" 
                       className={styles["labelSignUp"]}>
                    Powtórz hasło
                </label>
                <input id="fconfirmPassword" 
                       type="password" 
                       className={styles["inputSignUp"]} 
                       {...register("confirmPassword")} />
                <Button type="submit" className={styles["btnSignUp"]} variant="brown">Zaloguj się</Button>
            </form>
        </div>
    );
}

export default SignUp;