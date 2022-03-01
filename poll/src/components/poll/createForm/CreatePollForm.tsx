import clsx from "clsx";
import moment from "moment";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { PollCreateModel } from "../../../entities/poll/create/IPollCreateModel";
import { PollModel } from "../../../entities/poll/IPollModel";
import { PollOption } from "../../../entities/poll/IPollOption";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { add } from "../../../redux/poll.slice";
import Button from "../../button/Button";
import styles from "./CreatePollForm.module.scss"

const CreatePollForm: React.FC = ({}) => {
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

    const polls = useAppSelector((state) => state.poll.value);
    const dispatch = useAppDispatch();

    const createPoll = (pollCreateModel: PollCreateModel) => {
        const pollOptions: PollOption[] = [];

        pollCreateModel.options.forEach((val, index) => {
            pollOptions.push({id: index, option: val.option});
        })

        const pollModel: PollModel = {
            id: 1,
            created: moment().toISOString(),
            endDate: moment().toISOString(),
            isDraft: false,
            question: pollCreateModel.question,
            options: pollOptions,
            totalVotes: 0
        }

        dispatch(add(pollModel));
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

export default CreatePollForm;
