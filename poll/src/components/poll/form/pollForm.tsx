import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../../button/button";
import styles from "./pollForm.module.scss"

interface PollData {
    question: string;
    options: {
        value: string
    }[];
}

const PollForm: React.FC = ({}) => {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollData>({
        defaultValues: {
            question: "",
            options: [
                { value: "" }, 
                { value: "" }, 
                { value: "" }
            ]
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "options"
    });

    const createPoll = (data: PollData) => {
        console.log(data)
    }

    const optionsWatcher = watch("options");

    useEffect(() => {
        if(optionsWatcher[optionsWatcher.length - 1].value !== "") {
            append({}, {shouldFocus: false});
        }
    })

    return (
        <form onSubmit={handleSubmit(createPoll)}>
            {errors.question && <div className={styles["errorLabel"]}>Musisz podać podać treść pytania.</div>}
            <input className={styles["pollInput"]} 
                   placeholder="Podaj treść pytania" 
                   {...register("question", { required: true })} />
            {fields.map((field, index) => (
                <input className={styles["pollInput"]}
                    key={field.id}
                    type="text"
                    placeholder="Podaj treść odpowiedzi"
                    {...register(`options.${index}.value`)} />
            ))}
            <Button type="submit" className={styles["saveButton"]} variant="brown">Zapisz</Button>
        </form>
    );
}

export default PollForm;
