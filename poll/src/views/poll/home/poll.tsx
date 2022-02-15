import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button/Button";
import PollOption from "../../../components/poll/option/PollOption";
import { PollAnswer } from "../../../entities/poll/IPollAnswer";
import styles from "./poll.module.scss";

interface PollOptionFrontModel {
    id: number;
    option: string;
    isSelected?: boolean;
}

interface PollAnswerFrontModel {
    id: number;
    question: string;
    options: PollOptionFrontModel[];
}

const Poll = () => {
    let { id } = useParams();
    let navigate = useNavigate();

    const { register, control, handleSubmit, getValues } = useForm<PollAnswerFrontModel>({
        defaultValues: {
            id: 1,
            question: "Pytanie - TESTsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            options: [
                { id: 1, option: "Opcja 1", isSelected: false },
                { id: 2, option: "Opcja 2", isSelected: false },
                { id: 3, option: "Opcja 3ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss", isSelected: false },
                { id: 4, option: "Opcja 4", isSelected: false },
                { id: 5, option: "Opcja 5", isSelected: false },
                { id: 6, option: "Opcja 5", isSelected: false },
                { id: 7, option: "Opcja 5", isSelected: false },
                { id: 8, option: "Opcja 5", isSelected: false },
                { id: 9, option: "Opcja 5", isSelected: false },
                { id: 10, option: "Opcja 5", isSelected: false },
                { id: 11, option: "Opcja 5", isSelected: false },
                { id: 12, option: "Opcja 5", isSelected: false }
            ]
        }
    })

    const { fields } = useFieldArray({
        control,
        name: "options"
    })

    const vote = (pollAnswerFrontModel: PollAnswerFrontModel) => {
        let pollAnswer: PollAnswer = {
            pollId: pollAnswerFrontModel.id,
            optionIds: [],
        };

        pollAnswerFrontModel.options.forEach((pollOption: PollOptionFrontModel) => {
            if(pollOption.isSelected) {
                pollAnswer.optionIds.push(pollOption.id);
            }
        });

        console.log(pollAnswer);

        navigate(`/poll/${id}/result`);
    }

    return (
        <div className={styles.container}>
            <form className={styles.pollForm} onSubmit={handleSubmit(vote)}>
                <div className={styles.questionHeader}>
                    {getValues("question")}
                </div>
                {fields.map((option, index) => (
                    <PollOption 
                        key={option.id}
                        {...register(`options.${index}.isSelected`)}>
                            {getValues(`options.${index}.option`)}
                    </PollOption>
                ))}
                <Button className={styles.sendButton}>Oddaj głos</Button>
            </form>
        </div>
    )
}

export default Poll;