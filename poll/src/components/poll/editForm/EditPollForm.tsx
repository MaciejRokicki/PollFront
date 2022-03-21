import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../api";
import { AuthContext } from "../../../contexts/auth.context";
import { EndPollEnum } from "../../../entities/poll/EndPollEnum";
import { PollModel } from "../../../entities/poll/PollModel";
import { PollOptionModel } from "../../../entities/poll/PollOptionModel";
import { PollOptionUpdateModel } from "../../../entities/poll/update/PollOptionUpdateModel";
import { PollUpdateModel } from "../../../entities/poll/update/PollUpdateModel";
import http from "../../../utils/Http";
import { ResponseExceptions } from "../../../utils/ResponseExceptions";
import Button from "../../button/Button";
import styles from "./EditPollForm.module.scss"

interface Props {
    poll: PollModel
}

const EditPollForm: React.FC<Props> = (props) => {
    const { isAuthenticated, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [responseErrors, setResponseErrors] = useState<string>("");
    
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollUpdateModel>({
        defaultValues: {
            model: {
                id: props.poll.id,
                question: props.poll.question,
                isDraft: true,
                options: props.poll.options as PollOptionUpdateModel[]
            },
            endOption: EndPollEnum.min30
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "model.options"
    });

    const createPoll = async (pollUpdateModel: PollUpdateModel) => {
        try {
            pollUpdateModel.model.options.pop();
            await http.put(`${apiUrl}/Poll/SetActive`, { pollId: pollUpdateModel.model.id }, token);

            navigate("/MyPolls");
        } catch (exception) {
            setResponseErrors(ResponseExceptions.TranslateException(await exception as string))
        }
    }

    const savePoll = async (pollUpdateModel: PollUpdateModel) => {
        try {
            pollUpdateModel.model.options.pop();
            await http.put(`${apiUrl}/Poll/Update`, { model: pollUpdateModel.model, endOption: pollUpdateModel.endOption }, token);

            navigate("/MyPolls");
        } catch (exception) {
            setResponseErrors(ResponseExceptions.TranslateException(await exception as string))
        }
    }

    const optionsWatcher = watch("model.options");

    useEffect(() => {
        if(optionsWatcher[optionsWatcher.length - 1].option !== "") {
            append({}, {shouldFocus: false});
        }
    })

    return (
        <form onSubmit={handleSubmit(savePoll)}>
            {errors.model?.question && <div className={styles.errorLabel}>Musisz podać podać treść pytania.</div>}
            {responseErrors && <div className={styles.errorLabel}>{responseErrors}</div>}
            <input className={clsx(styles.pollInput, styles.questionInput)} 
                   placeholder="Podaj treść pytania" 
                   {...register("model.question", { required: true })} />
            { isAuthenticated && (
                <div className={styles.extraOptionsContainer}>
                    <div className={styles.endSelectContainer}>       
                        <label htmlFor="end">Jak długo ankieta ma być aktywna?</label>
                        <select className={styles.endSelect} {...register("endOption")}>
                            <option value="0">Stale</option>
                            <option value="1">10 minut</option>
                            <option value="2">30 minut</option>
                            <option value="3">1 godzina</option>
                            <option value="4">6 godzin</option>
                            <option value="5">12 godzin</option>
                            <option value="6">1 dzień</option>
                        </select> 
                    </div>
                </div>
            )}
            {fields.map((field, index) => (
                <input className={styles.pollInput}
                    key={field.id}
                    type="text"
                    placeholder="Podaj treść odpowiedzi"
                    {...register(`model.options.${index}.option`)} />
            ))}
            <Button type="button" className={styles.saveButton} variant="darkRed" onClick={handleSubmit(createPoll)}>Stwórz</Button>
            <Button type="submit" className={styles.saveButton} variant="darkRed">Zapisz jako wersja robocza</Button>
        </form>
    );
}

export default EditPollForm;
