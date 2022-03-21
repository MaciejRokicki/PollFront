import { PollOptionModel } from "./PollOptionModel";

export interface PollModel {
    id: number;
    question: string;
    isDraft: boolean;
    created: string;
    end?: string;
    totalVotes: number;
    options: PollOptionModel[];
}