import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { PollModel } from "../entities/poll/PollModel";
import { RootState } from "./store";

export const pollSlice = createSlice({
    name: "poll",
    initialState: {
        value: [] as PollModel[],
    },
    reducers: {
        add(state, action: PayloadAction<PollModel>) {
            state.value.push(action.payload);
        },
        addRange(state, action: PayloadAction<PollModel[]>) {
            action.payload.forEach(x => {
                x.created = moment(x.created).utc(true).local().format("DD.MM.YYYY HH:mm");
                x.end = x.end ? moment(x.end).utc(true).local().format("DD.MM.YYYY HH:mm") : "-";
            })
            state.value = action.payload;
        }
    }
})

export const { add, addRange } = pollSlice.actions;
export const polls = (state: RootState) => state.poll.value

export default pollSlice.reducer;