import styles from "./result.module.scss";

const PollResult = () => {
    return (
        <div className={styles.container}>
            TEST
            {/* <form className={styles.pollForm} onSubmit={handleSubmit(vote)}>
                <div className={styles.questionHeader}>
                    {getValues("question")}
                </div>
                {fields.map((option, index) => (
                    <PollOption 
                        key={option.id}
                        {...register(`options.${index}.isSelected`)}>
                            {getValues(`options.${index}.value`)}
                    </PollOption>
                ))}
                <Button className={styles.sendButton}>Oddaj głos</Button>
            </form> */}
        </div>
    )
}

export default PollResult;