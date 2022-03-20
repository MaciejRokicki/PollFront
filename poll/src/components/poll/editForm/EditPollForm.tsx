import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../api";
import { AuthContext } from "../../../contexts/auth.context";
import { PollModel } from "../../../entities/poll/PollModel";
import { PollOptionModel } from "../../../entities/poll/PollOptionModel";
import http from "../../../utils/Http";
import { ResponseExceptions } from "../../../utils/ResponseExceptions";
import Button from "../../button/Button";
import styles from "./EditPollForm.module.scss"

interface Props {
    poll: PollModel
}

const EditPollForm: React.FC<Props> = (props) => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [responseErrors, setResponseErrors] = useState<string>("");
    
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollModel>({
        defaultValues: props.poll
    });

    const { fields, append } = useFieldArray({
        control,
        name: "options"
    });

    const createPoll = async (pollModel: PollModel) => {
        try {
            pollModel.options.pop();
            await http.put(`${apiUrl}/Poll/SetActive`, { pollId: pollModel.id }, token);

            navigate("/MyPolls");
        } catch (exception) {
            setResponseErrors(ResponseExceptions.TranslateException(await exception as string))
        }
    }

    const savePoll = async (pollModel: PollModel) => {
        try {
            pollModel.options.pop();
            await http.put(`${apiUrl}/Poll/Update`, { model: pollModel }, token);

            navigate("/MyPolls");
        } catch (exception) {
            setResponseErrors(ResponseExceptions.TranslateException(await exception as string))
        }
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
            {responseErrors && <div className={styles.errorLabel}>{responseErrors}</div>}
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
