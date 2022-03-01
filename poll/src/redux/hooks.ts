import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDisptach, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDisptach>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;