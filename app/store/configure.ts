import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import customer from "./customer/customerSlice";
import message from "./message/messageSlice";
import { createWrapper } from "next-redux-wrapper";

const store = () => configureStore({
  reducer: {
    customer: customer,
    message: message,
  },
});

export type AppDispatch = ReturnType<typeof store>;
export type RootState = ReturnType<AppDispatch["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<any>(store);