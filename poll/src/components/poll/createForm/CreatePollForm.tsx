import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { apiUrl } from "../../../api";
import { AuthContext } from "../../../contexts/auth.context";
import { PollCreateModel } from "../../../entities/poll/create/PollCreateModel";
import { PollModel } from "../../../entities/poll/PollModel";
import { PollOptionModel } from "../../../entities/poll/PollOptionModel";
import http from "../../../utils/Http";
import { ResponseExceptions } from "../../../utils/ResponseExceptions";
import Button from "../../button/Button";
import styles from "./CreatePollForm.module.scss"

const CreatePollForm: React.FC = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [responseErrors, setResponseErrors] = useState<string>("");

    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PollCreateModel>({
        defaultValues: {
            question: "",
            isDraft: false,
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

    const createPoll = async (pollCreateModel: PollCreateModel) => {
        const pollOptions: PollOptionModel[] = [];

        pollCreateModel.options.forEach((val, _) => {
            pollOptions.push({id: 0, option: val.option});
        })

        pollOptions.pop()

        pollCreateModel.options = pollOptions;

        try {
            const response = await http.post(`${apiUrl}/Poll/Create`, { model: pollCreateModel }, token);

            if(response) {
                navigate(`/Poll/${(response as PollModel).id}`);
            }
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
        <form onSubmit={handleSubmit(createPoll)}>
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
            <Button type="submit" className={styles.saveButton} variant="darkRed">Stwórz</Button>
        </form>
    );
}

export default CreatePollForm;
