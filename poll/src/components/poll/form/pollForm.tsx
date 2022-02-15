import clsx from "clsx";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { PollCreateModel } from "../../../entities/poll/create/IPollCreateModel";
import Button from "../../button/Button";
import styles from "./PollForm.module.scss"

const PollForm: React.FC = ({}) => {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollCreateModel>({
        defaultValues: {
            question: "",
            options: [
                { option: "" }, 
                { option: "" }, 
                { option: "" }
            ]
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "options"
    });

    const createPoll = (pollCreateModel: PollCreateModel) => {
        console.log(pollCreateModel)
    }

    const optionsWatcher = watch("options");

    useEffect(() => {
        if(optionsWatcher[optionsWatcher.length - 1].option !== "") {
            append({}, {shouldFocus: false});
        }
    })

    return (
        <form onSubmit={handleSubmit(createPoll)}>
            {errors.question && <div className={styles.errorLabel}>Musisz podać podać treść pytania.</div>}
            <input className={clsx(styles.pollInput, styles.questionInput)} 
                   placeholder="Podaj treść pytania" 
                   {...register("question", { required: true })} />
            {fields.map((field, index) => (
                <input className={styles.pollInput}
                    key={field.id}
                    type="text"
                    placeholder="Podaj treść odpowiedzi"
                    {...register(`options.${index}.option`)} />
            ))}
            <Button type="submit" className={styles.saveButton} variant="darkRed">Stwórz</Button>
        </form>
    );
}

export default PollForm;
