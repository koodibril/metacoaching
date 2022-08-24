import { Client } from "pg";
import { Customer } from "./customer";

export const deleteCustomer = async (session: Client, customer: Customer) => {
  await session.connect();
  const result = await session.query("DELETE FROM customers WHERE email = $1", [
    customer.email,
  ]);
  return result;
};
