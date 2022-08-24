import { Client } from "pg";
import { Customer } from "./customer";

export const getCustomer = async (session: Client, customer: Customer) => {
  await session.connect();
  const result = await session.query(
    "SELECT * from customers WHERE email = $1;",
    [customer.email]
  );
  return result;
};
