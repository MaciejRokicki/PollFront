import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiUrl } from "../../../api";
import Loader from "../../../components/loader/Loader";
import EditPollForm from "../../../components/poll/editForm/EditPollForm";
import { PollModel } from "../../../entities/poll/PollModel";
import http from "../../../utils/Http";
import styles from "./edit.module.scss";

const EditPoll = () => {
    let { id } = useParams();
    const [poll, setPoll] = useState<PollModel>();
	const [showSpinner, setShowSpinner] = useState<boolean>(false);

	useEffect(() => {
		const getPoll = async (id: string) => {
			if(id !== undefined) {
				setShowSpinner(true);

				await http.get(`${apiUrl}/Poll/Get`, { id: id })
				.then((response) => {
					setPoll(response as PollModel);
				})
				.finally(() => {
					setShowSpinner(false);
				});
			}
		}

		getPoll(id as string);
	}, []);

  
  useEffect(() => {

  }, [poll])

    return (
        <section className={styles.pollBlock}>
			{!showSpinner ? (
				<div className={styles.poll}>
					<h1 className={styles.pollTitle}>Edytuj ankietę</h1>
					{ poll && <EditPollForm poll={poll} /> }
				</div>
			) : (
				<Loader/>
			)}
        </section>
    )
}

export default EditPoll;