import clsx from "clsx";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../../api";
import Table from "../../components/table/Table";
import { AuthContext } from "../../contexts/auth.context";
import { PollModel } from "../../entities/poll/PollModel";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addRange } from "../../redux/poll.slice";
import http from "../../utils/Http";
import styles from "./myPolls.module.scss";

const MyPolls = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const getMyPolls = async() => {
            const response = await http.get(`${apiUrl}/Poll/GetMyPolls`, {}, token);

            dispatch(addRange(response as PollModel[]));
        }

        getMyPolls();
    }, [])

    const navigateToEditPollHandler = (id: number) => {
        navigate(`/poll/${id}/edit`);
    }

    const navigateToPollHandler = (id: number) => {
        navigate(`/poll/${id}`)
    }

    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.tableContainer}>
                    <h2>Ankiety zapisane na później</h2>
                    <Table 
                        headers={["Pytanie", "Data utworzenia", "Data zakończenia"]} 
                        columns={["question", "created", "end"]} 
                        data={useAppSelector((state) => state.poll.value.filter(x => x.isDraft))} 
                        onClickCallback={navigateToEditPollHandler} />
                </div>
            </section>
            <section className={clsx(styles.section, styles.pollsSection)}>
                <div className={styles.tableContainer}>
                    <h2>Twoje ankiety</h2>
                    <Table 
                        headers={["Pytanie", "Data utworzenia", "Data zakończenia"]} 
                        columns={["question", "created", "end"]} 
                        data={useAppSelector((state) => state.poll.value.filter(x => !x.isDraft))}
                        onClickCallback={navigateToPollHandler} />
                </div>
            </section>
        </div>
    )
}

export default MyPolls;