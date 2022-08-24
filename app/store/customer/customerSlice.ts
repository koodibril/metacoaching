import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../components/client/customer";

export interface CustomerState {
  customers: Customer[]
}

const initialState: CustomerState = {
  customers: []
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerList: (state: CustomerState, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    clearCustomerList: (state: CustomerState) => {
      state.customers = initialState.customers;
    },
    deleteCustomer: (state: CustomerState, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(el => el.email === action.payload.email);
      state.customers = state.customers.splice(index, 1);
    },
    updateCustomerList: (state: CustomerState, action: PayloadAction<Customer[]>) => {
      const index = state.customers.findIndex(el => el.email === action.payload[0].email);
      state.customers = state.customers.splice(index, 1, action.payload[1]);
    },
    addCustomerList: (state: CustomerState, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    }
  },
});

export const { setCustomerList, clearCustomerList, deleteCustomer, updateCustomerList, addCustomerList } = customerSlice.actions;
export default customerSlice.reducer;
