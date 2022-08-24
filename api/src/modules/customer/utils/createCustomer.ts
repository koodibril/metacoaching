import { Client } from "pg";
import { Customer } from "./customer";

export const createCustomer = async (session: Client, customer: Customer) => {
  await session.connect();
  const result = await session.query(
    "INSERT INTO customers (firstname, lastname, age, email, phone, address) VALUES ($1, $2, $3, $4, $5, $6);",
    [
      customer.firstname,
      customer.lastname,
      customer.age,
      customer.email,
      customer.phone,
      customer.address,
    ]
  );
  return result;
};
