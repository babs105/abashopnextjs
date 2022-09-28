import User from "../../../../../models/user";
import { usersRepo } from "../../../../../repository/users";
import {
  errorHandler,
  handler405,
  responseHandler,
} from "../../../../../utils/common";
import dbConnect from "../../../../../utils/connectMongo";
import { middleware } from "../../../../../utils/middleware";
// async function handler(req, res) {
//   try {
//     const { id } = req.query;
//     console.log("id", id);
//     await dbConnect();
//     const user = await User.findOne({ _id: id });

//     if (user) {
//       responseHandler(user, res);
//     } else {
//       errorHandler("Erreur est survenue", res, 404);
//     }
//   } catch (error) {
//     errorHandler(error, res);
//   }
// }
// // export default handler;
// export default middleware(handler);
async function handler(req, res) {
  const { id } = req.query;

  const method = req.method;

  let result;
  switch (method) {
    case "GET":
      await usersRepo.getUserById(id);
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
