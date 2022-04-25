import clsx from "clsx";
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
import { ResponseExceptions } from "../../../utils/ResponseExceptions";
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
    const [responseErrors, setResponseErrors] = useState<string>("");
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const { register, control, handleSubmit, getValues, reset, watch } = useForm<PollAnswerFrontModel>()

    const { fields } = useFieldArray({
        control,
        name: "options"
    })

    useEffect(() => {
        const getPoll = async (id: string) => {
            if(id !== undefined) {
                setShowSpinner(true);

                await http.get(`${apiUrl}/Poll/Get`, { id: id })
                .then((response) => {
                    const pollModel = response as PollModel;
                    const endDate = moment.utc(pollModel?.end);

                    if(moment().isAfter(endDate)) {
                        navigate(`/poll/${id}/result`);
                    }

                    setPoll(pollModel);
                })
                .catch((err: Promise<string>) => {
                    err.then((exception: string) => setResponseErrors(ResponseExceptions.TranslateException(exception)));
                });

                setShowSpinner(false);
            }
        }

        getPoll(id as string);
    }, []);

    useEffect(() => {
        if(poll) {
            reset(poll);
        }
    }, [poll]);

    watch("options");

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
        
        await http.post(`${apiUrl}/Poll/Vote`, votePoll, token)
        .then(() => {
            navigate(`/poll/${id}/result`);
        })
        .catch((err: Promise<string>) => {
            err.then((exception: string) => setResponseErrors(ResponseExceptions.TranslateException(exception)));
        });

        setShowSpinner(false);
    }

    const redirectToResults = () => {
        navigate(`/poll/${id}/result`);
    }

    return (
        <div className={styles.container}>
            {!showSpinner ? (
                <form className={styles.pollForm} onSubmit={handleSubmit(vote)}>
                    {responseErrors && (
                        <div className={styles.errorLabel}>{responseErrors}</div>
                    )}
                    {poll && (
                        <div>
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
                            <Button type="submit" className={clsx(styles.pollButton, styles.sendButton)} disabled={!getValues("options").some(x => x.isSelected === true)}>Oddaj głos</Button>
                            <Button type="button" className={clsx(styles.pollButton, styles.resultsButton)} onClick={redirectToResults}>Wyniki</Button>
                        </div>
                    )}
                </form>
            ) : (
                <Loader/>
            )}
        </div>
    )
}

export default Poll;