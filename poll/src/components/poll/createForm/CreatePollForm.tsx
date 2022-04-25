import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { apiUrl } from "../../../api";
import { AuthContext } from "../../../contexts/auth.context";
import { PollCreateModel } from "../../../entities/poll/create/PollCreateModel";
import { EndPollEnum } from "../../../entities/poll/EndPollEnum";
import { PollModel } from "../../../entities/poll/PollModel";
import { PollOptionModel } from "../../../entities/poll/PollOptionModel";
import http from "../../../utils/Http";
import { ResponseExceptions } from "../../../utils/ResponseExceptions";
import Button from "../../button/Button";
import Loader from "../../loader/Loader";
import styles from "./CreatePollForm.module.scss"

const CreatePollForm: React.FC = () => {
    const { isAuthenticated, token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [responseErrors, setResponseErrors] = useState<string>("");
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollCreateModel>({
        defaultValues: {
            model: {
                question: "",
                isDraft: false,
                options: [
                    { option: "" }, 
                    { option: "" }, 
                    { option: "" }
                ]
            },
            endOption: EndPollEnum.min30
        }
    });

    const { fields, append } = useFieldArray({
        control,
        name: "model.options"
    });

    const createPoll = async (pollCreateModel: PollCreateModel) => {
        setShowSpinner(true);

        let tmp: PollCreateModel = { 
            model: { 
                ...pollCreateModel.model 
            }, 
            endOption: pollCreateModel.endOption 
        };

        tmp.model.options = pollCreateModel.model.options.slice(0, pollCreateModel.model.options.length-1);

        await http.post(`${apiUrl}/Poll/Create`, { model: tmp.model, endOption: tmp.endOption }, token)
        .then((response) => {
            if(isAuthenticated && pollCreateModel.model.isDraft) {
                navigate(`/MyPolls`);
                return;
            }

            setShowSpinner(false);
            navigate(`/Poll/${(response as PollModel).id}`);
        })
        .catch((err: Promise<string>) => {
            err.then((exception: string) => setResponseErrors(ResponseExceptions.TranslateException(exception)));
        });
    }

    const optionsWatcher = watch("model.options");

    useEffect(() => {
        if(optionsWatcher[optionsWatcher.length - 1].option !== "") {
            append({}, {shouldFocus: false});
        }
    })

    return (
        <div className={styles.container}>
            {!showSpinner ? (
                <form className={styles.createForm} onSubmit={handleSubmit(createPoll)}>
                    {errors.model?.question && (
                        <div className={styles.errorLabel}>Musisz podać podać treść pytania.</div>
                    )}
                    {responseErrors && (
                        <div className={styles.errorLabel}>{responseErrors}</div>
                    )}
                    <input className={clsx(styles.pollInput, styles.questionInput)} 
                        placeholder="Podaj treść pytania" 
                        {...register("model.question", { required: true })} />
                        <div className={styles.extraOptionsContainer}>
                        { isAuthenticated && (         
                            <div className={styles.isDraftContainer}>
                                <input 
                                    type="checkbox"
                                    {...register("model.isDraft")} />
                                <label htmlFor="isDraft">Wersja robocza</label>
                            </div>
                        )}
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
                    {fields.map((field, index) => (
                        <input className={styles.pollInput}
                            key={field.id}
                            type="text"
                            placeholder="Podaj treść odpowiedzi"
                            {...register(`model.options.${index}.option`)} />
                    ))}
                    <Button type="submit" className={styles.saveButton} variant="darkRed">Stwórz</Button>
                </form>
            ) : (
                <Loader/>
            )}
        </div>
    );
}

export default CreatePollForm;
