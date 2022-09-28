import bcrypt from "bcryptjs";
import User from "../../../models/user";
import { errorHandler, responseHandler } from "../../../utils/common";
import connectMongo from "../../../utils/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    const userFound = await User.findOne({ username: req.body.username });

    if (userFound) {
      errorHandler(` "${req.body.username}" existe deja`, res);
    } else {
      const user = new User({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      const userRegisted = await User.create(user);
      if (userRegisted) {
        responseHandler(userRegisted, res);
      } else {
        errorHandler(userRegisted, res);
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
