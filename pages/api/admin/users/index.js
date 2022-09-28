import User from "../../../../models/user";
import {
  errorHandler,
  handler405,
  responseHandler,
} from "../../../../utils/common";
import dbConnect from "../../../../repository/connectMongo";
import connectMongo from "../../../../repository/connectMongo";
import { middleware } from "../../../../utils/middleware";
import { usersRepo } from "../../../../repository/users";
// async function handler(req, res) {
//   try {
//     await dbConnect();
//     const users = await User.find({});

//     if (users) {
//       responseHandler(users, res);
//     } else {
//       errorHandler("Erreur est survenue", res);
//     }
//   } catch (error) {
//     errorHandler(error, res);
//   }
// }

async function handler(req, res) {
  const method = req.method;
  console.log("methode", method);
  let result;
  switch (method) {
    case "GET":
      result = await usersRepo.getAllUsers();
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
export default middleware(handler);
