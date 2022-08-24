import { getSession } from "../../../shared/postgres/postgres";
import { info, internalError } from "../../../shared/utils";
import { getCustomers } from "../utils/getCustomers";

export const list = async (req: any, res: any) => {
  const session = getSession();

  try {
    const customerList = await getCustomers(session);

    info(`Get customer list !`);
    return res.status(200).json(customerList.rows);
  } catch (e) {
    return internalError(res)(e);
  } finally {
    await session.end();
  }
};
