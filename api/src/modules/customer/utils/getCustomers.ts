import { Client } from "pg";

export const getCustomers = async (session: Client) => {
  await session.connect();
  const result = await session.query("SELECT * from customers");
  return result;
};
