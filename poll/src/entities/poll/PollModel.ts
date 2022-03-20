import { PollOptionModel } from "./PollOptionModel";

export interface PollModel {
    id: number;
    question: string;
    isDraft: boolean;
    created: string;
    end?: string;
    totalVotes: number;
    options: PollOptionModel[];

    // constructor(
    //     id: number, 
    //     question: string, 
    //     isDraft: boolean, 
    //     created: string,    
    //     totalVotes: number, 
    //     options: PollOptionModel[],
    //     end?: string, ) {
    //         this.Id = id;
    //         this.Question = question;
    //         this.IsDraft = isDraft;
    //         this.Created = created;
    //         this.End = end;
    //         this.TotalVotes = totalVotes;
    //         this.Options = options;
    // }
}