import clsx from "clsx";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../../api";
import { AuthContext } from "../../../contexts/auth.context";
import { EndPollEnum } from "../../../entities/poll/EndPollEnum";
import { PollModel } from "../../../entities/poll/PollModel";
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
    
    const getEndDateOption = (created: string, end?: string): EndPollEnum => {
        if(end === undefined) {
            return EndPollEnum.NoTime;
        }

        let diff = moment(end).diff(moment(created)) / 1000 / 60;

        switch(diff) {
            case 10:
                return EndPollEnum.min10;

            case 30:
                return EndPollEnum.min30;

            case 60:
                return EndPollEnum.h1;

            case 6 * 60:
                return EndPollEnum.h6;

            case 12 * 60:
                return EndPollEnum.h12;

            case 24 * 60:
                return EndPollEnum.d1;

            default:
                return EndPollEnum.NoTime;
        }
    }

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollUpdateModel>({
        defaultValues: {
            model: {
                id: props.poll.id,
                question: props.poll.question,
                isDraft: true,
                options: props.poll.options as PollOptionUpdateModel[]
            },
            endOption: getEndDateOption(props.poll.created, props.poll.end)
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "model.options"
    });

    const createPoll = async (pollUpdateModel: PollUpdateModel) => {
        await http.put(`${apiUrl}/Poll/SetActive`, { pollId: pollUpdateModel.model.id }, token)
        .then(() => {
            navigate("/MyPolls");
        })
        .catch((err: Promise<string>) => {
            err.then((exception: string) => setResponseErrors(ResponseExceptions.TranslateException(exception)));
        });
    }

    const savePoll = async (pollUpdateModel: PollUpdateModel) => {
        let tmp: PollUpdateModel = { 
            model: { 
                ...pollUpdateModel.model 
            }, 
            endOption: pollUpdateModel.endOption 
        };

        tmp.model.options = pollUpdateModel.model.options.slice(0, pollUpdateModel.model.options.length-1);

        await http.put(`${apiUrl}/Poll/Update`, { model: tmp.model, endOption: tmp.endOption }, token)
        .then(() => {
            navigate("/MyPolls");
        })
        .catch((err: Promise<string>) => {
            err.then((exception: string) => setResponseErrors(ResponseExceptions.TranslateException(exception)));
        });
    }

    const optionsWatcher = watch("model.options");

    useEffect(() => {
        if(!props.poll.isDraft) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if(optionsWatcher[optionsWatcher.length - 1].option !== "") {
            append({}, {shouldFocus: false});
        }
    })

    return (
        <form onSubmit={handleSubmit(savePoll)}>
            {errors.model?.question && (
                <div className={styles.errorLabel}>Musisz podać podać treść pytania.</div>
            )}
            {responseErrors && (
                <div className={styles.errorLabel}>{responseErrors}</div>
            )}
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
            <Button type="button" className={styles.saveButton} variant="darkRed" onClick={handleSubmit(createPoll)}>Aktywuj ankietę bez zapisywania</Button>
            <Button type="submit" className={styles.saveButton} variant="darkRed">Zapisz jako wersja robocza</Button>
        </form>
    );
}

export default EditPollForm;
