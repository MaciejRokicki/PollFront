import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiUrl } from "../../../api";
import EditPollForm from "../../../components/poll/editForm/EditPollForm";
import { PollModel } from "../../../entities/poll/PollModel";
import http from "../../../utils/Http";
import styles from "./edit.module.scss";

const EditPoll = () => {
    let { id } = useParams();
    const [poll, setPoll] = useState<PollModel>();

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

  }, [poll])

    return (
        <section className={styles.pollBlock}>
          <div className={styles.poll}>
            <h1 className={styles.pollTitle}>Edytuj ankietę</h1>
            { poll && <EditPollForm poll={poll} /> }
          </div>
        </section>
    )
}

export default EditPoll;