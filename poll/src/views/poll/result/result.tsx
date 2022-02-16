import moment from "moment";
import { useFieldArray, useForm } from "react-hook-form";
import { PollModel } from "../../../entities/poll/IPollModel";
import styles from "./result.module.scss";

const PollResult = () => {
    
    const { control, getValues } = useForm<PollModel>({
        defaultValues: {
            id: 1,
            isDraft: false,
            created: moment().format("DD.MM.YYYY"),
            endDate: moment().format("DD.MM.YYYY"),
            question: "Pytanie - TESTsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            totalVotes: 47,
            options: [
                { id: 1, option: "Opcja 1", votes: 2 },
                { id: 2, option: "Opcja 2", votes: 5 },
                { id: 3, option: "Opcja 3", votes: 7 },
                { id: 4, option: "Opcja 4", votes: 1 },
                { id: 5, option: "Opcja 5", votes: 0 },
                { id: 6, option: "Opcja 6", votes: 10 },
                { id: 7, option: "Opcja 7", votes: 22 },
            ]
        }
    })

    const { fields } = useFieldArray({
        control,
        name: "options"
    })

    const getVotePercent = (votes?: number): number => votes === undefined ? 0 : Math.round((votes / Number(getValues("totalVotes"))) * 100);

    return (
        <div className={styles.container}>
            <form className={styles.pollForm}>
                <div className={styles.questionHeader}>
                    {getValues("question")}
                </div>
                {fields.map((option, _) => {
                    const votePercent: number = getVotePercent(option.votes);

                    return (
                        <div key={option.id} className={styles.pollOptionResultContainer} >
                            <div className={styles.pollOptionResultBackground}>
                                <div className={styles.pollOptionResultLabel}>
                                    <div>
                                        {option.option}
                                    </div> 
                                    <div>
                                        {votePercent}%
                                    </div>
                                </div>
                            </div>
                            <div style={{width: `${votePercent}%`}} className={styles.pollOptionResultFillBackground}></div>   
                        </div>       
                    )
                })}
                <div className={styles.totalVotesLabel}>
                    Oddane głosy: {getValues("totalVotes")}
                </div>
            </form>
        </div>
    )
}

export default PollResult;