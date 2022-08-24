import { getSession } from "../../../shared/postgres/postgres";
import { conflict, info, internalError } from "../../../shared/utils";
import { Customer } from "../utils/customer";
import { deleteCustomer } from "../utils/deleteCustomer";
import { customerValidator } from "../validators /customer";

export const remove = async (req: any, res: any) => {
  const session = getSession();
  const customer = req.body as Customer;

  try {
    const valid = await customerValidator(customer);
    if (!valid) {
      return conflict(res, "data corrupted");
    }
    const userInfo = await deleteCustomer(session, customer);

    info(`Customer Deleted !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.end();
  }
};
