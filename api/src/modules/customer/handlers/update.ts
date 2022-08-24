import { getSession } from "../../../shared/postgres/postgres";
import { conflict, info, internalError } from "../../../shared/utils";
import { Customer } from "../utils/customer";
import { updateCustomer } from "../utils/updateCustomer";
import { customerValidator } from "../validators /customer";

export const update = async (req: any, res: any) => {
  const session = getSession();
  const oldCustomer = req.body.oldCustomer as Customer;
  const newCustomer = req.body.oldCustomer as Customer;

  try {
    const valid = await customerValidator(oldCustomer);
    const valid2 = await customerValidator(newCustomer);
    if (!valid || !valid2) {
      return conflict(res, "data corrupted");
    }
    const userInfo = await updateCustomer(session, oldCustomer, newCustomer);

    info(`Customer Updated !`);
    return res.status(200).json({ userInfo });
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.end();
  }
};
