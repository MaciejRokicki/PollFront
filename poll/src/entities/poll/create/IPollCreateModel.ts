import { PollOptionCreate } from "./IPollOptionCreate";

export interface PollCreateModel {
    question: string;
    options: PollOptionCreate[];
}