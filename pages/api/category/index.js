import bcrypt from "bcryptjs";
import Category from "../../../models/category";
import { categoryRepo } from "../../../repository/category";
import {
  errorHandler,
  handler405,
  responseHandler,
} from "../../../utils/common";

async function handler(req, res) {
  const method = req.method;
  console.log("methode", method);
  let result;
  switch (method) {
    case "GET":
      result = await categoryRepo.getAllCategory();
      responseHandler(result, res);
      break;
    // case "DELETE":
    //   result = await updateUserId(id);
    //   res.json({
    //     ...result,
    //     message: `customer with customerId: ${customerId} deleted`,
    //   });
    //   break;

    // case "DELETE":
    //   result = await deleteUserId(customerId);
    //   res.json({
    //     ...result,
    //     message: `customer with customerId: ${customerId} deleted`,
    //   });
    //   break;

    // case "POST":
    //   // const { first_name, last_name } = req.body;
    //   result = await createUser(req.body);
    //   res.json({
    //     ...result,
    //     message: `customer with customerId: ${customerId} created`,
    //   });
    //   break;

    default:
      // res.status(405).end(`Method ${method} Not Allowed`);
      handler405(`Methode ${method} Autorisee`, res);
  }
}
export default handler;
