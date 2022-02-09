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
        email: yup.string().email("Nieprawidłowy format adresu email.").required("Te pole jest wymagane."),
        password: yup.string().min(6).required("Te pole jest wymagane."),
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
        <div className={styles["content"]}>
            <form onSubmit={handleSubmit(handleSignIn)} className={styles["signInForm"]}>
                {errors.email && <div>{errors.email.message}</div>}
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