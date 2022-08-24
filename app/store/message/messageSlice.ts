import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageState {
  value: string;
  status: "success" | "error" | "info" | "";
}

const initialState: MessageState = {
  value: "",
  status: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state: MessageState, action: PayloadAction<MessageState>) => {
      state.value = action.payload.value;
      state.status = action.payload.status;
    },
    clearMessage: (state: MessageState) => {
      state.value = initialState.value;
      state.status = initialState.status;
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;
