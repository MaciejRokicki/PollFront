import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PollModel } from "../entities/poll/IPollModel";
import { RootState } from "./store";

export const pollSlice = createSlice({
    name: "poll",
    initialState: {
        value: [] as PollModel[],
    },
    reducers: {
        add(state, action: PayloadAction<PollModel>) {
            state.value.push(action.payload);
        }
    }
})

export const { add } = pollSlice.actions;
export const polls = (state: RootState) => state.poll.value

export default pollSlice.reducer;