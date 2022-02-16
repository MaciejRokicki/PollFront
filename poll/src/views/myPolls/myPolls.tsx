import clsx from "clsx";
import moment from "moment";
import { useNavigate } from "react-router";
import Table from "../../components/table/Table";
import styles from "./myPolls.module.scss";

interface Poll {
    id: number;
    created: string;
    endDate: string;
    question: string;
}

const MyPolls = () => {
    const navigate = useNavigate();
    const drafts: Poll[] = [];
    const polls: Poll[] = [
        {id: 1, created: moment().format("DD.MM.YYYY"), endDate: moment().format("DD.MM.YYYY"), question: "Question 1" },
        {id: 2, created: moment().format("DD.MM.YYYY"), endDate: moment().format("DD.MM.YYYY"), question: "Question 2" },
        {id: 3, created: moment().format("DD.MM.YYYY"), endDate: moment().format("DD.MM.YYYY"), question: "Question 3" },
        {id: 4, created: moment().format("DD.MM.YYYY"), endDate: moment().format("DD.MM.YYYY"), question: "Question 4" },
        {id: 5, created: moment().format("DD.MM.YYYY"), endDate: moment().format("DD.MM.YYYY"), question: "Question 5" },
    ]

    const navigateToPollHandler = (id: number) => {
        navigate(`/poll/${id}`)
    }

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <div className={styles.tableContainer}>
                    <h2>Ankiety zapisane na później</h2>
                    <Table 
                        headers={["Pytanie", "Data utworzenia", "Data zakończenia"]} 
                        columns={["question", "created", "endDate"]} 
                        data={drafts} 
                        onClickCallback={navigateToPollHandler} />
                </div>
            </section>
            <section className={clsx(styles.section, styles.pollsSection)}>
                <div className={styles.tableContainer}>
                    <h2>Twoje ankiety</h2>
                    <Table 
                        headers={["Pytanie", "Data utworzenia", "Data zakończenia"]} 
                        columns={["question", "created", "endDate"]} 
                        data={polls}
                        onClickCallback={navigateToPollHandler} />
                </div>
            </section>
        </main>
    )
}

export default MyPolls;