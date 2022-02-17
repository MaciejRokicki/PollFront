import { useParams } from "react-router";
import EditPollForm from "../../../components/poll/editForm/EditPollForm";
import { PollCreateModel } from "../../../entities/poll/create/IPollCreateModel";
import styles from "./edit.module.scss";

const EditPoll = () => {
    let { id } = useParams();

    const poll: PollCreateModel = {
        question: "Pytanie",
        options: [
            { option: "Opcja 1" },
            { option: "Opcja 2" },
            { option: "Opcja 3" },
            { option: "Opcja 4" },
            { option: "Opcja 5" },
            { option: "Opcja 6" },
            { option: "Opcja 7" },
        ]
    }

    return (
        <section className={styles.pollBlock}>
          <div className={styles.poll}>
            <h1 className={styles.pollTitle}>Edytuj ankietę</h1>
            <EditPollForm pollCreateModel={poll} />
          </div>
        </section>
    )
}

export default EditPoll;