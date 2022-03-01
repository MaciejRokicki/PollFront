import { configureStore } from "@reduxjs/toolkit";
import pollSlice from "./poll.slice";

const store = configureStore({
    reducer: {
        poll: pollSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch;

export default store;