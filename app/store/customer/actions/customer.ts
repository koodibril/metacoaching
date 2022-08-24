import { useMemo } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import {
  setCustomerList,
  clearCustomerList,
  deleteCustomer,
  updateCustomerList,
  addCustomerList
} from "../customerSlice";
import { MessageState, setMessage } from "../../message/messageSlice";
import axios, { AxiosError, AxiosResponse } from "axios";

import { AppDispatch, RootState } from "../../configure";
import { Customer } from "../../../components/client/customer";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

const PORT = 3001;
const ADDRESS = "localhost";
const PROTOCOL = "http";
const API_URL = `${PROTOCOL}://${ADDRESS}:${PORT}`;
const LIST_ENDPOINT = "/api/customer/list";
const CREATE_ENDPOINT = "/api/customer/create";
const DELETE_ENDPOINT = "/api/customer/delete";
const UPDATE_ENDPOINT = "/api/customer/update";

const handleError = (dispatch: Dispatch, error: Error | AxiosError) => {
  const err = error.message;
  const message: MessageState = { value: err, status: "error" };
  dispatch(setMessage(message));
};


const updateCustomer = (dispatch: Dispatch, data: Customer[]) => {
  dispatch(setCustomerList(data));
};

const removeCustomer = (dispatch: Dispatch, data: Customer) => {
  dispatch(deleteCustomer(data));
};

const listCustomer = (dispatch: Dispatch, res: AxiosResponse) => {
  const list = res.data;
  dispatch(setCustomerList(list));
};

const customerCreated = (dispatch: Dispatch, data: Customer) => {
  dispatch(addCustomerList(data));
};

const update = (
  dispatch: Dispatch,
  data: Customer[]
) =>
  axios.post(`${API_URL}${UPDATE_ENDPOINT}`, data).then(
    (res: AxiosResponse) => {
      updateCustomer(dispatch, data);
    },
    (error: Error | AxiosError) => {
      handleError(dispatch, error);
    }
  );

  const remove = (
    dispatch: Dispatch,
    data: Customer
  ) =>
    axios
      .post(`${API_URL}${DELETE_ENDPOINT}`, data)
      .then(
        () => {
          removeCustomer(dispatch, data);
        },
        (error: Error | AxiosError) => {
          handleError(dispatch, error);
        }
      );

const create = (
  dispatch: Dispatch,
  data: Customer
) =>
  axios
    .post(`${API_URL}${CREATE_ENDPOINT}`, data)
    .then(
      () => {
        customerCreated(dispatch, data);
      },
      (error: Error | AxiosError) => {
        handleError(dispatch, error);
      }
    );

    const list = (
      dispatch: Dispatch
    ) =>
      axios
        .get(`${API_URL}${LIST_ENDPOINT}`)
        .then(
          (res) => {
            listCustomer(dispatch, res);
          },
          (error: Error | AxiosError) => {
            handleError(dispatch, error);
          }
        );


export const useCustomer = () =>
  useSelector((state: RootState) => state);

export const useCustomerActions = () => {
  const dispatch: Dispatch = useDispatch();

  return useMemo(
    () => ({
      list: () =>
        list(dispatch),
      create: (data: Customer) => create(dispatch, data),
      remove: (data: Customer) => remove(dispatch, data),
      update: (data: Customer[]) => update(dispatch, data),
    }),
    [dispatch]
  );
};
