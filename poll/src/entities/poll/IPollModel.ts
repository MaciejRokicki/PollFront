import { PollOption } from "./IPollOption";

export interface PollModel {
    id: number;
    isDraft: boolean;
    created: string;
    endDate: string;
    question: string;
    options: PollOption[];
    totalVotes: number;
}