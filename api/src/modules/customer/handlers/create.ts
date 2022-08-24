import { getSession } from "../../../shared/postgres/postgres";
import { conflict, info, internalError } from "../../../shared/utils";
import { Customer } from "../utils/customer";
import { createCustomer } from "../utils/createCustomer";
import { customerValidator } from "../validators /customer";

export const create = async (req: any, res: any) => {
  const session = getSession();
  const customer = req.body as Customer;

  try {
    const valid = await customerValidator(customer);
    if (!valid) {
      return conflict(res, "data corrupted");
    }
    const userInfo = await createCustomer(session, customer);

    info(`Customer created !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.end();
  }
};
