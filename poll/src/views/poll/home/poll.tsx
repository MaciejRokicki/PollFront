import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../../api";
import Button from "../../../components/button/Button";
import Loader from "../../../components/loader/Loader";
import PollOption from "../../../components/poll/option/PollOption";
import { AuthContext } from "../../../contexts/auth.context";
import { PollModel } from "../../../entities/poll/PollModel";
import { VotePollModel } from "../../../entities/poll/VotePollModel";
import http from "../../../utils/Http";
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
    const { token } = useContext(AuthContext);
    const [poll, setPoll] = useState<PollModel>();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const { register, control, handleSubmit, getValues, reset } = useForm<PollAnswerFrontModel>()

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

                    console.log(moment());
                    console.log(moment() >= moment(poll?.end))

                    if(moment() >= moment(poll?.end)) {
                        navigate(`/poll/${id}/result`);
                    }
                }
            }
        }

        getPoll(id as string);
    }, []);

    useEffect(() => {
        if(poll) {
            reset(poll);
        }
    }, [poll])

    const vote = async (pollAnswerFrontModel: PollAnswerFrontModel) => {
        let votePoll: VotePollModel = {
            pollId: pollAnswerFrontModel.id,
            pollOptionIds: [],
        };

        pollAnswerFrontModel.options.forEach((pollOption: PollOptionFrontModel) => {
            if(pollOption.isSelected) {
                votePoll.pollOptionIds.push(pollOption.id);
            }
        });

        setShowSpinner(true);

        const response: any = await http.post(`${apiUrl}/Poll/Vote`, votePoll, token);

        setShowSpinner(false);

        if(response?.Error) {
            console.log(response.Error);
        } else {
            navigate(`/poll/${id}/result`);
        }
    }

    return (
        <div className={styles.container}>
            {poll && !showSpinner ? (
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
                    <div className={styles.infoContainer}>
                        <div>Ankietę utworzono: {moment(poll.created).utc(true).local().format("DD.MM.YYYY HH:mm")}</div>
                        {poll.end && <div>Głosować można do: {moment(poll.end).utc(true).local().format("DD.MM.YYYY HH:mm")}</div>}
                    </div>
                    <Button className={styles.sendButton}>Oddaj głos</Button>
                </form>
            ) : (
                <Loader/>
            )}
        </div>
    )
}

export default Poll;