import clsx from "clsx";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { PollCreateModel } from "../../../entities/poll/create/IPollCreateModel";
import Button from "../../button/Button";
import styles from "./EditPollForm.module.scss"

interface Props {
    pollCreateModel: PollCreateModel
}

const EditPollForm: React.FC<Props> = (props) => {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollCreateModel>({
        defaultValues: props.pollCreateModel
    });

    const { fields, append } = useFieldArray({
        control,
        name: "options"
    });

    const createPoll = (pollCreateModel: PollCreateModel) => {
        console.log(pollCreateModel)
    }

    const savePoll = (pollCreateModel: PollCreateModel) => {
        console.log(pollCreateModel);
    }

    const optionsWatcher = watch("options");

    useEffect(() => {
        if(optionsWatcher[optionsWatcher.length - 1].option !== "") {
            append({}, {shouldFocus: false});
        }
    })

    return (
        <form onSubmit={handleSubmit(savePoll)}>
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
            <Button type="button" className={styles.saveButton} variant="darkRed" onClick={handleSubmit(createPoll)}>Stwórz</Button>
            <Button type="submit" className={styles.saveButton} variant="darkRed">Zapisz</Button>
        </form>
    );
}

export default EditPollForm;
