import { PollOption } from "./IPollOption";

export interface PollModel {
    id: number;
    question: string;
    options: PollOption[];
    stage: "DRAFT" | "VOTING" | "FINISH";
    totalVotes: number;
}