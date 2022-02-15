import clsx from "clsx";
import React from "react";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styles from "./PollOption.module.scss";

interface IPollOption  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

}

const PollOption = React.forwardRef<HTMLInputElement, IPollOption>(({className, children, ...rest}, ref) => (
    <div className={styles.container}>
        <input type="checkbox" className={clsx(styles.pollOption, className)} ref={ref} {...rest} />
        <label className={styles.pollLabel}>{children}</label>
    </div>
))

export default PollOption;