import { Client } from "pg";
import { Customer } from "./customer";

export const updateCustomer = async (
  session: Client,
  oldCustomer: Customer,
  newCustomer: Customer
) => {
  await session.connect();
  const result = await session.query(
    "UPDATE customers SET firstname = $1, lastname = $2, age = $3, email = $4, phone = $5, address = $6 WHERE email = $7",
    [
      newCustomer.firstname,
      newCustomer.lastname,
      newCustomer.age,
      newCustomer.email,
      newCustomer.phone,
      newCustomer.address,
      oldCustomer.email,
    ]
  );
  return result;
};
