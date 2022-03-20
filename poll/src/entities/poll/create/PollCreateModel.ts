import { PollOptionCreateModel } from "./PollOptionCreateModel";

export interface PollCreateModel {
    question: string;
    isDraft: boolean;
    options: PollOptionCreateModel[];
}