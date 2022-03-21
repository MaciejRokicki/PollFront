import { EndPollEnum } from "../EndPollEnum";
import { PollOptionUpdateModel } from "./PollOptionUpdateModel";

export interface PollUpdateModel {
    model: {
        id: number;
        question: string;
        isDraft: boolean;
        created: string;
        end?: string;
        totalVotes: number;
        options: PollOptionUpdateModel[];
    },
    endOption: EndPollEnum;
}