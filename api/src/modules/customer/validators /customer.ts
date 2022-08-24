import Joi from "joi";
import { info } from "../../../shared/utils";
import { Customer } from "../utils/customer";

export const customerValidator = async (customer: Customer) => {
  const schema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),

    lastname: Joi.string().alphanum().min(3).max(30).required(),

    age: Joi.number().integer().min(1).max(100).required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    phone: Joi.string()
      /* eslint-disable */
      .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
      .required(),

    address: Joi.string().required(),
  });
  try {
    const { valid } = await schema.validateAsync(customer);
    if (valid !== undefined) {
      return false;
    }
    return true;
  } catch (e) {
    info(e);
    return false;
  }
};
