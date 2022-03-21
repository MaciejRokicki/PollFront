import moment from "moment";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../../api";
import Loader from "../../../components/loader/Loader";
import { PollModel } from "../../../entities/poll/PollModel";
import http from "../../../utils/Http";
import styles from "./result.module.scss";

const PollResult = () => {
    let { id } = useParams();
    const [poll, setPoll] = useState<PollModel>();
    const { control, getValues, reset } = useForm<PollModel>()

    const { fields } = useFieldArray({
        control,
        name: "options"
    })

    useEffect(() => {
        const getPoll = async (id: string) => {
            if(id !== undefined) {
                const response: any = await http.get(`${apiUrl}/Poll/Get`, { id: id });
    
                if(response?.Error) {
                    console.log(response.Error);
                } else {
                    const pollModel = response as PollModel;
                    setPoll(pollModel);
                }
            }
        }

        getPoll(id as string);
    }, []);

    useEffect(() => {
        reset(poll);
    }, [poll])

    const getVotePercent = (votes?: number): number => votes === undefined ? 0 : Math.round((votes / Number(getValues("totalVotes"))) * 100);

    return (
        <div className={styles.container}>
            {poll ? (    
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
                        <div>Ankietę utworzono: {moment(poll.created).utc(true).local().format("DD.MM.YYYY HH:mm")}</div>
                        {poll.end && <div>Ankieta zakończyła się: {moment(poll.end).utc(true).local().format("DD.MM.YYYY HH:mm")}</div>}
                    </div>
                </form>
            ) : (
                <Loader/>   
            )}
        </div>
    )
}

export default PollResult;