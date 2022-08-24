import { getSession } from "../../../shared/postgres/postgres";
import { conflict, info, internalError } from "../../../shared/utils";
import { Customer } from "../utils/customer";
import { getCustomer } from "../utils/getCustomer";
import { customerValidator } from "../validators /customer";

export const list = async (req: any, res: any) => {
  const session = getSession();
  const customer = req.body as Customer;

  try {
    const valid = await customerValidator(customer);
    if (!valid) {
      return conflict(res, "data corrupted");
    }
    const result = await getCustomer(session, customer);

    info(`Get customer list !`);
    return res.status(200).json(result);
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.end();
  }
};
