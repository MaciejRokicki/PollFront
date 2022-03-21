import { EndPollEnum } from "../EndPollEnum";
import { PollOptionCreateModel } from "./PollOptionCreateModel";

export interface PollCreateModel {
    model: {
        question: string;
        isDraft: boolean;
        options: PollOptionCreateModel[];
    };
    endOption: EndPollEnum;

}